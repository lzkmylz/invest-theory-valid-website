import { observable, action } from 'mobx';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import axios from 'axios';
import { config, urlBase } from '../Constants';

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
  @observable cognitoUser: CognitoUser | null = null;
  @observable accessToken: String = '';
  @observable userAttributes: UserAttributes = {
    email: '',
    nickname: '',
    sub: '',
    emailVerified: false
  };

  // actions
  @action setCognitoUser = (cognitoUser: CognitoUser | null) => {
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
      this.setCognitoUser(cognitoUser);
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

  @action UserLogOut = () => {
    if(this.cognitoUser != null) {
      this.cognitoUser.signOut();
      this.setCognitoUser(null);
      this.setAccessToken('');
      this.setUserAttributes({
        email: '',
        nickname: '',
        sub: '',
        emailVerified: false
      });
    }
  }

  @action SetAvatar = (avatarUrl: string) => {
    if(this.cognitoUser != null) {
      var attributeList = [];
      var attribute = {
        Name: 'custom:s3_avatar_url',
        Value: avatarUrl,
      };
      attributeList.push(attribute);
      this.cognitoUser.updateAttributes(attributeList, function(err: any, result: any) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('call result: ' + result);
      });
    }
  }

  @action UpdateAvatar = (file: string, filetype: string) => {
    let url = urlBase + '/userAttr/updateAvatar';
    let body = {
      file: file,
      filetype: filetype
    };
    return axios.post(url, JSON.stringify(body));
  }
}

export default new UserStore();