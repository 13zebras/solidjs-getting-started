import { For, JSX, Setter, Show, createResource, createSignal } from "solid-js";

import { Book } from "./App";
import { searchBooks } from "./searchBooks";
import styles from './App.module.css';

export interface AddBookProps {
  setBooks: Setter<Book[]>;
}

// const emptyBook: Book = { title: "", author: "" };

export function AddBook(props: AddBookProps) {
  // const [newBook, setNewBook] = createSignal(emptyBook);

  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");

  const [data] = createResource<Book[], string>(query, searchBooks);


  return (
    <>
      <form class={styles.addbook}>
        <div>
          <label for="title">Book name</label>
          <input
            id="title"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
            }}

          />
        </div>

        <button
          class={styles.addBookBtn}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setQuery(input());
          }}
        >
          Search
        </button>
      </form>
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li class={styles.searchResult}>
                {book.title} by {book.author}{" "}
                <button class={styles.addSearchBtn}
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onClick={(e) => {
                    e.preventDefault();
                    props.setBooks((books) => [...books, book]);
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
