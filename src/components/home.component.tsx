import { Component } from 'react';
import { HomeInterface } from '../models/models';

class HomeComponent extends Component<HomeInterface> {
  render() {
    const { logo, title, background, message } = this.props;

    return (
      <div style={{ background }}>
        <img src={logo} alt="Logo" />
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    );
  }
}

export default HomeComponent;
