import { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "" };
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
    this.login();
    event.preventDefault();
  };

  login = () => {
    // Check password

    const body = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:3000/user/login", body)
      .then((res) => this.setState({ message: res.data.message }))
      .catch((error) => this.setState({ message: error }));
  };

  render = () => {
    return (
      <>
        <h1>SignIn</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name={"email"}
            placeholder="Email address"
            value={this.state.email}
            required
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name={"password"}
            placeholder="Password"
            title="Password min 8 characters. At least one UPPERCASE and one lowercase letter"
            value={this.state.password}
            required
            pattern="(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            onChange={this.handleChange}
          />
          <button type={"submit"} value="Sign Up">
            <span>Sign up</span>
          </button>
        </form>
      </>
    );
  };
}
