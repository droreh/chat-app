import React from 'react';
const axios = require('axios');

const PASSWORD_MAX_LEN = 20;
const PASSWORD_MIN_LEN = 8;
const USERNAME_MAX_LEN = 16;
const USERNAME_MIN_LEN = 3;

export default class RegisterPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "", 
            password: "",
            confirmPassword: "",
            email: "",
            err: ""
        };
    }

    usernameIsTooShort() {
        return this.state.username.length < USERNAME_MIN_LEN;
    }
    usernameIsTooLong() {
        return this.state.username.length > USERNAME_MAX_LEN;
    }
    usernameIsValid() {
        return new RegExp("^[a-zA-Z0-9_]*$").test(this.state.username);
    }

    passwordIsTooShort() {
        return this.state.password.length < PASSWORD_MIN_LEN;
    }
    passwordIsTooLong() {
        return this.state.password.length > PASSWORD_MAX_LEN;
    }
    passwordIsValid() {
        return new RegExp("^[a-zA-Z0-9_]*$").test(this.state.password);
    }
    confirmPasswordIsCorrect() {
        return this.state.password === this.state.confirmPassword;
    }

    emailIsValid() {
        return new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$").test(this.state.email);
    }

    checkUser() {
        let errors = [];
        if (this.usernameIsTooShort()) errors.push("username is too short");
        if (this.usernameIsTooLong()) errors.push("username is too long");
        if (!this.usernameIsValid()) errors.push("username isn't valid");
        if (this.passwordIsTooShort()) errors.push("password is too short");
        if (this.passwordIsTooLong()) errors.push("password is too long");
        if (!this.passwordIsValid()) errors.push("password isn't valid");
        if (!this.confirmPasswordIsCorrect()) errors.push("Confirm password is incorrect");
        if (!this.emailIsValid()) errors.push("Email is invalid");
        return errors;
    }

    sendRegisterInfo() {
        let errors = this.checkUser();
        if (errors.length !== 0) {
            let str = "Front: \n";
            for (let i = 0; i < errors.length; i++) str += errors[i]+"\n";
            this.setState({err: str});
        }
        else {
        axios.post('http://localhost:3001/register',{
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
            
        }).then((res) => {
            if (!res.data.hasOwnProperty('errors')) this.setState({err: "Done."});
            else {
            let str = "Back: \n";
            for (let i = 0; i < res.data.errors.length; i++) str += res.data.errors[i]+"\n";
            this.setState({err: str});
            console.log(res)
          }}).catch((err) => {
            console.log(err)
          });      
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.err}</p>
                User name:
                <input onInput={(e) => this.setState({username: e.target.value})}></input>
                Password:
                <input onInput={(e) => this.setState({password: e.target.value})}></input>
                Confirm Password:
                <input onInput={(e) => this.setState({confirmPassword: e.target.value})}></input>
                Email:
                <input onInput={(e) => this.setState({email: e.target.value})}></input>
                <button onClick={() => this.sendRegisterInfo()}>Register</button>
            </div>
        );
    }
}
