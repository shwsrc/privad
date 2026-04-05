import { createMMKVBackend, createStorage, wrapSync } from "@core/vendetta/storage";

interface BadgeStorageData {
  selectedBadges: string[];
}

const defaultData: BadgeStorageData = {
  selectedBadges: [],
};

export const badgeStorage: BadgeStorageData = wrapSync(
  createStorage<BadgeStorageData>(createMMKVBackend("viveu/badges", defaultData))
);
