import React from "react";
import {
  BellOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Badge, Dropdown, Menu } from "antd";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/action/common/authAction";

function TopBar(props) {


  const navigate = useNavigate();


  const logout = () => {
    localStorage.clear();
    props.setUser_(null);
    props.clearLoginResponse_();
    navigate("/login");
  };
  const menu = (
    <Menu>
      {/* <Menu.Item key="profile">
        <div onClick={() => navigate("/profile")}>
          <UserOutlined /> Profile
        </div>
      </Menu.Item> */}
      <Menu.Item key="logout" onClick={logout}>
        <div>
          <LogoutOutlined /> Logout
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: 0, display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: props.toggle,
        })} */}
        <div className="logo" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', color: 'white' }}>
        {/* <Dropdown overlay={menu} trigger={['click']}>
          <div style={{ marginRight: '25px', position: 'relative', color: "black", borderRadius: '10px',
              backgroundColor: 'white',
              border: '1px solid #BBBBBB', padding:"10px" }}>
            <Badge count={10} overflowCount={99}>
              <BellOutlined style={{ fontSize: '24px', color: 'black' }} />
            </Badge>
          </div>
        </Dropdown> */}
        <Dropdown overlay={menu} trigger={['click']}>
          <button
            type="button"
            style={{
              minWidth: '150px',
              maxWidth: '350px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'white',
              border: '1px solid #BBBBBB',
              color: 'black',
            }}
          >
            {props.user?.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}&nbsp;&nbsp;&nbsp;&nbsp;
            <DownOutlined />
          </button>
        </Dropdown>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user.response,
  wallet: state.wallet
})

const mapDispatchToProps = dispatch => ({
  clearLoginResponse_: () => {
      dispatch({ type: 'FETCH_LOGIN_CLEAR' });
  },
  setUser_: (data) => {
      dispatch(setUser(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
