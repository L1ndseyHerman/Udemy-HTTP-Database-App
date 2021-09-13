import React, {useEffect, useState, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //  Replacing lots of .then() with async and await.
  const fetchMoviesHandler = useCallback(async () => {

    setIsLoading(true);
    setError(null);

    try {
      //  Anything with an "await" runs on an asynchronous thread or something.
      const response = await fetch('https://udemy-http-database-app-default-rtdb.firebaseio.com/movies.json');

      if (!response.ok) {
        //  Could put the server's error message here, like 404, or your own.
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      
      const loadedMovies = [];

      //  Since keys are weird randomly-generated hashes, need a for-in loop.
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }

      //  Just want the results array from the data, so here it is:
      setMovies(loadedMovies);
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  //  This should have error handling same as for getting data, he just wants to keep vid short.
  async function addMovieHandler(movie) {
    //  fetch() can also send data, not clean code, but it's pre-coded, so have to do.
    //  Default method is "Get", switching to "Post" here.
    //  The body needs to be JSON, which is typically used to exchange data
    //  btw front-end and back-end.
    const response = await fetch('https://udemy-http-database-app-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
