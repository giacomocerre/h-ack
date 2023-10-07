import { SvgPathProps } from "../models/models";
import React, { useEffect, useState } from 'react';

class SvgPath extends React.Component<SvgPathProps> {
  state = {
    svgContent: '',
  };

  componentDidMount() {
    this.loadSvgContent();
  }

  componentDidUpdate(prevProps: SvgPathProps) {
    if (prevProps.fileName !== this.props.fileName) {
      this.loadSvgContent();
    }
  }

  loadSvgContent() {
    const { fileName, color, size } = this.props;
    const imagePath = process.env.PUBLIC_URL + `/icons/${fileName}.svg`;

    fetch(imagePath)
      .then(response => response.text())
      .then(svgContent => {
        const modifiedSvg = svgContent
          .replace(/fill="[^"]*"/, `fill="${color}"`)
          .replace(/width="[^"]*"/, `width="${size}"`)
          .replace(/height="[^"]*"/, `height="${size}"`);

        this.setState({ svgContent: modifiedSvg });
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }

  render() {
    const { svgContent } = this.state;

    return (
      <div
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  }
}

export default SvgPath;