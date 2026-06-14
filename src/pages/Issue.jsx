import { useEffect, useState } from "react";

const Issue = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issuing, setIssuing] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response =
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/books`,
          {
            credentials: "include",
          }
        );

      const data =
        await response.json();

      setBooks(data);
    } catch (error) {
      console.log(error);

      alert(
        "Failed to load books"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleBook = (
    bookId
  ) => {
    setSelectedBooks(
      (prev) => {
        if (
          prev.includes(
            bookId
          )
        ) {
          return prev.filter(
            (id) =>
              id !==
              bookId
          );
        }

        return [
          ...prev,
          bookId,
        ];
      }
    );
  };

  const issueBooks =
    async () => {
      try {
        if (
          selectedBooks.length ===
          0
        ) {
          alert(
            "Select at least one book"
          );

          return;
        }

        const user =
          JSON.parse(
            localStorage.getItem(
              "loggedInUser"
            )
          );

        if (
          !user?.id
        ) {
          alert(
            "Login first"
          );

          return;
        }

        setIssuing(
          true
        );

        const response =
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/issues`,
            {
              method:
                "POST",

              credentials:
                "include",

              headers:
              {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    userId:
                      user.id,

                    bookIds:
                      selectedBooks,
                    workflowId: 4 // or 2/3 depending on Issue/Return/Request

                  }
                ),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.message
          );
        }

        alert(
          `Issue Created (#${data.issueId})`
        );

        setSelectedBooks(
          []
        );
      } catch (
      error
      ) {
        console.log(
          error
        );

        alert(
          error.message ||
          "Issue failed"
        );
      } finally {
        setIssuing(
          false
        );
      }
    };

  if (
    loading
  ) {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h2>
        Library Issue
      </h2>

      <div
        style={{
          marginBottom:
            20,
        }}
      >
        Selected:
        {" "}
        {
          selectedBooks.length
        }
      </div>

      {!books.length && (
        <p>
          No books found
        </p>
      )}

      <div>
        {books.map(
          (
            book
          ) => (
            <div
              key={
                book.id
              }
              style={{
                border:
                  "1px solid #ddd",

                borderRadius:
                  8,

                padding:
                  16,

                marginBottom:
                  12,

                display:
                  "flex",

                gap:
                  16,

                alignItems:
                  "center",
              }}
            >
              <input
                type="checkbox"
                checked={selectedBooks.includes(
                  book.id
                )}
                onChange={() =>
                  toggleBook(
                    book.id
                  )
                }
              />

              <div>
                <h3>
                  {
                    book.title
                  }
                </h3>

                <p>
                  Author:
                  {" "}
                  {
                    book.author
                  }
                </p>

                <p>
                  Quantity:
                  {" "}
                  {
                    book.quantity
                  }
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <button
        disabled={
          issuing ||
          selectedBooks.length ===
          0
        }
        onClick={
          issueBooks
        }
        style={{
          padding:
            "10px 20px",
        }}
      >
        {issuing
          ? "Creating..."
          : "Issue Selected Books"}
      </button>
    </div>
  );
};

export default Issue;