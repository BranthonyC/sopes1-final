import React, { Component } from "react";

export default class Authenticated extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sistemas Operativos 1 - Examen Final</h1>
          <p>{window.location.hostname}</p>
        </header>
        <main className="d-flex flex-column">
          <h2>Sesion activa</h2>
          <button
            className="btn btn-warning btn-block"
            onClick={this.props.doLogOut}
            type="submit"
          >
            Logout
          </button>
        </main>
      </div>
    );
  }
}
