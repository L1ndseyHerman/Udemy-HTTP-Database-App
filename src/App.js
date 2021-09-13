import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  Replacing lots of .then() with async and await.
  async function fetchMoviesHandler() {

    setIsLoading(true);

    //  Anything with an "await" runs on an asynchronous thread or something.
    const response = await fetch('https://swapi.dev/api/films');
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
      setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
