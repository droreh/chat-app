import React from 'react';
import NavButton from './NavButton';

export default class App extends React.Component{

    render() {
        return (
            <div>
                <NavButton name="Login" navTo="Login"/>
                <NavButton name="Register" navTo="Register"/>
            </div>
        );
    }

}






