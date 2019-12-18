import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { config } from '../../../Index/Constants';

class DLStore {
  @observable SHIndexData = [];

  @action getIndexData = () => {
    let url = "http://api.waditu.com";
    let reqBody = {
      api_name: "index_daily",
      token: config.tushare.token,
      params: {
        ts_code: "399300.SZ",
        start_date: moment().subtract(15, 'days').format('YYYYMMDD'),
        end_date: moment().format("YYYYMMDD"),
      },
      fields: "",
    };

  }
}

export default new DLStore();
