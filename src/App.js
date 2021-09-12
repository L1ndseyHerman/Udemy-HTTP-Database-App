import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    //  This can take a second object parameter with options, but don't need it here.
    //  fetch() returns a Promise.
    //  Is asynchronous automatically?!
    //  Remember, .then() has something to do w try/catch.
    fetch('https://swapi.dev/api/films').then(response => {
      //  response is an object.
      //  SWAPI data is coming in in JSON form, so easy to turn into JS object!
      //  .json() is a METHOD?! Converts JSON to an object or something.
      return response.json();
    }).then(data => {
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
    });

    //  Could have an "options" object param, but don't need here, bec the default 
    //  method is "get", which is right for this.
    /*fetch('https://swapi.dev/api/films', {
      method
    });*/
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
