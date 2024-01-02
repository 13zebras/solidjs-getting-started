import { Show, createSignal } from "solid-js";

import { AddBook } from './AddBook';
import { BookList } from './BookList';
import styles from './App.module.css';

export type Book = {
  title: string;
  author: string;
};

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

interface BookshelfProps {
  name: string;
}
function Bookshelf(props: BookshelfProps) {
  const [books, setBooks] = createSignal<Book[]>(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => {
    setShowForm(!showForm());
  };

  return (
    <div>
      <h1>{props.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={<button class={styles.showFormBtn} onClick={toggleForm}>Book Form</button>}
      >
        <AddBook setBooks={setBooks} />
        <button class={styles.showFormBtn} onClick={toggleForm}>Done Adding Books</button>
      </Show>
    </div>
  );
}
function App() {
  return <Bookshelf name="Tom" />;
}
export default App;
