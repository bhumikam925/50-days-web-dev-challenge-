function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("PlatformDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains("offline_proposals")) {
                db.createObjectStore("offline_proposals", {
                    keyPath: "id",
                    autoIncrement: true
                });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function saveOfflineData(payload) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            "offline_proposals",
            "readwrite"
        );

        const store = transaction.objectStore("offline_proposals");

        const request = store.add(payload);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function getOfflineData() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            "offline_proposals",
            "readonly"
        );

        const store = transaction.objectStore("offline_proposals");

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}
