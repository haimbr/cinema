import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddMoviePage from '../components/AddMoviePage';
import EditMoviePage from '../components/EditMoviePage';
import LoginPage from '../components/login/LoginPage';
import Header from '../components/main/Header';
import { getUserFromCookie } from '../cookies/cookies';
import HomePage from './../components/HomePage';





const AppRouter = () => {
    const cookieUserData = getUserFromCookie();
    const [user, setUser] = useState(cookieUserData);

    return (

        <BrowserRouter>
            {!!user && <Header setUser={setUser} />}
            <Switch>
                {!user && <Route path="/" >
                    <LoginPage setUser={setUser} />
                </Route>}              
                <Route exact path="/" component={HomePage} />
                <Route path="/home" component={HomePage} />
                <Route path="/edit-movie/:movieName" component={EditMoviePage} />
                <Route path="/add-movie/" component={AddMoviePage} />
            </Switch>

        </BrowserRouter>
    )

};

export default AppRouter;