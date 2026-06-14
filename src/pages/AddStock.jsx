import {
  useState,
} from "react";

import {
  addBook,
} from "../utils/db";

const AddStock = () => {
  const [form, setForm] =
    useState({
      title: "",
      author: "",
      quantity: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const update =
    (e) => {
      setForm(
        (prev) => ({
          ...prev,
          [e.target.name]:
            e.target.value,
        })
      );
    };

  const submit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(
          true
        );

        await addBook(
          form
        );

        alert(
          "Book added successfully"
        );

        setForm({
          title:
            "",
          author:
            "",
          quantity:
            "",
        });
      } catch (
        err
      ) {
        console.error(
          err
        );

        alert(
          "Failed to add book"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <div
      style={{
        padding:
          "24px",
        maxWidth:
          "500px",
      }}
    >
      <h2>
        Add Stock
      </h2>

      <form
        onSubmit={
          submit
        }
      >
        <input
          name="title"
          placeholder="Book Title"
          value={
            form.title
          }
          onChange={
            update
          }
        />

        <br />
        <br />

        <input
          name="author"
          placeholder="Author"
          value={
            form.author
          }
          onChange={
            update
          }
        />

        <br />
        <br />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={
            form.quantity
          }
          onChange={
            update
          }
        />

        <br />
        <br />

        <button
          disabled={
            loading
          }
        >
          {loading
            ? "Adding..."
            : "Add Stock"}
        </button>
      </form>
    </div>
  );
};

export default AddStock;