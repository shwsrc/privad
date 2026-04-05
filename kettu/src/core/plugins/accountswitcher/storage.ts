import { createMMKVBackend, createStorage, wrapSync } from "@core/vendetta/storage";

interface AccountData {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    displayName: string;
    token: string;
    addedAt: number;
}

interface AccountSwitcherStorage {
    accounts: Record<string, AccountData>;
    accountOrder: string[];
    settings: {
        enableCLI: boolean;
        confirmBeforeDelete: boolean;
        enableUnsafeFeatures: boolean;
        addToSidebar: boolean;
        exportPasswordHash?: string;
    };
}

const defaultData: AccountSwitcherStorage = {
    accounts: {},
    accountOrder: [],
    settings: {
        enableCLI: true,
        confirmBeforeDelete: true,
        enableUnsafeFeatures: false,
        addToSidebar: true
    }
};

export const storage: AccountSwitcherStorage = wrapSync(
    createStorage<AccountSwitcherStorage>(createMMKVBackend("accountswitcher", defaultData))
);
