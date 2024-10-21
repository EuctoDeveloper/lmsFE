import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  UsergroupAddOutlined,
  SettingFilled,
  FundProjectionScreenOutlined
} from '@ant-design/icons';
import { FaUserGraduate } from "react-icons/fa6";
import { PiShareNetworkBold } from "react-icons/pi";
import { SiGooglemeet } from "react-icons/si";

import { connect } from "react-redux";

function LeftBar(props) {
    const location = useLocation();

return (
    <Sider theme="light" trigger={null}>
        <div style={{ margin: '16px', textAlign: 'center' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '80%', height: 'auto' }} />
        </div>
        <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            key={location.pathname}
            items={[
                {
                    key: '/',
                    icon: <BarChartOutlined />,
                    label: (
                        <Link to={"/"}>Dashboard</Link>
                    ),
                },
                (props.user && props.user.role === 'admin' &&
                {
                    key: '/users',
                    icon: <UsergroupAddOutlined />,
                    label: (
                        <Link to="/users">Manage Users</Link>
                    ),
                }),
                {
                    key: '/courses',
                    icon: <FaUserGraduate />,
                    label: (
                        <Link to="/courses">Manage Course</Link>
                    ),
                },
                {
                    key: '/course-map',
                    icon: <PiShareNetworkBold />,
                    label: (
                        <Link to="/course-map">Course Mapping</Link>
                    ),
                },
                {
                    key: '/learner-progress',
                    icon: <FundProjectionScreenOutlined />,
                    label: (
                        <Link to="/learner-progress">Learner's Progress</Link>
                    ),
                },
                {
                    key: '/meetings',
                    icon: <SiGooglemeet />,
                    label: (
                        <Link to="/meetings">Webinars</Link>
                    ),
                },
                {
                    key: '/master',
                    icon: <SettingFilled />,
                    label: 'Master',
                    children: [
                        {
                            key: '/master/department',
                            label: (
                                <Link to="/master/department">Department</Link>
                            ),
                        },
                        {
                            key: '/master/location',
                            label: (
                                <Link to="/master/location">Location</Link>
                            ),
                        },
                        {
                            key: '/master/designation',
                            label: (
                                <Link to="/master/designation">Designation</Link>
                            ),
                        },
                        {
                            key: '/master/centre',
                            label: (
                                <Link to="/master/centre">Centre</Link>
                            ),
                        },
                        {
                            key: '/master/group',
                            label: (
                                <Link to="/master/group">Group</Link>
                            ),
                        },
                        {
                            key: '/master/branch',
                            label: (
                                <Link to="/master/branch">Branches</Link>
                            ),
                        },
                    ],
                },
            ]}
        />
    </Sider>
);
}

const mapStateToProps = state => ({
    user: state.user.response,
  })
  
  const mapDispatchToProps = dispatch => ({
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LeftBar);