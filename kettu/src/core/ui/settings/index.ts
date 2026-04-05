import PupuIcon from "@assets/icons/ying-yang.png";
import { Strings } from "@core/i18n";
import { useProxy } from "@core/vendetta/storage";
import { findAssetId } from "@lib/api/assets";
import { isThemeSupported } from "@lib/api/native/loader";
import { settings } from "@lib/api/settings";
import { registerSection } from "@ui/settings";
import { version } from "bunny-build-info";

export { PupuIcon };

export default function initSettings() {

    registerSection({
        name: "V1VEU",
        items: [
            {
                key: "KETTU",
                title: () => Strings.PUPU,
                icon: { uri: PupuIcon },
                render: () => import("@core/ui/settings/pages/General"),
                useTrailing: () => `(${version})`
            },
            {
                key: "BUNNY_THEMES",
                title: () => Strings.THEMES,
                icon: findAssetId("PaintPaletteIcon"),
                render: () => import("@core/ui/settings/pages/Themes"),
                usePredicate: () => isThemeSupported()
            },
            {
                key: "ACCOUNT_SWITCHER",
                title: () => "Trocar de Conta",
                icon: findAssetId("UserIcon"),
                render: () => import("@core/plugins/accountswitcher/Contas"),
            },
            {
                key: "EMBLEMAS",
                title: () => "Emblemas",
                icon: findAssetId("BadgeIcon") ?? findAssetId("ic_nitro_rep_24px"),
                render: () => import("@core/plugins/badges/EmblemasPage"),
            },
            {
                key: "NOME_USUARIO",
                title: () => "Nome de Usuário",
                icon: findAssetId("PencilIcon") ?? findAssetId("ic_edit_24px"),
                render: () => import("@core/plugins/fakename/NomeUsuarioPage"),
            },
            {
                key: "BUNNY_DEVELOPER",
                title: () => Strings.DEVELOPER,
                icon: findAssetId("WrenchIcon"),
                render: () => import("@core/ui/settings/pages/Developer"),
                usePredicate: () => useProxy(settings).developerSettings ?? false
            }
        ]
    });

    // Compat with Bunny Plugins that use configs in settings
    registerSection({
        name: "Bunny",
        items: []
    });

    // Compat with Revenge Plugins that use configs in settings
    registerSection({
        name: "Revenge",
        items: []
    });

    // Compat with Vendetta Plugins that use configs in settings
    registerSection({
        name: "Vendetta",
        items: []
    });
}