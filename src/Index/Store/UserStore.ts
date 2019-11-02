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
  @action initUserFromLocalStorage = () => {
    var cognitoUser = this.userPool.getCurrentUser();
    if(cognitoUser != null) {
      cognitoUser.getSession((err: Error, result: any) => {
        if(err) {
          console.log(err);
        }
        var accessToken = result.getAccessToken().getJwtToken();
        this.setAccessToken(accessToken);
        if(cognitoUser === null) return;
        cognitoUser.getUserAttributes((err, result) => {
          if(err) {
            console.log(err.message);
          }
          if(result === undefined) return;
          var userAttributes: UserAttributes = {
            email: '',
            nickname: '',
            sub: '',
            emailVerified: false
          };
          for (let i = 0; i < result.length; i++) {
            if(result[i].getName() === "email") userAttributes.email = result[i].getValue();
            if(result[i].getName() === "nickname") userAttributes.nickname = result[i].getValue();
            if(result[i].getName() === "sub") userAttributes.sub = result[i].getValue();
            if(result[i].getName() === "email_verified") userAttributes.emailVerified = Boolean(result[i].getValue());
          }
          this.setUserAttributes(userAttributes);
        });
      });
    }
  }
}

export default new UserStore();