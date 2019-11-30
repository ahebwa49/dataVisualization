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

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  xAxis = d3.axisBottom();
  yAxis = d3.axisLeft();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};

    const xExtent = d3.extent(data, d => d.date);
    const xScale = d3
      .scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right]);

    // const minLow = d3.min(data, d => d.low);
    const maxHigh = d3.max(data, d => d.high);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxHigh])
      .range([height - margin.bottom, margin.top]);

    return { data, xScale, yScale };
  }

  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.refs.xAxis).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }
  render() {
    const highLine = d3
      .line()
      .x(d => this.state.xScale(d.date))
      .y(d => this.state.yScale(d.high));

    const lowLine = d3
      .line()
      .x(d => this.state.xScale(d.date))
      .y(d => this.state.yScale(d.low));

    return (
      <>
        <h1>Line Chart</h1>
        <svg width={width} height={height}>
          <path d={highLine(this.state.data)} stroke="red" fill="transparent" />
          <path d={lowLine(this.state.data)} stroke="blue" fill="transparent" />

          <g
            ref="xAxis"
            transform={`translate(0, ${height - margin.bottom})`}
          />
          <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
        </svg>
      </>
    );
  }
}

export default LineChart;
