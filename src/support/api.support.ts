class StorageRequest {
  storage = localStorage;

  async get(storageKey): Promise<any> {
    const record = this.storage.getItem(storageKey);

    return Promise.resolve({
      text: () => Promise.resolve(record),
      json: () => Promise.resolve(JSON.parse(record)),
    });
  }
  set(storageKey: string, data) {
    this.storage.setItem(storageKey, data);

    return this.get(storageKey);
  }
}

export const storageRequest = new StorageRequest();
