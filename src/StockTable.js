import React from "react";

export default function StockTable({ stocks, onSelect }) {
  return (
    <table>
      <caption>Stocks</caption>
      <tbody>
        {stocks.map(stock => (
          <Row key={stock.name} stock={stock} onClick={() => onSelect(stock)} />
        ))}
      </tbody>
    </table>
  );
}

function Row({ stock, onClick }) {
  return (
    <tr key={stock.name} onClick={onClick}>
      <td>{stock.name}</td>
      <td>{stock.today}</td>
      <td style={{ color: stock.change < 0 ? "darkred" : "darkgreen" }}>
        {stock.change < 0 ? stock.change : "+" + stock.change}%
      </td>
    </tr>
  );
}
