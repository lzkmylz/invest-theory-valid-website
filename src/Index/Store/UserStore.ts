import { observable, action } from 'mobx';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../Constants';

// private variable types
export type UserAttributes = {
  email: String,
  nickname: String,
  sub: String,
  emailVerified: Boolean
}

class UserStore {
  // obervable variables
  @observable userPool = new CognitoUserPool({
    UserPoolId: config.cognito.userPoolId ? config.cognito.userPoolId : '',
    ClientId: config.cognito.userPoolClientId ? config.cognito.userPoolClientId : ''
  });
  @observable cognitoUser: CognitoUser = new CognitoUser({
    Username: '',
    Pool: this.userPool
  });
  @observable accessToken: String = '';
  @observable userAttributes: UserAttributes = {
    email: '',
    nickname: '',
    sub: '',
    emailVerified: false
  };

  // actions
  @action setCognitoUser = (cognitoUser: CognitoUser) => {
    this.cognitoUser = cognitoUser;
  }
  @action setAccessToken = (accessToken: String) => {
    this.accessToken = accessToken;
  }
  @action getUserPool = () => {
    return this.userPool;
  }
  @action setUserAttributes = (attributes: UserAttributes) => {
    this.userAttributes = attributes;
  }
}

export default new UserStore();