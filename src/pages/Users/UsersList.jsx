import React, { useEffect, useState } from 'react';
import { Button, Radio, Input, Popconfirm, Tooltip } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { activateUser, deactivateUser, getAdmins, getCustomers, getStaffs } from '../../store/action/users/usersAction';
import { downloadCSV } from '../../constants/helper';
import { BsXLg } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';

const UsersList = (props) => {

    const navigate = useNavigate();
    const [userType, setUserType] = useState('client');
    const [customerList, setCustomerList] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [adminList, setAdminList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        props.getCustomers_();
    }, []);

    

    useEffect(() => {
        if (props.customerList && Array.isArray(props.customerList)) {
            setCustomerList(props.customerList.map((customer) => {
                return {
                    key: customer.userId,
                    userId: customer.userId,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    userType: "Client",
                    email: customer.email,
                    phone: customer.phone,
                    isActive: customer.isActive,
                };
            }));
        }
        if (props.staffList && Array.isArray(props.staffList)) {
            setStaffList(props.staffList.map((staff) => {
                return {
                    key: staff.userId,
                    userId: staff.userId,
                    firstName: staff.firstName,
                    lastName: staff.lastName,
                    userType: "Staff",
                    email: staff.email,
                    phone: staff.phone,
                    isActive: staff.isActive,
                };
            }));
        }
        if (props.adminList && Array.isArray(props.adminList)) {
            setAdminList(props.adminList.map((admin) => {
                return {
                    key: admin.userId,
                    userId: admin.userId,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    userType: "Course Admin",
                    email: admin.email,
                    phone: admin.phone,
                    isActive: admin.isActive,
                };
            }));
        }
    }, [props.customerList, props.staffList, props.adminList]);

    useEffect(() => {
        if(userType === "client") {
            props.getCustomers_();
        }
        if(userType === "staff") {
            props.getStaffs_();
        }
        if(userType === "course admin") {
            props.getAdmins_();
        }
        setCurrentPage(1);
    }, [userType, props.deactiveUser, props.activeUser]);

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (a,b)=> a.userId - b.userId, 
            defaultSortOrder: 'descend',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: true, 
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: true, 
        },
        {
            title: 'User Type',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: 'Email ID',
            dataIndex: 'email',
            key: 'email',
            sorter: true, 
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            sorter: true, 
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                        {record.isActive ? 
                            (
                                <Popconfirm
                                    title="Are you sure to Deactivate this User?"
                                    onConfirm={() => props.deactivateUser_(record.userId) }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Tooltip title="Deactivate User">
                                        <div style={{ backgroundColor: '#FFE5E5', borderRadius: '50%', padding: '5px 6px', border: '2px solid #FF0808', cursor:"pointer" }}>
                                            <BsXLg style={{ color: '#FF0808', fontSize: '18px', margin:"-4px 1px" }} />
                                        </div>
                                    </Tooltip>
                                </Popconfirm>
                            ):(
                                <Popconfirm
                                    title="Are you sure to Activate this User?"
                                    onConfirm={() => props.activateUser_(record.userId) }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Tooltip title="Activate User">
                                        <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '5px 6px', border: '2px solid #FCAC20', cursor:"pointer" }}>
                                            <MdDone style={{ color: '#FCAC20', fontSize: '18px', margin:"-4px 1px" }}  />
                                        </div>
                                    </Tooltip>
                                </Popconfirm>
                            )
                        }
                    </div>
                    
                );
            }
        },
    ];

    const handleEdit = (record) => {
        navigate(`/edit-user/${record.userId}`);

    };

    const changeUserType = (data) => {
        setUserType(data.target.value);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = (userType === "client" ? 
        customerList:(userType === "staff" ? staffList: adminList)
    )?.filter((user) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            user.firstName?.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.lastName?.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.phone?.toString().toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    return (
        <AppBody
            heading="Users List"
            title="Manage Users"
            extra={<Button type="primary" onClick={() => navigate("/manage-user")}>Add User</Button>}
        >
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button 
                            type="default" 
                            style={{ marginRight: '66px' }} 
                            onClick={() => downloadCSV(
                                ['User ID', 'First Name', 'Last Name', 'User Type', 'Email ID', 'Phone Number'], 
                                filteredData.map(user => [
                                    user.userId, 
                                    user.firstName, 
                                    user.lastName, 
                                    user.userType, 
                                    user.email, 
                                    user.phone
                                ])
                            )}
                        >
                            Download CSV
                        </Button>
                        <div style={{ marginRight: '16px' }}>
                            <span>Filter: </span>
                            <Radio.Group defaultValue="client" style={{ marginLeft: '8px' }} onChange={(e) => { changeUserType(e); setCurrentPage(1); }}>
                                <Radio.Button value="client">Client</Radio.Button>
                                <Radio.Button value="staff">Staff</Radio.Button>
                                <Radio.Button value="course admin">Course Admin</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    <Input placeholder="Search Users" style={{ width: '200px' }} value={searchTerm} onChange={handleSearch} />
                </div>
                <Table columns={columns} dataSource={filteredData} pagination={{ current: currentPage, onChange: (page) => setCurrentPage(page) }} />
            </div>
        </AppBody>
    );
};

const mapStateToProps = (state) => ({
    customerList: state.customerList?.response,
    staffList: state.staffList?.response,
    adminList: state.adminList?.response,
    deactiveUser: state.deactivateUser?.response,
    activeUser: state.activateUser?.response,
});

const mapDispatchToProps = (dispatch) => ({
    getCustomers_: () => dispatch(getCustomers()),
    getStaffs_: () => dispatch(getStaffs()),
    getAdmins_: () => dispatch(getAdmins()),
    activateUser_: (userId) => dispatch(activateUser(userId)),
    deactivateUser_: (userId) => dispatch(deactivateUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
