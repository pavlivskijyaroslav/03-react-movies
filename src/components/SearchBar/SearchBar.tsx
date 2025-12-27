import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (search: string) => Promise<void>;
}
function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSumbit = (formdata: FormData) => {
    const search = formdata.get('query') as string;

    if (search === '') {
      toast.error('Please enter your search query.');
    } else {
      onSubmit(search);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSumbit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
export default SearchBar;
