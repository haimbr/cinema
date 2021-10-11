import { useState } from "react";
import { useHistory } from "react-router-dom";
import useFetchData from '../hooks/useFetchData';




const SearchMovie = () => {
    const movies = useFetchData("/movie/get-movies");
    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();

    const sortMovies = () => {
        const newMoviesArr = movies.map((movie) => movie.movieDetails.nameInHebrew);
        const sortedAndFilteredArr = newMoviesArr.sort((a, b) => a.indexOf(searchValue) < b.indexOf(searchValue) ? -1 : 1).filter((a) => a.includes(searchValue));
        return sortedAndFilteredArr;
    };

    const onSelectMovie = () => {
        
    }

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
                        <span key={index} onClick={() => history.push(`/edit-movie/${movie}`)} >{movie}</span>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchMovie
