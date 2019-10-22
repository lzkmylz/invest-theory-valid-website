import React from 'react';
import '../Style/IndexHeader.scss';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { List } from '@material-ui/icons';

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

  render() {
    return (
      <div className="header-container" >
        <h1 className="header-title" >
          InvestValid
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
            <MenuItem onClick={this.handleClose}>Login</MenuItem>
          </Menu>
        </div>
        <ul className="header-nav-container desktop" >
          <li className="header-nav-item" ><p>Products</p></li>
          <li className="header-nav-item" ><p>Pricing</p></li>
          <li className="header-nav-item" ><p>Support</p></li>
        </ul>
        <h4 className="header-login desktop" >
          <a href="/login" className="header-login-a" >Sign In</a>
        </h4>
      </div>
    );
  }
}

export default IndexHeader;
