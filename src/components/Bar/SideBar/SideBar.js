import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Menu } from "antd";

import styles from "./SideBar.module.css";
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.state = {
      openKeys: ['sub1']
    };
  }

  onOpenChange(keys) {
    const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
    this.setState(latestOpenKey ? { openKeys: [latestOpenKey] } : { openKeys: [] })
  }

  render() {
    const { SubMenu, Item } = Menu;
    const data = this.props.data;
    const openKeys = this.state.openKeys;
    const propsMenu = {
      mode: "inline",
      className: styles.menu,
      onOpenChange: this.onOpenChange,
      openKeys: openKeys
    }

    return (
      <Menu {...propsMenu}>
        {
          data.map(submenu =>
            <SubMenu
              title={submenu.title}
              key={submenu.key}
              className={styles.submenu}
            >
              {
                submenu.items.map(item =>
                  <Item key={item.key} className={styles.item}>
                    <Link to={item.path}>{item.value}</Link>
                  </Item>)
              }
            </SubMenu>
          )
        }
      </Menu>
    );
  }
}

export default SideBar;