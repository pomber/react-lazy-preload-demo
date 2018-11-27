import React from "react";
import StockTable from "./StockTable";

const StockChart = React.lazy(() =>
  import(/* webpackChunkName: 'StockChart' */ "./StockChart")
);

const neverResolve = new Promise(() => {});
function Suspender({ suspend }) {
  if (suspend) {
    throw neverResolve;
  } else {
    return null;
  }
}

function Preload({ show, children }) {
  return (
    <React.Suspense fallback={show ? undefined : null}>
      {children}
      <Suspender suspend={!show} />
    </React.Suspense>
  );
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
        <Preload show={selectedStock != null}>
          <StockChart
            stock={selectedStock || stocks[0]}
            onClose={() => this.setState({ selectedStock: null })}
          />
        </Preload>
      </React.Suspense>
    );
  }
}

export default App;
