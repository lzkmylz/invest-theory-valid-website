import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';

class DLStore {
  @observable SHIndexData = [];

  @action getIndexData = () => {
    let url = "http://api.waditu.com";
    
  }
}

export default new DLStore();
