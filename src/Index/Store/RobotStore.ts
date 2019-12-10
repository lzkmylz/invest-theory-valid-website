import { action } from 'mobx';
import axios from 'axios';
import { urlBase } from '../Constants';

class RobotStore {
  @action getAnswer(question: string) {
    let url = `${urlBase}/v2/robot/compute_vector`;
    let body = {
      corpora_id: "1",
      question: question,
      method: "compute_answer"
    };
    axios.post(url, JSON.stringify(body)).then((data) => {
      let requestId = data.data.request_id;
      let timmer = setInterval(() => {
        
      }, 10000);
    });
  }
}

export default new RobotStore();
