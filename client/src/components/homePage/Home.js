import React from 'react';
import MovieElement from './MovieElement';
import useFetchData from './../../hooks/useFetchData';

const Home = () => {

    const movies = useFetchData("/movie/get-movies");

    return (
        <div className="home__container">
            <div className="home__movies-container">
                {movies.map((movie, index) => (
                    <MovieElement movie={movie} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Home;
