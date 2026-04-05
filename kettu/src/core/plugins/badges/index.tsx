import { after } from "@lib/api/patcher";
import { onJsxCreate } from "@lib/api/react/jsx";
import { findByNameLazy, findByStoreName } from "@metro";
import { defineCorePlugin } from "..";

import { badgeStorage } from "./badgeStorage";
import DISCORD_BADGES from "./emblemas";

const useBadgesModule = findByNameLazy("useBadges", false);
const UserStore = findByStoreName("UserStore");

const injectedBadgeProps = {} as Record<string, { id: string; source: { uri: string }; label: string }>;

export default defineCorePlugin({
    manifest: {
        id: "bunny.badges",
        version: "3.0.0",
        type: "plugin",
        spec: 3,
        main: "",
        display: {
            name: "Emblemas",
            description: "Adiciona emblemas oficiais do Discord ao seu perfil",
            authors: [{ name: "V1VEU" }]
        }
    },

    start() {
        onJsxCreate("ProfileBadge", (component, ret) => {
            if (ret.props.id?.startsWith("db-")) {
                const cached = injectedBadgeProps[ret.props.id];
                if (cached) {
                    ret.props.source = cached.source;
                    ret.props.label = cached.label;
                    ret.props.id = cached.id;
                }
            }
        });

        onJsxCreate("RenderBadge", (component, ret) => {
            if (ret.props.id?.startsWith("db-")) {
                const cached = injectedBadgeProps[ret.props.id];
                if (cached) {
                    Object.assign(ret.props, cached);
                }
            }
        });

        after("default", useBadgesModule, ([user], result) => {
            if (!user) return;

            const currentUser = UserStore.getCurrentUser();
            if (!currentUser || user.userId !== currentUser.id) return;

            const selected = badgeStorage.selectedBadges || [];
            if (selected.length === 0) return;

            const existingIds = new Set(result.map((b: any) => b.id));

            selected.forEach((badgeId: string) => {
                if (existingIds.has(badgeId)) return;

                const badgeDef = DISCORD_BADGES.find(b => b.id === badgeId);
                if (!badgeDef) return;

                const internalId = `db-${badgeId}`;

                injectedBadgeProps[internalId] = {
                    id: internalId,
                    source: { uri: badgeDef.icon },
                    label: badgeDef.description,
                };

                result.push({
                    id: internalId,
                    description: badgeDef.description,
                    icon: "dummy",
                });
            });
        });
    }
});