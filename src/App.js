import React, { Component } from "react";
import StockTable from "./StockTable";

// import StockChart from './StockChart';

const StockChart = React.lazy(() =>
  import(/* webpackChunkName: 'Chart' */ "./StockChart")
);

// const ChartPromise = import(/* webpackChunkName: 'StockChart' */ "./StockChart");
// const StockChart = React.lazy(() => ChartPromise);

class App extends Component {
  state = {
    selectedStock: null
  };
  render() {
    const { stocks } = this.props;
    const { selectedStock } = this.state;
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <StockTable
          stocks={stocks}
          onSelect={selectedStock => this.setState({ selectedStock })}
        />
        {/* <div hidden={true}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Chart data={[]} />
            </React.Suspense>
          </div> */}
        {selectedStock && (
          <StockChart
            stock={selectedStock}
            onClose={() => this.setState({ selectedStock: false })}
          />
        )}
      </React.Suspense>
    );
  }
}
export default App;
