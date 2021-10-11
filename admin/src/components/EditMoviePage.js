
import useFetchData from './../hooks/useFetchData';
import Loader from './main/Loader';

const EditMoviePage = ({ match }) => {
    const movieName = match.params.movieName;
    const movie = useFetchData("/admin/get-movie/" + movieName);
    console.log(movie);


    return (
        <div>
            {
                !movie.movieDetails ? <Loader /> :
                    <div className="edit-movie__container">
                        
                    </div>
            }
        </div>
    )
}

export default EditMoviePage;
