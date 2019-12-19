import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { urlBase } from '../../../Index/Constants';

class DLStore {
  @observable SHIndexData = [];

  @action getIndexData = () => {
    let url = `${urlBase}/v1/stockData/getIndexData`;
    let reqBody = {
      ts_code: "399300.SZ",
      start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
      end_date: moment().format('YYYYMMDD'),
    }
    axios.post(url, reqBody).then(data => {
      console.log(data);
    });
  }
}

export default new DLStore();
