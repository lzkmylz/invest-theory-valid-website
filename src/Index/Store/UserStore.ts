import { observable } from 'mobx';

class UserStore {
  @observable userName:String = '';
}

export default new UserStore();