import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import { connect } from 'react-redux';

const { Content } = Layout;

const AppLayout = () => {

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Layout>
        <LeftBar />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflowY: 'auto'
          }}
        >
          <TopBar />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};



const mapStateToProps = state => ({
  user: state.user.response,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps,
  mapDispatchToProps)(AppLayout);
