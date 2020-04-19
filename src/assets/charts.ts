import * as Chart from 'chart.js';
import { ChartPoint } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';

export function createChart(el: HTMLCanvasElement, datapoints: ChartPoint[]) {
  const context = el.getContext('2d');

  context.canvas.width = el.parentElement.clientWidth;

  new Chart(context, {
    plugins: [ChartDataLabels],
    type: 'line',
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          align: 'top',
          offset: 2,
          formatter: (value: ChartPoint) => {
            return (+value.y).toFixed(0);
          },
        },
      },
      layout: { padding: { top: 20 } },
      legend: {
        display: false,
      },
      tooltips: { mode: 'index' },
      scales: {
        yAxes: [
          {
            display: false,
          },
        ],
        xAxes: [
          {
            gridLines: { display: false },
            type: 'time',
            position: 'bottom',
            display: true,
            time: {
              stepSize: 3,
              unit: 'hour',
              displayFormats: { hour: 'h A' },
            },
            ticks: {
              min: datapoints[0].x,
              max: datapoints[datapoints.length - 1].x,
              stepSize: 10800,
            },
          },
        ],
      },
    },
    data: {
      datasets: [
        {
          backgroundColor: 'rgba(255, 204, 0, 0.2)',
          borderColor: '#fc0',
          pointRadius: 0,
          data: datapoints,
        },
      ],
    },
  });
}
