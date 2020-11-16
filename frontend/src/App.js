import "./App.css";

import React, { Component } from "react";
import Authenticated from "./Authenticated";
import axios from "axios";

export default class App extends Component {
  state = {
    is_authenticated: false,
    usuario: "",
    contrasena: "",
  };

  componentDidMount() {
    axios
      .post("http://localhost:8081/is_authenticated", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.mensaje === "ok") {
          console.log("Loged");
          this.setState({ is_authenticated: true });
        } else {
          console.log("Not loged");
          this.setState({ is_authenticated: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  doLogOut = (e) => {
    this.setState({ is_authenticated: false });
    localStorage.removeItem("token");
    // console.log("Hola");
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let info = {
      usuario: this.state.usuario,
      contrasena: this.state.contrasena,
    };

    axios
      .post("http://localhost:8081/autenticar", { ...info })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        this.setState({ is_authenticated: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { is_authenticated, usuario, contrasena } = this.state;

    if (is_authenticated) {
      return <Authenticated doLogOut={this.doLogOut}></Authenticated>;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sistemas Operativos 1 - Examen Final</h1>
          <p>{window.location.hostname}</p>
        </header>
        <main>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="usuario"
                value={usuario}
                onChange={this.handleChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                Usuario
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="contrasena"
                value={contrasena}
                onChange={this.handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </main>
      </div>
    );
  }
}
