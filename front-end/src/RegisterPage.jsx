import React from 'react';

export default class RegisterPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "", 
            password: "",
            confirmPassword: "",
            email: "",
            err: "",
            testDror: "no"
        };
    }
    checkConfirmPassword(confirmPassword) {
        return confirmPassword === this.state.co
    }
    validateConfirmPassword(event) {
        let state = this.state;
        let confirmPassword = event.target.value;
        if (confirmPassword !== state.password) {
            state.err = "the second password isnt match to the first password"
        }
        else {
            state.err = "";
        }
        state.confirmPassword = confirmPassword;
        this.setState(state);
    }
    validateEmail(event) {
        let state = this.state;
        let email = event.target.value;
        let regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");
        if (!regex.test(email)) {
            state.err = "this is not a valid email";
        }
        else {
            state.err = "";
        }
        state.email = email;
        this.setState(state);
    }
    validatePassword(event) {
        const maxLength = 20;
        const minLength = 8;
        let err = "";
        let password = event.target.value;
        let regex = new RegExp("^[a-zA-Z0-9_]*$");
        if (password.length > maxLength || password.length < minLength) {
            err = "password lenght isnt valid"
        }
        else if(!regex.test(password)) {
            err = "invalid characters";
        }
        this.setState({err, password});


    }

    validateName(e) {
        const maxLength = 16;
        const minLength = 3;
        let err = "";
        let username = e.target.value;
        let regex = new RegExp("^[a-zA-Z0-9_]*$");

        if (username.length > maxLength || username.length < minLength) {
            err = `${username} lenght isnt valid`;
        }
        else if(!regex.test(username)) {
            err = `${username} invalid characters`;
        }
        this.setState(() => ({ err, username }), () => console.log(this.state));
        //console.log(this.state)
    }

    sendRegisterInfo(){
        alert(this.state.username)
    }

    render() {
        return (
            <div>
                <p>{this.state.err}</p>
                User name:
                <input onInput={(e) => {this.validateName(e)}}></input>
                Password:
                <input onInput={(e) => {this.validatePassword(e)}}></input>
                Confirm Password:
                <input onInput={(e) => {this.validateConfirmPassword(e)}}></input>
                Email:
                <input onInput={(e) => {this.validateEmail(e)}}></input>
                <button onClick={() => this.sendRegisterInfo()}>Register</button>
            </div>
        );
    }

}
