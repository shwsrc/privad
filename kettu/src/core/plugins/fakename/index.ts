import { after } from "@lib/api/patcher";
import { findByStoreName } from "@metro";
import { defineCorePlugin } from "..";

import { fakeNameStorage } from "./storage";

const UserStore = findByStoreName("UserStore");

export default defineCorePlugin({
    manifest: {
        id: "bunny.fakename",
        version: "1.0.0",
        type: "plugin",
        spec: 3,
        main: "",
        display: {
            name: "Nome de Usuário",
            description: "Troca visualmente o seu nome de usuário (@username)",
            authors: [{ name: "V1VEU" }]
        }
    },

    start() {
        after("getCurrentUser", UserStore, ([], user) => {
            if (!user) return;
            if (!fakeNameStorage.enabled || !fakeNameStorage.fakeUsername) return;

            return new Proxy(user, {
                get(target, prop) {
                    if (prop === "username") return fakeNameStorage.fakeUsername;
                    return Reflect.get(target, prop);
                }
            });
        });

        after("getUser", UserStore, ([id], user) => {
            if (!user) return;
            if (!fakeNameStorage.enabled || !fakeNameStorage.fakeUsername) return;

            const currentId = UserStore.getCurrentUser()?.id;
            if (!currentId || id !== currentId) return;

            return new Proxy(user, {
                get(target, prop) {
                    if (prop === "username") return fakeNameStorage.fakeUsername;
                    return Reflect.get(target, prop);
                }
            });
        });
    }
});
