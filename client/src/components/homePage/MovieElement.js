
import { useHistory } from 'react-router-dom';
const MovieElement = ({ movie }) => {
    const history = useHistory();
    return (
        <div className="movie-element__container" onClick={() => history.push(`/movies/${movie.movieDetails.nameInHebrew}`)}>
            <div className="flip-container" >
                <div className="flipper">
                    <div className="front">
                        <img src={`https://haimbr-movies.s3.eu-west-1.amazonaws.com/images/${movie.movieDetails.movieId}.jpg`} alt="movie-img" />
                    </div>
                    <div className="back">
                        <span className="movie-details__details">
                            <span className="movie-name">
                                <h2>{movie.movieDetails.nameInHebrew}</h2>
                                <h4>{movie.movieDetails.nameInEnglish}</h4>
                            </span>
                            <span className="movie-description">
                                <p>{movie.movieDetails.description}</p>
                            </span>
                        </span>
                        <span className="movie-details__buttons">
                            <div>אודות הסרט</div>
                            <div>רכישת כרטיסים</div>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieElement;
