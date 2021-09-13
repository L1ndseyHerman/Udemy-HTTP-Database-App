import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //  Replacing lots of .then() with async and await.
  async function fetchMoviesHandler() {

    setIsLoading(true);
    setError(null);

    try {
      //  Anything with an "await" runs on an asynchronous thread or something.
      const response = await fetch('https://swapi.dev/api/films');
      //  Use this mispelled version to check errors:
      //const response = await fetch('https://swapi.dev/api/film');

      if (!response.ok) {
        //  Could put the server's error message here, like 404, or your own.
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      //  Changing the names of some movie properties from what they are in the database
      //  to what u want them to be:
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      //  Just want the results array from the data, so here it is:
      setMovies(transformedMovies);
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies.</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
