import React from 'react';
import { prices } from '../../data/data';


const selectPrevValues = {
    "רגיל": "",
    "אזרח ותיק": "",
    "חייל בשירות חובה": "",
    "כרטיס נכה": ""
};

const SelectTicket = ({ setTotalPrice, totalPrice, ticketsCount, setTicketsCount }) => {
    return (
        <div className="select-ticket-type">
            <h3>בחירת כרטיס</h3>
            <div>
                <div className=""><span>כרטיס</span><span>סה"כ לכרטיס</span><span>כמות</span></div>
                <div className="">
                    {
                        prices.map((price, index) => (
                            <div key={index} className="">
                                <span className="bold">{price.type}</span>
                                <span>{price.price} &#8362;</span>
                                <span>
                                    <select onChange={(e) => {
                                        const reducedPrice = totalPrice - (selectPrevValues[price.type] * price.price);
                                        const reducedTicketsCount = ticketsCount - (selectPrevValues[price.type]);
                                        selectPrevValues[price.type] = e.target.value;
                                        const newPrice = reducedPrice + (e.target.value * price.price);
                                        const newTicketsCount = reducedTicketsCount + parseInt(e.target.value);
                                        setTotalPrice(newPrice);
                                        setTicketsCount(newTicketsCount);
                                    }}>
                                        {new Array(10).fill().map((e, index) => (
                                            <option key={index} >{index}</option>
                                        ))}
                                    </select>
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectTicket
