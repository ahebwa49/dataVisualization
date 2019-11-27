import React from "react";
import * as d3 from "d3";

const width = 650;
const height = 400;
const margin = {
  top: 20,
  right: 5,
  bottom: 20,
  left: 35
};

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevstate) {
    const { data } = nextProps;
    if (!data) return {};
    console.log(data);

    // 1. map date to x-position
    const xExtent = d3.extent(data, d => d.date);
    const xScale = d3
      .scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right]);

    // 2. map high temperature to y-position
    const [min, max] = d3.extent(data, d => d.high);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([height - margin.bottom, margin.top]);

    // 3. map the avg temperature to color scale

    const colorExtent = d3.extent(data, d => d.avg).reverse();
    const colorScale = d3
      .scaleSequential()
      .domain(colorExtent)
      .interpolator(d3.interpolateRdYlBu);

    const bars = data.map(d => {
      return {
        x: xScale(d.date),
        y: yScale(d.high),
        height: yScale(d.low) - yScale(d.high),
        fill: colorScale(d.avg)
      };
    });
    return { bars };
  }

  render() {
    return (
      <svg width={width} height={height}>
        {this.state.bars.map(d => (
          <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
        ))}
      </svg>
    );
  }
}
export default BarChart;
