export const DB_NAME = "school_library";
export const STORE_NAME = "books";

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 4);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (
        db.objectStoreNames.contains(
          STORE_NAME
        )
      ) {
        db.deleteObjectStore(
          STORE_NAME
        );
      }

      db.createObjectStore(
        STORE_NAME,
        {
          keyPath: "id",
          autoIncrement: true,
        }
      );
    };

    request.onsuccess = () =>
      resolve(request.result);

    request.onerror = () =>
      reject(request.error);
  });
};

export const addBook = async (
  book
) => {
  const db =
    await openDB();

  return new Promise(
    (resolve, reject) => {
      const tx =
        db.transaction(
          STORE_NAME,
          "readwrite"
        );

      const store =
        tx.objectStore(
          STORE_NAME
        );

      store.add({
        title:
          book.title,
        author:
          book.author,
        quantity:
          Number(
            book.quantity
          ),
      });

      tx.oncomplete =
        () =>
          resolve();

      tx.onerror =
        () =>
          reject(
            tx.error
          );
    }
  );
};

export const getBooks =
  async () => {
    const db =
      await openDB();

    return new Promise(
      (resolve, reject) => {
        const tx =
          db.transaction(
            STORE_NAME,
            "readonly"
          );

        const store =
          tx.objectStore(
            STORE_NAME
          );

        const request =
          store.getAll();

        request.onsuccess =
          () =>
            resolve(
              request.result
            );

        request.onerror =
          () =>
            reject(
              request.error
            );
      }
    );
  };