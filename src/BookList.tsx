import { Book } from "./App";
import { For } from "solid-js";

interface BookListProps {
  books: Book[];
}
export function BookList(props: BookListProps) {

  const totalBooks = () => props.books.length;

  return (
    <>
      <h3>Total books: {totalBooks()}</h3>
      <ul>
        <For each={props.books}>
          {(book) => {
            return (
              <li>
                {book.title} <span style={{ "font-style": "italic" }}>({book.author})</span>
              </li>
            );
          }}
        </For>
      </ul>
    </>
  );
}
