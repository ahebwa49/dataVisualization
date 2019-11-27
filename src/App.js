import React from "react";
import "./App.css";
import BarChart from "./visualization/BarChart";
// import RadialChart from "./visualization/RadialChart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temps: {},
      city: "sf"
    };
  }
  componentDidMount() {
    Promise.all([
      fetch(
        `https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json`
      ),
      fetch(
        `https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/ny.json`
      )
    ])
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(([sf, ny]) => {
        sf.forEach(day => (day.date = new Date(day.date)));
        ny.forEach(day => (day.date = new Date(day.date)));

        this.setState({ temps: { sf, ny } });
        // console.log(sf);
        // console.log(ny)
      });
  }

  updateCity = e => this.setState({ city: e.target.value });

  render() {
    const data = this.state.temps[this.state.city];
    return (
      <div className="App">
        <h1>
          2017 temperatures for{" "}
          <select name="city" onChange={this.updateCity}>
            {[
              {
                label: "san Francisco",
                value: "sf"
              },
              { label: "New York", value: "ny" }
            ].map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </h1>
        <p>
          *warning: these are <em>not</em> meant to be good examples of data
          visualizations,
          <br />
          but just to show the possibility of using D3 and React*
        </p>
        <BarChart data={data} />
        {/*<RadialChart /> */}
        <p>
          (Weather data from{" "}
          <a href="wunderground.com" target="_new">
            wunderground.com
          </a>
          )
        </p>
      </div>
    );
  }
}
export default App;
