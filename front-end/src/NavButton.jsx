import React from 'react';
import { Link } from "react-router-dom";

export default class NavButton extends React.Component {
    render() {
        return (
            <Link to={this.props.navTo}>
                <button>
                { this.props.name } 
                </button>
                </Link>
        )
    }
}
