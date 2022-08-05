import Chart from "chart.js/auto"
import { onMount } from "solid-js"

const skipped = (ctx, value) => (ctx.p0.skip || ctx.p1.skip ? value : undefined)
const down = (ctx, value) =>
  ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined
const dataSet = {
  label: "فالور ها",
  borderColor: "green",
  segment: {
    borderColor: ctx => skipped(ctx, "rgb(0,0,0,0.2)") || down(ctx, "red"),
    borderDash: ctx => skipped(ctx, [6, 6]),
  },
  spanGaps: true,
  pointStyle: "circle",
  pointRadius: 4,
  pointHoverRadius: 10,
}
const data = {
  datasets: [dataSet],
}
const chartConfig = {
  type: "line",
  data,
  options: {
    fill: false,
    interaction: {
      intersect: false,
    },
    radius: 0,
  },
}
export function Graph(props) {
  let canvas
  onMount(() => {
    setTimeout(() => {
      data.labels = props.labels
      dataSet.data = props.data
      new Chart(canvas.getContext("2d"), chartConfig)
    }, 100)
  })
  return <canvas ref={canvas}></canvas>
}
