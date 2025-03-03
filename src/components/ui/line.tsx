import React, { CSSProperties } from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cn } from "../../lib/utils";
import {
  GlobalComponentManagerContext,
  useGlobalComponentManager,
} from "../context/UIContext";

export default class Line extends React.Component<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  style?: string;
  className?: string;
  display: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  showArrow: boolean;
}> {
  static propTypes = {
    from: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    to: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    style: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    isHovered: false,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    let from = this.props.from;
    let to = this.props.to;
    // if (to.x < from.x) {
    //   from = this.props.to;
    //   to = this.props.from;
    // }

    const len = Math.sqrt(
      Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)
    );
    const angle = Math.atan2(to.y - from.y, to.x - from.x);

    const wrapperStyle: CSSProperties = {
      position: "absolute",
      left: from.x,
      top: from.y,
      width: `${len}px`,
      height: "2px",
      transform: `rotate(${angle}rad)`,
      transformOrigin: "0 0",
    };

    const lineStyle: CSSProperties = {
      position: "absolute",
      width: `${len}px`,
      height: "0px",
      borderBottom: `3px ${this.props.style || "solid black"}`,
      transition: "height 0.2s, box-shadow 0.2s",
      ...(this.state.isHovered && {
        borderBottom: `3px ${this.props.style || "solid black"}`,
        boxShadow: `
        0px 0px 12px rgba(0, 0, 0, 0.4), /* Top shadow */
        0px 4px 12px rgba(0, 0, 0, 0.5) /* Bottom shadow */
      `,
      }),
    };

    const arrowStyle: CSSProperties = {
      position: "absolute",
      left: Math.cos(angle) + 18,
      top: "50%",
      transform: "translateY(-50%)",
    };

    return (
      <GlobalComponentManagerContext.Consumer>
        {({ state, setComponentState }) => (
          <div
            className={cn("relative w-[100%] h-[100%] z-0", this.props.display)}
            onMouseEnter={() => {
              this.setState({ isHovered: true });
              this.props.onMouseEnter();
              setComponentState("noteBox", {
                isVisible: true, // Fixed typo from isVisble to isVisible
              });
            }}
            onMouseLeave={() => {
              this.setState({ isHovered: false });
              this.props.onMouseLeave();
            }}
          >
            <div style={wrapperStyle}>
              <div style={lineStyle} className={cn(this.props.className)}></div>
              {this.props.showArrow && (
                <FaChevronLeft
                  size={25}
                  style={arrowStyle}
                  className={this.props.className}
                />
              )}
            </div>
          </div>
        )}
      </GlobalComponentManagerContext.Consumer>
    );
  }
}
