import React, { useEffect, useState } from 'react';
import AppBody from '../../components/Layout/AppBody';
import { Button, Input, Radio, Table } from 'antd';
import { connect } from 'react-redux';
import { getCustomers, getStaffs } from '../../store/action/users/usersAction';
import { getCourses } from '../../store/action/courses/courseAction';
import { downloadCSV } from '../../constants/helper';
import { useNavigate } from 'react-router-dom';

const LearnerProgress = (props) => {
    const [activeTab, setActiveTab] = useState('user');
    const [filterTab, setFilterTab] = useState('client');
    const [courses, setCourses] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        props.getCustomers_();
    }, []);

    useEffect(() => {
        if (activeTab === 'user') {
            if(filterTab === 'client'){
                props.getCustomers_();
            } else if(filterTab === 'staff'){
                props.getStaffs_();
            }
        } else if (activeTab === 'course') {
            props.getCourses_();
        }
    }, [activeTab, filterTab]);


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
                };
            }));
        }
    }, [props.customerList, props.staffList]);
    useEffect(() => {
        if(props.courseList && props.courseList.length > 0){
            setCourses(props.courseList.map(course => {
                let status = 'Deactivated';
                    if(course.isActive) {
                        const today = new Date();
                        const startDate = new Date(course.startDate);
                        const endDate = new Date(course.endDate);

                        if (today.toDateString() >= startDate.toDateString() && today.toDateString() <= endDate.toDateString()) {
                            status = 'Active';
                        }
                        else {
                            status = 'Inactive';
                        }
                    }

                return {
                    key: course.courseId,
                    courseId: course.courseId,
                    title: course.title,
                    uploadedDate: new Date(course.createdAt).toLocaleDateString(),
                    startDate: new Date(course.startDate).toLocaleDateString(),
                    endDate: new Date(course.endDate).toLocaleDateString(),
                    status: status,
                };
            }));
        }
    }, [props.courseList]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const filteredData =  (activeTab === "user" ? (filterTab === "client" ? customerList : staffList) : courses)
    ?.filter((item) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        if(activeTab === "course"){
            return (
                lowerCaseSearchTerm ? item.title?.toLowerCase().includes(lowerCaseSearchTerm) : true
            );
        } else {
            return (
                item.firstName?.toLowerCase().includes(lowerCaseSearchTerm) ||
                item.lastName?.toLowerCase().includes(lowerCaseSearchTerm) ||
                item.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
                item.phone?.toString().toLowerCase().includes(lowerCaseSearchTerm)            );
        }
    });

    const exportData = () => {
        const data = filteredData.map((item) => {
            if(activeTab === "user"){
                return[
                    item.userId, 
                    item.firstName, 
                    item.lastName, 
                    item.userType, 
                    item.email, 
                    item.phone
                ];
            } else if(activeTab === "course"){
                return[
                    item.courseId,
                    item.title,
                    item.uploadedDate,
                    item.status
                ];
            }
        });

        const header = activeTab === "user" ? 
            ['User ID', 'First Name', 'Last Name', 'User Type', 'Email ID', 'Phone Number'] :
            ['Course ID', 'Course Title', 'Uploaded Date', 'Status'];
        
        downloadCSV(header, data);
    };

    const columns = {
        user: [
            {
                title: 'Id',
                dataIndex: 'userId',
                key: 'userId',
            },
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Button type="primary" onClick={()=>navigate(`/track/user/${record.userId}?user=${record.firstName} ${record.lastName}`)}>Track</Button>
                ),
            },
        ],
        course: [
            {
                title: 'Course Id',
                dataIndex: 'courseId',
                key: 'courseId',
            },
            {
                title: 'Course Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Uploaded Date',
                dataIndex: 'uploadedDate',
                key: 'uploadedDate',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status => {
                    let color = 'green';
                    if (status === 'Inactive') {
                        color = '#CDB500';
                    } else if (status === 'Deactivated') {
                        color = 'red';
                    }
                    return (
                        // <Tag color={color}>
                        <>
                            <span style={{ marginRight: 8, display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: color }}></span>
                            {status}
                        </>
                        // </Tag>
                    );
                },
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Button type="primary"  onClick={()=>navigate(`/track/course/${record.courseId}?course=${record.title}`)}>Track</Button>
                ),
            },
        ],
    };

    return (
        <AppBody heading={"Learner Progress"}>
            <div className="tabs">
                <Radio.Group defaultValue="a" buttonStyle="solid"  style={{backgroundColor: "#F3661F", padding: "4px 10px", borderRadius: "10px", marginBottom: '20px'}} onChange={e=>setActiveTab(e.target.value)}>
                    <Radio.Button value="user" style={{borderRadius: "10px", backgroundColor: activeTab === "user" ? "white" : "#F3661F", borderColor: "#F3661F", color: activeTab === "user" ? "black" : "white"}}>User List</Radio.Button>
                    <Radio.Button value="course" style={{borderRadius: "10px", backgroundColor: activeTab === "course" ? "white" : "#F3661F", borderColor: "#F3661F", color: activeTab === "course" ? "black" : "white"}}>Course List</Radio.Button>
                </Radio.Group>
            </div>
            <div className="controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className="left-controls" style={{ display: 'flex', alignItems: 'center' }}>
                    <Button style={{ marginRight: '10px' }} onClick={exportData}>Download CSV</Button>
                    { activeTab === "user" &&
                        <>
                            <p style={{margin: "5px"}}>Filter</p>
                            <Radio.Group value={filterTab} onChange={e => setFilterTab(e.target.value)} style={{ marginRight: '10px' }}>
                                <Radio value="client">Client</Radio>
                                <Radio value="staff">Staff</Radio>
                            </Radio.Group>
                        </>
                    }
                </div>
                <div className="right-controls">
                    <Input type="text" placeholder="Search..." style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} onChange={handleSearch} />
                </div>
            </div>
            <div className="content">
                <Table columns={columns[activeTab]} dataSource={filteredData} />
            </div>
        </AppBody>
    );
};

const mapStateToProps = (state) => ({
    customerList: state.customerList?.response,
    staffList: state.staffList?.response,
    courseList: state.courseList?.response,
});

const mapDispatchToProps = (dispatch) => ({
    getCustomers_: () => dispatch(getCustomers()),
    getStaffs_: () => dispatch(getStaffs()),
    getCourses_: () => dispatch(getCourses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnerProgress);