import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import authForm from "../../assets/css/auth/authForm.module.css";
import { withRouter } from "react-router-dom";
import Field from "../FormElements/Field";
import Form from "../FormElements/Form";

class LoginForm extends Component {
	constructor() {
		super();
		this.state = {};
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
	onSubmit = () => {
		console.log(this.state);
		const userData = {
			email: this.state.value.email,
			password: this.state.value.password,
		};

		this.props.loginUser(userData);
		console.log(userData);
	};

	render() {
		return (
			<div className={authForm.formWrapper}>
				<Form
					state={this.state}
					addSubmitButton={true}
					onChange={(value) => this.setState({ value })}
					onSubmit={this.onSubmit}
					buttontext="Login">
					<Field
						type="text"
						id="email"
						className="something"
						isRequired={true}
						label="Email"
						fieldName="email"
					/>
					<Field
						type="text"
						id="password"
						className="something"
						isRequired={true}
						label="Password"
						fieldName="password"
					/>
				</Form>
			</div>
		);
	}
}

LoginForm.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});
export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm));
