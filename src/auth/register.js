import React, { Component } from 'react';
import styles from "../assets/css/auth/register.module.css";
import RegisterForm  from "../components/AuthForm/registerForm";
import AnimatedBook from "../components/Global/animatedBook";
export default class Register extends Component {
  render() {
    return (
      <div className={styles.registerContainer}>
        <AnimatedBook title="Register" formElement={<RegisterForm />} />
      </div>
    )
  }
}

