import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import '../bootstrap.css';
import AuthenticationService from '../components/jwtlogin/AuthenticationService.js'

class HeaderComponent extends Component {

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log("===Headeromponent===");
        console.log(isUserLoggedIn);
        return (
            <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-brand">홍종백</div>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
        );
    }
}

export default HeaderComponent;