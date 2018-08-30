import React, { Component } from "react";
import classnames from "classnames";
import ScrollPane from "visual/component/ScrollPane";

function getDropdownHeight(itemsCount, itemHeight, minItems, maxItems) {
  var minHeight = itemHeight * minItems,
    maxHeight = itemHeight * maxItems,
    itemsHeight = itemsCount * itemHeight;
  return Math.max(minHeight, Math.min(maxHeight, itemsHeight));
}

class Downshift extends Component {
  static defaultProps = {
    className: "",
    minItems: 1,
    maxItems: 10,
    itemHeight: 30,
    style: {},
    value: [],
    onChange: () => {}
  };

  state = {
    activeIndex: null
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = () => {
    const { value, onChange } = this.props;
    let activeIndex = this.state.activeIndex;

    if (event.which === 13 && activeIndex !== null) {
      onChange(value[activeIndex].value);
      return;
    }
    if (activeIndex === null) {
      activeIndex = -1;
    }
    if (event.which === 38) {
      activeIndex--;
    }
    if (event.which === 40) {
      activeIndex++;
    }

    this.setState({
      activeIndex: Math.max(0, Math.min(value.length - 1, activeIndex))
    });
  };

  handleMouseMove = ({ target }) => {
    const activeIndex = Number(target.getAttribute("data-index"));

    this.setState({
      activeIndex
    });
  };

  renderList() {
    const { value, onChange } = this.props;
    const { activeIndex } = this.state;

    return value.map(({ title, value }, index) => {
      const className = classnames("brz-ed-downshift__item", {
        "brz-ed-downshift__item--active": activeIndex === index
      });

      return (
        <div
          key={value}
          title={title}
          className={className}
          data-index={index}
          onClick={() => onChange(value)}
        >
          {title}
        </div>
      );
    });
  }

  render() {
    const {
      className: _className,
      style,
      itemHeight,
      minItems,
      maxItems,
      value
    } = this.props;
    const className = classnames("brz-ed-downshift", _className);
    const scrollPaneStyle = {
      height: getDropdownHeight(value.length, itemHeight, minItems, maxItems)
    };

    return (
      <div
        className={className}
        style={style}
        onMouseMove={this.handleMouseMove}
      >
        <ScrollPane style={scrollPaneStyle}>{this.renderList()}</ScrollPane>
      </div>
    );
  }
}

export default Downshift;
