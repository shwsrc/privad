import { defineCorePlugin } from "..";
import { logger } from "@lib/utils/logger";

export default defineCorePlugin({
    manifest: {
        id: "bunny.accountswitcher",
        version: "2.0.0",
        type: "plugin",
        spec: 3,
        main: "",
        display: {
            name: "Account Switcher",
            description: "Adds ability to safely switch between Discord accounts",
            authors: [{ name: "Win8.1VMUser" }]
        }
    },

    start() {
        logger.log("AccountSwitcher: Enabled");
    },

    stop() {
        logger.log("AccountSwitcher: Disabled");
    }
});
