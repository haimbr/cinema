import { useState } from "react";
import { useHistory } from "react-router-dom";




const MoviesDropdown = ({ movies }) => {

    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();

    const sortMovies = () => {
        const moviesNamesArr = movies.map((movie) => movie.movieDetails.nameInHebrew);
        const sortedMovies = moviesNamesArr.sort((a, b) => a.indexOf(searchValue) < b.indexOf(searchValue) ? -1 : 1);
        const filteredMovies = sortedMovies.filter((a) => a.includes(searchValue));
        return filteredMovies;
    };

    return (
        <div className="movies-dropdown__container">

            <div className="search-movie">
                <input
                    type="text"
                    placeholder="חיפוש סרט"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}>
                </input>
            </div>

            <div className="search-movie__movies-list">
                {
                    sortMovies().map((movie, index) => (
                        <span key={index} onClick={() => history.push(`/movies/${movie}`)} >{movie}</span>
                    ))
                }
            </div>
            
        </div>
    )
}

export default MoviesDropdown
