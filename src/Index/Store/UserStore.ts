import { observable, action } from 'mobx';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../Constants';

class UserStore {
  @observable userPool = new CognitoUserPool({
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.userPoolClientId
  });
  @observable cognitoUser: CognitoUser = new CognitoUser({
    Username: '',
    Pool: this.userPool
  });

  @action setCognitoUser = (cognitoUser: CognitoUser) => {
    this.cognitoUser = cognitoUser;
  }
}

export default new UserStore();