import React from 'react';
import { observer } from 'mobx-react';
import * as Highcharts from 'highcharts'

@observer
class StockChart extends React.Component {

  render() {
    var chart = Highcharts.chart('stock-chart', {
      chart: {
        type: "spline"
      },
      title: {
        text: "Predict and Real Performance"
      },
      xAxis: {
        categories: []
      },
      
    });

    return (
      <div className="stock-chart" ></div>
    );
  }
}

export default StockChart;
