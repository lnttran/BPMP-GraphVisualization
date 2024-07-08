import React, { CSSProperties } from "react";
import PropTypes from "prop-types";
import { FaChevronRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default class Line extends React.Component<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  style?: string;
  className?: string;
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

  render() {
    let from = this.props.from;
    let to = this.props.to;
    if (to.x < from.x) {
      from = this.props.to;
      to = this.props.from;
    }

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
      height: "2px",
      borderBottom: this.props.style || "2px solid black",
    };

    const arrowStyle: CSSProperties = {
      position: "absolute",
      left: len - 42 * Math.cos(angle),
      top: "50%",
      transform: "translateY(-50%)",
    };

    return (
      <div className="relative w-[100%] h-[100%] z-0">
        <div style={wrapperStyle}>
          <div style={lineStyle} className={cn(this.props.className)}></div>
          <FaChevronRight style={arrowStyle} />
        </div>
      </div>
    );
  }
}
