import React, { Component } from 'react';
import styles from "../assets/css/auth/login.module.css";
import LoginForm from "../components/AuthForm/loginForm";
import AnimatedBook from "../components/Global/animatedBook";

export default class Login extends Component {

  render() {
    return (
      <div className={styles.loginContainer}>
        <AnimatedBook title="Login" formElement={<LoginForm />} />
      </div>
    )
  }
}
