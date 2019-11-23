import React from 'react';
import { observer } from 'mobx-react';
import { Menu, Dropdown, Icon, Button } from 'antd';
import UserStore from '../Store/UserStore';
import { HistoryInterface } from '../../Utils/Interfaces';
import '../Style/IndexHeader.scss';

@observer
class IndexHeader extends React.Component<HistoryInterface> {

  handleMenuClick = (e: any) => {
    switch(e.key) {
      case "logout":
        UserStore.UserLogOut();
        this.props.history.push("/");
        return;
      case "signin":
        this.props.history.push("/login");
        return;
      case "signup":
        this.props.history.push("/register");
        return;
      case "resetpassword":
        this.props.history.push("/reset-password");
        return;
      case "dashboard":
        this.props.history.push("/dashboard");
        return;
      case "donate":
        this.props.history.push("/donate");
        return;
      case "products":
        this.props.history.push("/products");
        return;
      default:
        console.log(e);
    }
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick} >
        <Menu.Item key="dashboard" >Dashboard</Menu.Item>
        <Menu.Item key="resetpassword" >Reset Password</Menu.Item>
        <Menu.Item key="logout" >Log Out</Menu.Item>
      </Menu>
    );
    const mobileUnsignMenu = (
      <Menu onClick={this.handleMenuClick} >
        <Menu.Item key="products" >Products</Menu.Item>
        <Menu.Item key="donate" >Donate</Menu.Item>
        <Menu.Item key="support" >Support</Menu.Item>
        <Menu.Item key="signin" >Sign In</Menu.Item>
        <Menu.Item key="logout" >Log Out</Menu.Item>
      </Menu>
    );
    const mobileSignedMenu = (
      <Menu onClick={this.handleMenuClick} >
        <Menu.Item key="products" >Products</Menu.Item>
        <Menu.Item key="donate" >Donate</Menu.Item>
        <Menu.Item key="support" >Support</Menu.Item>
        <Menu.Item key="dashboard" >Dashboard</Menu.Item>
        <Menu.Item key="resetpassword" >Reset Password</Menu.Item>
        <Menu.Item key="logout" >Log Out</Menu.Item>
      </Menu>
    );
    return (
      <div className="header-container" >
        <h1 className="header-title" >
          <a href="/" >InvestValid</a>
        </h1>
        <div className="header-menu mobile" >
          <Dropdown overlay={Boolean(UserStore.accessToken) ? mobileSignedMenu : mobileUnsignMenu} >
            <Button >
              <Icon type="menu" />
            </Button>
          </Dropdown>
        </div>
        <ul className="header-nav-container desktop" >
          <li className="header-nav-item" ><p><a href="/products" >Products</a></p></li>
          <li className="header-nav-item" ><p><a href="/donate" >Donate</a></p></li>
          <li className="header-nav-item" ><p>Support</p></li>
        </ul>
        <div className="header-login-container desktop" >
          {
            Boolean(UserStore.accessToken) ? (
              <div>
                <span>Welcome, &nbsp;</span>
                <Dropdown overlay={menu} >
                  <span className="header-dropdown" >
                    {UserStore.userAttributes.nickname}<Icon type="down" />
                  </span>
                </Dropdown>
              </div>
            ) : (
              <div className="header-login desktop" >
                <a href="/login" className="header-login-a" >Sign In</a>
                <div className="header-signup-div" >
                  <a href="/register" className="header-signup-a" >Sign Up</a>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default IndexHeader;
