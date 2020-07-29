import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Home</h1>
            <h2 className="subtitle">Welcome</h2>
          </div>
        </div>
      </section>
    );
  }
}
