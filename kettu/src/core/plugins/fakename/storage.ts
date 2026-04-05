import { createMMKVBackend, createStorage, wrapSync } from "@core/vendetta/storage";

interface FakeNameStorage {
  fakeUsername: string;
  enabled: boolean;
}

const defaultData: FakeNameStorage = {
  fakeUsername: "",
  enabled: false,
};

export const fakeNameStorage: FakeNameStorage = wrapSync(
  createStorage<FakeNameStorage>(createMMKVBackend("viveu/fakename", defaultData))
);
