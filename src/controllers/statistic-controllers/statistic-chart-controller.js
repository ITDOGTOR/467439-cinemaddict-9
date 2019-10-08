import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import StatisticChart from '../../components/statistic/statistic-chart.js';

import {renderElement, getGenresCount} from '../../util.js';

export default class StatisticChartController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._genre = getGenresCount(this._filmsData);
    this._chart = null;

    this._statisticChart = new StatisticChart();

    this._init();
  }

  updateChart(container, updatedFilmsData) {
    this._statisticChart.removeElement();
    this._chart.destroy();
    this._filmsData = updatedFilmsData;
    this._genre = getGenresCount(this._filmsData);

    renderElement(container, this._statisticChart.getElement());

    if (!(updatedFilmsData.filter((updatedFilmData) => updatedFilmData.userDetails.alreadyWatched).length)) {
      return;
    }

    this._chart = this._createGenresChart(this._genre);
  }

  _init() {
    renderElement(this._container, this._statisticChart.getElement());
    this._chart = this._createGenresChart(this._genre);
  }

  _createGenresChart(chartData) {
    return new Chart(this._statisticChart.getElement().querySelector(`.statistic__chart`), {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(chartData)],
        datasets: [{
          data: [...Object.values(chartData)],
          backgroundColor: `#ffe800`,
        }]
      },
      options: {
        tooltips: {
          enabled: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              display: false,
              min: 0
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          yAxes: [{
            barPercentage: 1,
            categoryPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontColor: `#ffffff`,
              fontSize: 18,
              display: true,
              padding: 100
            },
          }]
        },
        legend: {
          display: false
        },
        animation: {
          onProgress() {
            const chartInstance = this.chart;
            const ctx = chartInstance.ctx;
            ctx.textAlign = `right`;
            ctx.font = `18px Open Sans`;
            ctx.fillStyle = `#ffffff`;

            Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
              const meta = chartInstance.controller.getDatasetMeta(i);
              Chart.helpers.each(meta.data.forEach(function (bar, index) {
                const data = dataset.data[index];
                if (i === 0) {
                  ctx.fillText(data, 150, bar._model.y + 4);
                } else {
                  ctx.fillText(data, bar._model.x - 28, bar._model.y + 4);
                }
              }));
            }), this);
          }
        },
        plugins: {
          datalabels: {
            display: false,
          }
        }
      }
    });
  }
}
