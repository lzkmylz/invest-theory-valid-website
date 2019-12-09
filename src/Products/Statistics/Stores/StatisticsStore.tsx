import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { urlBase } from '../../../Index/Constants';

class StatisticsStore {
  @observable similarityScore: number | null = null;

  @action similarityCompute = (stock1: string, stock2: string, timeRange: string) => {
    let endDate = moment().format('YYYYMMDD');
    let timeSub = 45;
    if(timeRange === "60") {
      timeSub = 90;
    } else if (timeRange === "90") {
      timeSub = 135;
    }
    let startDate = moment().subtract(timeSub, 'days').format('YYYYMMDD');
    let requestBody = {
      stock1: stock1,
      stock2: stock2,
      startDate: startDate,
      endDate: endDate
    };
    let url = `${urlBase}/v2/statistics/similarity_compute`;

    return axios.post(url, JSON.stringify(requestBody));
  }
}

export default new StatisticsStore();