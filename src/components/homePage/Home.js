import React from 'react';
import MovieElement from './MovieElement';
import useFetchData from './../../hooks/useFetchData';
import Loader from './../main/Loader';
import SelectScreeningDates from './../SelectScreeningDates';

const Home = () => {

    const movies = useFetchData("/movie/get-movies");

    return (
        <div className="home__container">

            <div className="image-slideshow">
                <div>
                    <img src="https://haimbr-movies.s3.eu-west-1.amazonaws.com/br/gjdjg.jpg" alt=""></img>
                </div>
                <div>
                    <img src="https://haimbr-movies.s3.eu-west-1.amazonaws.com/br/SHANG-CHI_HomeHero-Desktope_2000x390_YP.jpg" alt=""></img>
                </div>
                <div>
                    <img src="https://haimbr-movies.s3.eu-west-1.amazonaws.com/br/YP_CovidTest_TavYarok_HomeHero_Deskop.jpg" alt=""></img>
                </div>
            </div>


            <div className="home-page__buy-tickets">
                <SelectScreeningDates />
            </div>


            {movies.length < 1 ? <Loader /> :
                <div className="home__movies-container">
                    <h2>עכשיו בקולנוע</h2>
                    {movies.map((movie, index) => (
                        <MovieElement movie={movie} key={index} />
                    ))}
                </div>
            }
        </div>
    )
}

export default Home;
