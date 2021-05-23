import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import authForm from "../../assets/css/auth/authForm.module.css";
import { Link, withRouter } from "react-router-dom";

class LoginForm extends Component {
	constructor() {
		super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/"); // push user to dashboard when they login
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}
	onChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData);
		console.log(userData);
	};

	render() {
		const { errors } = this.state;
		return (
			<div className={authForm.formWrapper}>
				<form noValidate onSubmit={this.onSubmit}>
					<div className={authForm.authInputWrapper}>
						<input
							onChange={this.onChange}
							value={this.state.email}
							error={errors.email}
							className={authForm.formInput}
							id="email"
							type="email"
						/>
						<label className={authForm.formLabel} htmlFor="email">
							Email
						</label>
						<span className={authForm.formError}>
							{errors.email}
							{errors.emailnotfound}
						</span>
					</div>
					<div className={authForm.authInputWrapper}>
						<input
							onChange={this.onChange}
							value={this.state.password}
							error={errors.password}
							className={authForm.formInput}
							id="password"
							type="password"
						/>
						<label className={authForm.formLabel} htmlFor="password">
							Password
						</label>
						<span className={authForm.formError}>
							{errors.password}
							{errors.passwordincorrect}
						</span>
					</div>
					<div className={authForm.formFooter}>
						<button type="submit">Log In</button>
						<div>
							<span>New User? </span>
							<Link to="/register">Create an account</Link>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

LoginForm.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});
export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm));
