import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import authForm from "../../assets/css/auth/authForm.module.css";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {},
		};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history); 
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
          <form noValidate onSubmit={this.onSubmit}>
          <div className={authForm.authInputWrapper}>
            <label htmlFor="name">Name:</label>
            <input 
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
            />
            <span>{errors.name}</span>
          </div>
          <div className={authForm.authInputWrapper}>
            <label htmlFor="email">Email:</label>
            <input 
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
            />
            <span>{errors.email}</span>
          </div>
          <div className={authForm.authInputWrapper}>
            <label htmlFor="password">Password:</label>
            <input 
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
            />
            <span>{errors.password}</span>
          </div>
          <div className={authForm.authInputWrapper}>
            <label htmlFor="password2">Confirm Password:</label>
            <input 
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
            />
            <span>{errors.password2}</span>
          </div>
          <div>
            <button
              type="submit"
            >Sign Up</button>
          </div>
          <div>
            <span>Already have a account? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    )
  }
}


RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterForm));
