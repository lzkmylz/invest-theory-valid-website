import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { urlBase } from '../../../Index/Constants';

interface stockData {
  name: string,
  data: object[],
}

class DLStore {
  @observable SHIndexData = [];
  @observable currentStockData: stockData = {
    name: 'real',
    data: [],
  };
  @observable predictStockData: stockData = {
    name: 'predict',
    data: [],
  }

  @action getIndexData = () => {
    let url = `${urlBase}/v1/stockData/getIndexData`;
    let reqBody = {
      ts_code: "399300.SZ",
      start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
      end_date: moment().format('YYYYMMDD'),
    };
    axios.post(url, reqBody).then(data => {
      console.log(data);
    });
  }

  @action getGRUPredictData = (stock_name: string) => {
    let url = `${urlBase}/v1/stockData/getGRUPredictData`;
    let reqBody = {
      stock_name: stock_name,
      start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
      end_date: moment().format('YYYYMMDD'),
    };
    axios.post(url, reqBody).then((data) => {
      let predictStockData: stockData = {
        name: 'predict',
        data: [],
      };
      let items: any = data.data;
      for(let i = 0; i < items.length; i++) {
        let singleData = {
          name: items[i].stock_name,
          x: moment(items[i].trade_date, "YYYYMMDD").valueOf(),
          y: -1,
        };
        if(parseInt(items[i].predict_result)) {
          singleData.y = 1;
        }
        predictStockData.data.push(singleData);
      }
      this.predictStockData = predictStockData;
    });
  }

  @action getStockData = (ts_code: string) => {
    let url = `${urlBase}/v1/stockData/getAStockData`;
    let reqBody = {
      ts_code: ts_code,
      start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
      end_date: moment().format('YYYYMMDD'),
    };
    axios.post(url, reqBody).then(data => {
      let resStockData = data.data.data;
      let currentStockData: stockData = {
        name: "real",
        data: [],
      };
      for(let i = 0; i < resStockData.items.length; i++) {
        let singleData = {
          name: resStockData.items[i][0],
          x: moment(resStockData.items[i][1], "YYYYMMDD").valueOf(),
          y: 0,
          date: resStockData.items[i][1],
          open: resStockData.items[i][2],
          high: resStockData.items[i][3],
          low: resStockData.items[i][4],
          close: resStockData.items[i][5],
          vol: resStockData.items[i][9],
          amount: resStockData.items[i][10],
        };
        if(Number(resStockData.items[i][2]) < Number(resStockData.items[i][5])) {
          singleData.y = 1;
        } else if (Number(resStockData.items[i][2]) > Number(resStockData.items[i][5])) {
          singleData.y = -1
        }
        currentStockData.data.push(singleData);
      }
      this.currentStockData = currentStockData
    });
  }
}

export default new DLStore();
