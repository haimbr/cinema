import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faFilm } from '@fortawesome/free-solid-svg-icons';
import SideNav from './SideNav';
import MoviesDropdown from './MoviesDropdown';
import { Link, useHistory } from 'react-router-dom';
import useFetchData from './../../hooks/useFetchData';



const Header = () => {
    const history = useHistory();
    const movies = useFetchData("/movie/get-movies");
    const theaters = useFetchData("/get-theaters");
    
    return (
        <div className="header__container">
            <div className="header__right-side">
                <div className="header__nav__container">
                    <FontAwesomeIcon className="nav-icon" icon={faBars} />
                    <SideNav />
                </div>
                <div className="header__search-movie">
                    <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    <MoviesDropdown movies={movies} />
                </div>
                <div className="header__select-movie">
                    <span>בחרו סרט</span>
                    <MoviesDropdown movies={movies} />
                </div>
                <div className="header__select-theater">
                    <span >בחרו קולנוע</span>
                    <div className="theaters__dropdown__container">
                        {theaters.map((theater, index) => (
                            <span key={index} onClick={() => history.push(`/theaters/${theater}`)}>{theater}</span>
                        ))}
                    </div>
                </div>
                <div className="header__covid-19-restriction">
                    <Link to="/covid-restriction"><span>הנחיות תו ירוק</span></Link>
                </div>

            </div>
            <div className="header__left-side" onClick={() => history.push(`/home`)}>
                <span>br cinema</span>
                <FontAwesomeIcon className="faFilm-icon" icon={faFilm} />
            </div>
        </div>
    )
}

export default Header;
