import React from "react";
import StockTable from "./StockTable";

const StockChart = React.lazy(() =>
  import(/* webpackChunkName: 'StockChart' */ "./StockChart")
);

function AlwaysSuspend() {
  throw new Promise(() => {});
}

class App extends React.Component {
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
        {selectedStock && (
          <StockChart
            stock={selectedStock}
            onClose={() => this.setState({ selectedStock: false })}
          />
        )}
        {/* Preload <StockChart/> */}
        <React.Suspense fallback={null}>
          <StockChart stock={stocks[0]} />
          <AlwaysSuspend />
        </React.Suspense>
      </React.Suspense>
    );
  }
}

export default App;
