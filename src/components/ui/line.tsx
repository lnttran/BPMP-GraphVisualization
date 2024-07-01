import React, { CSSProperties } from "react";
import PropTypes from "prop-types";
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
    const angle = Math.atan((to.y - from.y) / (to.x - from.x));

    const lineStyle: CSSProperties = {
      position: "absolute",
      transform: `translate(${from.x - 0.5 * len * (1 - Math.cos(angle))}px, ${
        from.y + 0.5 * len * Math.sin(angle)
      }px) rotate(${angle}rad)`,
      width: `${len}px`,
      height: `${0}px`,
      borderBottom: this.props.style || "2px solid black",
    };

    const arrowStyle: CSSProperties = {
      position: "absolute",
      top: "-1px", // Adjust position to align arrow properly
      left: "100%", // Position the arrow at the end of the line
      width: "0",
      height: "0",
      borderLeft: "5px solid transparent", // Adjust arrow size as needed
      borderRight: "5px solid transparent",
      borderBottom: "5px solid black", // Arrow color
    };

    return (
      <div style={{ ...lineStyle }} className={cn(this.props.className)}>
        <div style={arrowStyle}></div>
      </div>
    );
  }
}
