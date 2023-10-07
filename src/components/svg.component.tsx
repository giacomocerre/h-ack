// SVGComponent.js
import React, { Component } from 'react';
import { SvgPathProps } from '../models/models';

class SVGComponent extends Component<SvgPathProps> {

  render() {
    const { icon, color, size } = this.props;
    return <h1>SVGICON</h1>;
  }
}

export default SVGComponent;
