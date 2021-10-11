import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverUrl } from '../data/data';
import { useHistory } from 'react-router-dom';


const removeDuplicates = (selectedDate) => {
    const datesSet = new Set();
    selectedDate.Dates?.forEach(date => datesSet.add(date.Day));
    return [...datesSet];
}

const SelectScreeningDates = ({ movieName, theater, setIsOrderTicketOpen }) => {

    const history = useHistory();

    const [selectedMovie, setSelectedMovie] = useState(movieName || "");
    const [selectedTheater, setSelectedTheater] = useState(theater || "");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedHour, setSelectedHour] = useState("");

    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [screeningDates, setScreeningDates] = useState([]);
    const [screeningHours, setScreeningHours] = useState([]);


    useEffect(() => {
        const newRequest = axios.CancelToken.source();
        const fetchData = async () => {
            const requestData = getUrlAndSetCallback();
            try {
                const response = await axios.get(serverUrl + requestData.url, {
                    cancelToken: newRequest.token,
                })
                console.log(response.data)
                requestData.setCallback(response.data);
            } catch (err) {
                console.log('There was a problem or request was cancelled.', err)
            }
        }
        const getUrlAndSetCallback = () => {
            if (selectedMovie && selectedTheater) {
                return { url: `/get-dates?nameInHebrew=${selectedMovie}&theatersName=${selectedTheater}`, setCallback: setScreeningDates }
            } if (!selectedTheater) {
                return { url: `/get-theaters?nameInHebrew=${selectedMovie}`, setCallback: setTheaters };
            } else {
                return { url: `/movie/get-movies?theatersName=${selectedTheater}`, setCallback: setMovies };
            }
        }
        fetchData();


        return () => {
            newRequest.cancel();
        }
    }, [selectedMovie, selectedTheater]);


    const onSelectDateChanged = (e) => {
        setSelectedDate(e.target.value);
        setSelectedHour("");
        const hours = [];
        screeningDates.Dates.forEach((date) => {
            if (date.Day === e.target.value) {
                hours.push(date.Hour)
            }
        })
        setScreeningHours(hours);
    }

    const onOrderTicketClicked = async (e) => {
        if (!selectedTheater) return alert("יש לבחור קולנוע");
        if (!selectedMovie) return alert("יש לבחור סרט");
        if (!selectedDate) return alert("יש לבחור תאריך");
        if (!selectedHour) return alert("יש לבחור שעה");

        const { EventId } = screeningDates.Dates.find((date) => date.Day === selectedDate && date.Hour === selectedHour);
        history.push(`/order-ticket/${selectedMovie}/${EventId}`);

    }



    return (
        <>
            <div className="select-screening-dates__container">
                {setIsOrderTicketOpen && <span className="close-icon" onClick={() => setIsOrderTicketOpen(false)}>&#10005;</span>}
                <div className="order-movie">
                    <h1 >רכישת כרטיס </h1>
                    {movieName && <h2>שם הסרט: {movieName}</h2>}
                    <div className="order-ticket__selects-container">
                        {!theater && <div className="select-cinema">
                            <select className="custom-select" defaultValue="בחרו קולונע"
                                onChange={(e) => {
                                    setSelectedTheater(e.target.value);
                                    setSelectedMovie(movieName || "");
                                    setSelectedDate("");
                                    setSelectedHour("");
                                }}>
                                <option disabled hidden >בחרו קולונע</option>
                                {theaters.map((theater, index) => (
                                    <option key={index} >{theater}</option>
                                ))}
                            </select>
                        </div>}
                        {!movieName && <div className="select-movie">
                            <select className="custom-select" value={selectedMovie || "בחרו סרט"} onChange={(e) => {
                                setSelectedMovie(e.target.value);
                                setSelectedDate("");
                                setSelectedHour("");
                            }}>
                                <option disabled hidden>בחרו סרט</option>
                                {movies.map((movie, index) => (
                                    <option key={index}>{movie.movieDetails.nameInHebrew}</option>
                                ))}
                            </select>
                        </div>}
                        <div className="order-movie__select-date">
                            <div>
                                <select className="custom-select" onChange={onSelectDateChanged} value={selectedDate || "בחרו תאריך"}>
                                    <option disabled hidden>בחרו תאריך</option>
                                    {removeDuplicates(screeningDates).map((date, index) => (
                                        <option key={index}>{date}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="custom-select" value={selectedHour || "בחרו שעה"} onChange={(e) => setSelectedHour(e.target.value)}>
                                    <option disabled hidden>בחרו שעה</option>
                                    {screeningHours.map((hour, index) => (
                                        <option key={index}>{hour}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="order-ticket" onClick={() => onOrderTicketClicked()}>
                        <div className="order-ticket__button">רכישת כרטיס</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectScreeningDates;
