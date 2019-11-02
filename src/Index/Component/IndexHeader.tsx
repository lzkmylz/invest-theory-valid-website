import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { List } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { Menu as AntdMenu, Dropdown, Icon } from 'antd';
import UserStore from '../Store/UserStore';
import '../Style/IndexHeader.scss';

@observer
class IndexHeader extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleLogOut = () => {
    UserStore.UserLogOut();
  }

  render() {
    const menu = (
      <AntdMenu>
        <AntdMenu.Item>
          <div onClick={this.handleLogOut} >Log Out</div>
        </AntdMenu.Item>
      </AntdMenu>
    );
    return (
      <div className="header-container" >
        <h1 className="header-title" >
          <a href="/" >InvestValid</a>
        </h1>
        <div className="header-menu mobile" >
          <IconButton onClick={this.handleClick} >
            <List htmlColor="#ffffff" fontSize="large" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Products</MenuItem>
            <MenuItem onClick={this.handleClose}>Pricing</MenuItem>
            <MenuItem onClick={this.handleClose}>Support</MenuItem>
            <MenuItem onClick={this.handleClose}>
              <a className="header-menuitem" href="/login" >Sign In</a>
            </MenuItem>
          </Menu>
        </div>
        <ul className="header-nav-container desktop" >
          <li className="header-nav-item" ><p>Products</p></li>
          <li className="header-nav-item" ><p>Pricing</p></li>
          <li className="header-nav-item" ><p>Support</p></li>
        </ul>
        <div className="header-login-container" >
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
