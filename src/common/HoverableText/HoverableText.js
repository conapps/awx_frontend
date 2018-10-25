import React from 'react';

export default class HoverableTextComponent extends React.Component {
  state = {
    hovering: false
  };

  static getDerivedStateFromProps({ defaultText, hoverText }) {
    const difference = Math.abs(defaultText.length - hoverText.length);
    const padding = Math.round(difference / 2) * 7;

    if (defaultText.length > hoverText.length) {
      hoverText = (
        <span style={{ padding: `0 ${padding}px` }}>{hoverText}</span>
      );
      defaultText = <span>{defaultText}</span>;
    } else {
      defaultText = (
        <span style={{ padding: `0 ${padding}px` }}>{defaultText}</span>
      );
      hoverText = <span>{hoverText}</span>;
    }

    return {
      defaultText,
      hoverText
    };
  }

  onMouseEnter = () => {
    this.setState({
      hovering: true
    });
  };

  onMouseLeave = () => {
    this.setState({ hovering: false });
  };

  render() {
    return React.cloneElement(this.props.children, {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      hoverText:
        this.state.hovering === true
          ? this.state.hoverText
          : this.state.defaultText
    });
  }
}
