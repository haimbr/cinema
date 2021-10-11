
import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../main/Loader';
import SelectTicket from './SelectTicket';
import { sendOrderToServer } from './../../api/postOrder';
import { useHistory } from 'react-router-dom';





const OrderTicketPage = ({ match }) => {

    const history = useHistory();

    const movieName = match.params.movieName;
    const eventId = match.params.eventId;

    const screeningEvent = useFetchData(`/get-screening-event?nameInHebrew=${movieName}&EventId=${eventId}`);

    const [seatsSizeDisplay, setSeatsSizeDisplay] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ticketsCount, setTicketsCount] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);


    const onSelectSeatsClicked = (position) => {
        if (selectedSeats.includes(position)) {
            setSelectedSeats((prev) => prev.filter((seat) => seat !== position))
        } else if(!screeningEvent.seatPlan?.includes(position)){
            setSelectedSeats((prev) => [...prev, position]);
        }
    }


    const onFinishOrderClicked = async () => {
        if (ticketsCount === 0) return alert("יש לבחור סוג כרטיס");
        if (selectedSeats.length === 0) return alert("יש לבחור מושבים");
        if (selectedSeats.length !== ticketsCount) return alert("מספר המושבים שבחרת אינו תואם את מספר הכרטיסים שבחרת");

        const res = await sendOrderToServer(movieName, eventId, selectedSeats);
        if(res.status === 200){
            alert("ההזמנה הושלמה");
            history.push('/')
        }else{
            alert("משהו השתבש נסה שוב");
            window.location.reload();
        }
    }

    return (
        <div className="order-tickets-page__container">
            <h2><span>הזמנת כרטיס</span></h2>
            {
                !screeningEvent.seatPlan ? <Loader /> :
                    <div className="order-tickets-main">
                        <div className="ticket-details">
                            <div className="ticket-description">
                                <p>{movieName}</p>
                                <p>{screeningEvent.theatersName}</p>
                                <p>{screeningEvent.Day}</p>
                                <p>{screeningEvent.Hour}</p>
                            </div>
                            <SelectTicket setTotalPrice={setTotalPrice} totalPrice={totalPrice} ticketsCount={ticketsCount} setTicketsCount={setTicketsCount} />
                            <div className="">
                                <h4>ס"ה לתשלום {totalPrice.toFixed(2)}  &#8362;</h4>
                                <div className="order-ticket">
                                    <div className="order-ticket__button" onClick={() => onFinishOrderClicked()}>סיום הזמנה</div>
                                </div>
                            </div>
                        </div>
                        <div className="select-seats__container">
                            <h1>בחירת מקומות</h1>
                            <div className="select-seats__overflow-container">
                                <div className="select-seats__inner">
                                    <div className="lines-numbers">
                                        {new Array(10).fill().map((e, index) => (
                                            <div className={`seats seats__size-${seatsSizeDisplay}`} key={index}>{index + 1}</div>
                                        ))}
                                    </div>
                                    <div className="select-seats__seats-container">
                                        {screeningEvent.seatPlan?.map((e, index) => (
                                            <div
                                                className={`seats seats__size-${seatsSizeDisplay}
                                                 ${selectedSeats.includes(index) ? "selected" : ""}
                                                 ${screeningEvent.seatPlan[index] ? "occupied" : ""}`}
                                                key={index}
                                                onClick={() => onSelectSeatsClicked(index)}
                                            >
                                                {((index + 1) % 15) || 15}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="lines-numbers">
                                        {new Array(10).fill().map((e, index) => (
                                            <div className={`seats seats__size-${seatsSizeDisplay}`} key={index}>{index + 1}</div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="control-size">
                                <div>
                                    <span onClick={() => setSeatsSizeDisplay(1)}>איפוס זום</span>
                                </div>
                                <div>
                                    <span onClick={() => setSeatsSizeDisplay(Math.min(3, seatsSizeDisplay + 1))}>+</span>
                                    <span onClick={() => setSeatsSizeDisplay(Math.max(1, seatsSizeDisplay - 1))}>-</span>
                                </div>

                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default OrderTicketPage;









