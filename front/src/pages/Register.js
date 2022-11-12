import { Component, Navigate } from "react";
import axios from "axios";
import "./Register.js";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", confirmPassword: "", message: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    this.register();
    event.preventDefault();
  };

  register = () => {
    // Check password
    if (this.state.confirmPassword === this.state.password) {
      const body = {
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post("http://localhost:3000/users/register", body)
        .then((res) => this.setState({ message: res.data.message }))
        .catch((error) => this.setState({ message: error }));
    } else {
      throw new Error("Passwords not correspond");
    }
    return <Navigate to={`/`} />;
  };

  render = () => {
    return (
      <>
        <h1>SignIn</h1>
        <form>
          <div>
            <label>Email</label>
            <input
              type="email"
              name={"email"}
              placeholder="Email address"
              value={this.state.email}
              required
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name={"password"}
              placeholder="Password"
              title="Password min 8 characters. At least one UPPERCASE and one lowercase letter"
              value={this.state.password}
              required
              // pattern="(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name={"confirmPassword"}
              placeholder="Confirm Password"
              title="Password min 8 characters. At least one UPPERCASE and one lowercase letter"
              value={this.state.confirmPassword}
              required
              // pattern="(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
              onChange={this.handleChange}
            />
          </div>
          <button type={"submit"} value="Register">
            <span>Register</span>
          </button>
        </form>
      </>
    );
  };
}
