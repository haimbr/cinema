import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/homePage/Home';
import MoviePage from '../components/moviePage/MoviePage';
import OrderTicketPage from '../components/orderTicketPage/OrderTicketPage';
import Header from './../components/main/Header';





const AppRouter = () => {
    return (

        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/order-ticket/:movieName/:eventId" component={OrderTicketPage} />
                <Route path="/movies/:movieName" component={MoviePage} />
            </Switch>

        </BrowserRouter>
    )

};

export default AppRouter;