import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryAxis
} from "victory";
import Modal from "./Modal";
import moment from "moment";

export default function Chart({ stock, onClose }) {
  const [first, ...rest] = Object.values(stock.data);
  const [last] = rest.reverse();
  const up = last.y >= first.y;
  const { width, height } = getDimentions();
  return (
    <Modal onClose={onClose}>
      <VictoryChart
        domain={{ y: [80, 220] }}
        height={height}
        width={width}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        <VictoryLabel
          text={stock.name}
          x={width / 2}
          y={30}
          textAnchor="middle"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        />
        <VictoryLine
          data={stock.data}
          labels={d => d.y}
          x={d => moment(d.x).format("MMM D")}
          style={{
            labels: { opacity: 0.75 },
            data: { stroke: up ? "darkgreen" : "darkred", strokeWidth: 3 }
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: "" },
            tickLabels: { opacity: 0.75, fontSize: "17px" }
          }}
        />
      </VictoryChart>
    </Modal>
  );
}

function getDimentions() {
  const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  const maxWidth = 600;
  const mobileViewportWidth = 500;
  let width = viewportWidth;
  width *= viewportWidth > mobileViewportWidth ? 0.9 : 1;
  width = Math.round(Math.min(width, maxWidth));

  const maxHeight = viewportHeight * 0.95;
  let height = width / 1.62;
  height = Math.round(Math.min(height, maxHeight));

  return { width, height };
}
