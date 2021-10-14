
import useFetchData from './../../hooks/useFetchData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faUsers, faVideo, faStar } from '@fortawesome/free-solid-svg-icons';
import SelectScreeningDates from './../SelectScreeningDates';
import { useState } from 'react';
import Loader from './../main/Loader';

const MoviePage = ({ match }) => {
    const movieName = match.params.movieName;
    const movie = useFetchData("/movie/get-movie/" + movieName);
    const [isOrderTicketOpen, setIsOrderTicketOpen] = useState(false);

    return (
        <>{!movie.movieDetails ? <Loader /> :

            <div className="movie-page__container">
                <div className="movie-page__movie-details">
                    <div className="movie-page__img">
                        <img src={`https://haimbr-movies.s3.eu-west-1.amazonaws.com/images/${movie.movieDetails.movieId}.jpg`} alt="movie-img" />
                    </div>

                    <div className="movie-page__details">

                        <div className="movie-page__name">
                            <h2>{movie.movieDetails.nameInHebrew}</h2>
                            <h2>{movie.movieDetails.nameInEnglish}</h2>
                        </div>

                        <div className="movie-page__main-content">
                            <div className="movie-page__description">

                                <div>
                                    <p>{movie.movieDetails.description}</p>
                                </div>

                                <div className="movie-page__movie-attributes">
                                    <span> <FontAwesomeIcon className="icon" icon={faUsers} />{movie.movieDetails.targetAudience}</span>
                                    <span> <FontAwesomeIcon className="icon" icon={faVideo} />{movie.movieDetails.movieLength} דקות</span>
                                    <span> <FontAwesomeIcon className="icon" icon={faHistory} />בכורה: {movie.movieDetails.premiereDate}</span>
                                    <span> <FontAwesomeIcon className="icon" icon={faStar} />{movie.movieDetails.ageRestriction}</span>
                                </div>

                                <div className="order-ticket" onClick={() => setIsOrderTicketOpen(true)}>
                                    <div className="order-ticket__button">
                                        לרכישת כרטיס
                                    </div>
                                </div>

                            </div>

                            <div className="movie-page__trailer">
                                <iframe src={movie.movieDetails.trailerLink} title="trailer"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                {isOrderTicketOpen && <div className="movie-page__buy-tickets">
                    <div>
                        <SelectScreeningDates setIsOrderTicketOpen={setIsOrderTicketOpen} movieName={movieName} />
                    </div>
                </div>}
            </div>
        }</>
    )
}

export default MoviePage;
