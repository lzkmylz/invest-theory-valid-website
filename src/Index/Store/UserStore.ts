import { observable, action } from 'mobx';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../Constants';

class UserStore {
  @observable userPool = new CognitoUserPool({
    UserPoolId: config.cognito.userPoolId ? config.cognito.userPoolId : '',
    ClientId: config.cognito.userPoolClientId ? config.cognito.userPoolClientId : ''
  });
  @observable cognitoUser: CognitoUser = new CognitoUser({
    Username: '',
    Pool: this.userPool
  });
  @observable accessToken: String = '';

  @action setCognitoUser = (cognitoUser: CognitoUser) => {
    this.cognitoUser = cognitoUser;
  }
  @action setAccessToken = (accessToken: String) => {
    this.accessToken = accessToken;
  }
  @action getUserPool = () => {
    return this.userPool;
  }
}

export default new UserStore();