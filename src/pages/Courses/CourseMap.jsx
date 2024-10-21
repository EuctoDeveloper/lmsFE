import React, { useState, useEffect } from 'react';
import { Select, Button, Table, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import AppBody from '../../components/Layout/AppBody';
import { addCourseCriteria, getCourses } from '../../store/action/courses/courseAction';
import { PiShareNetworkBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Input } from 'antd';
import { getBranchesAction, getCentersAction, getDepartmentsAction, getDesignationsAction, getGroupsAction, getLocationsAction } from '../../store/action/masters/masterAction';

const { Option } = Select;

const CourseMap = (props) => {
    const [userType, setUserType] = useState('client');
    const [filters, setFilters] = useState({
        first: [],
        second: [],
        third: [],
    });
    const [courses, setCourses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [centers, setCenters] = useState([]);
    const [groups, setGroups] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [branches, setBranches] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isDirty, setIsDirty] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        getMasters();
        props.getCourses_();
    }, []);
    useEffect(() => {
        if (props.locations && Array.isArray(props.locations)) {
            setLocations(props.locations || []);
        }
    }, [props.locations]);
    useEffect(() => {
        if (props.centers && Array.isArray(props.centers)) {
            setCenters(props.centers || []);
        }
    }, [props.centers]);
    useEffect(() => {
        if (props.groups && Array.isArray(props.groups)) {
            setGroups(props.groups || []);
        }
    }, [props.groups]);
    useEffect(() => {
        if (props.departments && Array.isArray(props.departments)) {
            setDepartments(props.departments || []);
        }
    }, [props.departments]);
    useEffect(() => {
        if (props.designations && Array.isArray(props.designations)) {
            setDesignations(props.designations || []);
        }
    }, [props.designations]);
    useEffect(() => {
        if (props.branches && Array.isArray(props.branches)) {
            setBranches(props.branches || []);
        }
    }, [props.branches]);
    useEffect(() => {
        if (isDirty && props.addCourseCriteria && props.addCourseCriteria.message && props.addCourseCriteria.message.includes('Success')) {
            handleCancel(); 
            setIsDirty(false);
            props.getCourses_();
        }
    }, [props.addCourseCriteria]);

    const getMasters = () => {
        props.getLocations_();
        props.getCenters_();
        props.getGroups_();
        props.getDepartments_();
        props.getDesignations_();
        props.getBranches_();
    };

    const showModal = (course) => {
        setSelectedCourse(course);
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        setIsDirty(true);
        const data = {
            courseIds: [selectedCourse.courseId],
            userRole : selectedCourse.criteriaUserType === "All" ? ["*"] : [selectedCourse.criteriaUserType],
        }
        if(selectedCourse.criteriaUserType === 'client'){
            data.location = selectedCourse.first.includes('*') ? ['*'] : selectedCourse.first;
            data.center = selectedCourse.second.includes('*') ? ['*'] : selectedCourse.second;
            data.group = selectedCourse.third.includes('*') ? ['*'] : selectedCourse.third;
            data.branch = [];
            data.designation = [];
            data.department = [];
        } else if(selectedCourse.criteriaUserType === 'employee'){
            data.department = selectedCourse.first.includes('*') ? ['*'] : selectedCourse.first;
            data.branch = selectedCourse.second.includes('*') ? ['*'] : selectedCourse.second;
            data.designation = selectedCourse.third.includes('*') ? ['*'] : selectedCourse.third;
            data.location = [];
            data.center = [];
            data.group = [];
        } else {
            data.location = [];
            data.center = [];
            data.group = [];
            data.branch = [];
            data.designation = [];
            data.department = [];
        }
        props.addCourseCriteria_(data);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEdit = (course) => {
        course.first = course.first.includes("*") ? ["*"] : course.first.map(i=>parseInt(i));
        course.second = course.second.includes("*") ? ["*"] : course.second.map(i=>parseInt(i));
        course.third = course.third.includes("*") ? ["*"] : course.third.map(i=>parseInt(i));
        showModal(course);
    };

    const handleUserTypeChange = (value) => {
        setUserType(value);
        setFilters({ first: '', second: '', third: '' });
    };

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
    };
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

                let criteria = course.courseCriteria[0];
                if(criteria) {
                    let criteriaUserType = criteria.userRole[0].includes('client') ? 'client' : criteria.userRole[0].includes('employee') ? 'employee' : 'all';
                    return {
                        key: course.courseId,
                        courseId: course.courseId,
                        title: course.title,
                        status: status,
                        criteriaUserType: criteria.userRole.includes("*") ? "all" : criteria.userRole[0],
                        first: criteriaUserType === 'client' ? criteria.location : criteriaUserType === 'employee' ? criteria.department : ['All'],
                        second: criteriaUserType === 'client' ? criteria.center : criteriaUserType === 'employee' ? criteria.branch : ['All'],
                        third: criteriaUserType === 'client' ? criteria.group : criteriaUserType === 'employee' ? criteria.designation : ['All'],
                    } 
                } else {
                    return {
                        key: course.courseId,
                        courseId: course.courseId,
                        title: course.title,
                        status: status,
                        criteriaUserType: "unMapped",
                        first: ['Not Mapped'],
                        second: ['Not Mapped'],
                        third: ['Not Mapped'],
                    };
                }
            }));
        }
    }, [props.courseList]);


    const filteredData = courses.filter(course=>{
        return (
            (userType === course.criteriaUserType) 
            && (filters.first.length === 0 || filters.first.some(id => course.first.includes(id.toString())) || course.first.includes("*"))
            && (filters.second.length === 0 || filters.second.some(id => course.second.includes(id.toString())) || course.second.includes("*"))
            && (filters.third.length === 0 || filters.third.some(id => course.third.includes(id.toString())) || course.third.includes("*"))
        );
    })

    const columns = [
        {
            title: 'Course ID',
            dataIndex: 'courseId',
            key: 'courseId',
            sorter: (a, b) => a.courseId - b.courseId,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Course Name',
            dataIndex: 'title',
            key: 'title',
            sorter: true,
        },
        ...(userType !== 'all' && userType !== 'unMapped' ? [{
            title: userType === 'client' ? 'Location' : 'Department',
            dataIndex: 'first',
            key: 'first',
            render: item => {

                if(item.includes("*")) {
                    return (<p>All</p>)
                } else {
                    console.log(item, locations, locations.filter(i=>console.log(i.locationId.toString() || item.includes(i.locationId))));
                    return (<p>{(userType === 'client' ? locations:departments )?.filter(i=>item.includes(i[userType==='client'? "locationId" : "departmentId"])).map(i=>i.name).join(", ")}</p>)
                }
            }
        },
        {
            title: userType === 'client' ? 'Center' : 'Branch',
            dataIndex: 'second',
            key: 'second',
            render: item => {
                if(item.includes("*")) {
                    return (<p>All</p>)
                } else {
                    return (<p>{(userType === 'client' ? centers:branches)?.filter(i=>item.includes(i[userType==='client'? "centreId" : "branchId"])).map(i=>i.name).join(", ")}</p>)
                }
            }
        },
        {
            title: userType === 'client' ? 'Group' : 'Designation',
            dataIndex: 'third',
            key: 'third',
            render: item => {
                if(item.includes("*")) {
                    return (<p>All</p>)
                } else {
                    return (<p>{(userType === 'client' ? groups:designations)?.filter(i=>item.includes(i[userType==='client'? "groupId" : "designationId"])).map(i=>i.name).join(", ")}</p>)
                }
            }
        }] : []),
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
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
            render: (course) =>(
                userType === 'unMapped' ? (
                    <Space size="middle">
                        <Button icon={<PiShareNetworkBold />} onClick={()=>{navigate(`/set-map/${course.courseId}`)}} />
                    </Space>
                ):(
                    <Space size="middle">
                        <Button icon={<EditOutlined />} onClick={()=>{handleEdit(course)}} />
                    </Space>
                )
            )
        },
    ];

    const checkAll = (value, key) => {
        if(value.includes('*') && !selectedCourse[key].includes('*')) {
            return ['*'];
        } else {
            return value.filter(v => v !== '*');
        }
    }
    const validateDropdown = (_, value) => {
        if (value && value.length < 1) {
          return Promise.reject(new Error('At least one option must be selected'));
        }
        return Promise.resolve();
    };

    return (
        <AppBody title={"Map Course"} heading={"Manage Mapping"}>
            <div style={{ marginBottom: 16 }}>
                <h2>User Type</h2>
                <Select defaultValue="client" style={{ width: 200, marginRight: 8 }} onChange={handleUserTypeChange}>
                    <Option value="unMapped">Non Mapped</Option>
                    <Option value="client">Client</Option>
                    <Option value="employee">Employee</Option>
                    <Option value="all">All</Option>
                </Select>
                { (userType !== 'all' && userType !== 'unMapped' ) &&
                    <>
                        <div style={{ marginTop: "20px" }}>
                            <span style={{ marginRight: 8 }}>Filter Data:</span>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <Select
                                mode="multiple"
                                style={{ width: 'calc(30% - 16px)', marginRight: 8 }}
                                onChange={(value) => handleFilterChange('first', value)}
                                placeholder={userType === 'client' ? 'Location' : userType === 'employee' ? 'Department' : 'No Filters'}
                            >
                                {userType === 'client' && <>
                                    {(locations && Array.isArray(locations)?locations:[]).map(location => <Option value={location.locationId}>{location.name}</Option>)}
                                </>}
                                {userType === 'employee' && <>
                                    {(departments && Array.isArray(departments)?departments:[]).map(department => <Option value={department.departmentId}>{department.name}</Option>)}
                                </>}
                            </Select>
                            <Select
                                mode="multiple"
                                style={{ width: 'calc(30% - 16px)', marginRight: 8 }}
                                onChange={(value) => handleFilterChange('second', value)}
                                placeholder={userType === 'client' ? 'Center' : userType === 'employee' ? 'Branch' : 'No Filters'}
                            >
                                {userType === 'client' && <>
                                    {(centers && Array.isArray(centers)?centers:[]).map(center => <Option value={center.centreId}>{center.name}</Option>)}
                                </>}
                                {userType === 'employee' && <>
                                    {(branches && Array.isArray(branches)?branches:[]).map(branch => <Option value={branch.branchId}>{branch.name}</Option>)}
                                </>}
                            </Select>
                            <Select
                                mode="multiple"
                                style={{ width: 'calc(30% - 16px)', marginRight: 8 }}
                                onChange={(value) => handleFilterChange('third', value)}
                                placeholder={userType === 'client' ? 'Group' : userType === 'employee' ? 'Designation' : 'No Filters'}
                            >
                                {userType === 'client' && <>
                                    {(groups && Array.isArray(groups)?groups:[]).map(group => <Option value={group.groupId}>{group.name}</Option>)}
                                </>}
                                {userType === 'employee' && <>
                                    {(designations && Array.isArray(designations)?designations:[]).map(designation => <Option value={designation.designationId}>{designation.name}</Option>)}
                                </>}
                            </Select>
                            <Button style={{ width: 'calc(10% - 16px)', marginRight: 8 }} type="primary">Filter</Button>
                        </div>
                    </>
                }
            </div>
            <Table columns={columns} dataSource={filteredData} />
            <>
                <Modal
                    title="Edit Course"
                    visible={isModalVisible}
                    footer={null}
                    onCancel={handleCancel}
                >
                        <Form layout="horizontal" form={form} onFinish={handleSubmit}>
                        <Form.Item label="Course ID">
                            <Input value={selectedCourse?.courseId} disabled />
                        </Form.Item>
                        <Form.Item label="Course Name">
                            <Input value={selectedCourse?.title} disabled />
                        </Form.Item>
                        <Form.Item label="User Type">
                            <Select value={selectedCourse?.criteriaUserType} onChange={(value) => setSelectedCourse({ ...selectedCourse, criteriaUserType: value })}>
                                <Option value="client">Client</Option>
                                <Option value="employee">Employee</Option>
                                <Option value="all">All</Option>
                            </Select>
                        </Form.Item>
                        {selectedCourse?.criteriaUserType !== 'all' && (
                            <>
                                <Form.Item label={selectedCourse?.criteriaUserType === 'client' ? 'Location' : 'Department'} rules={[{ validator: validateDropdown}]}>
                                    <Select defaultValue={selectedCourse?.first} value={selectedCourse?.first} mode="multiple" onChange={(value) => {setSelectedCourse({ ...selectedCourse, first: checkAll(value, "first") })}}>
                                        <Option value="*">All</Option>
                                        {selectedCourse?.criteriaUserType === 'client' && <>
                                            {locations?.map(location => <Option value={location.locationId}>{location.name}</Option>)}
                                        </>}
                                        {selectedCourse?.criteriaUserType === 'employee' && <>
                                            {departments?.map(department => <Option value={department.departmentId}>{department.name}</Option>)}
                                        </>}
                                    </Select>
                                </Form.Item>
                                <Form.Item label={selectedCourse?.criteriaUserType === 'client' ? 'Center' : 'Branch'} rules={[{ validator: validateDropdown}]}>
                                    <Select defaultValue={selectedCourse?.second} value={selectedCourse?.second} mode="multiple" onChange={(value) => setSelectedCourse({ ...selectedCourse, second: checkAll(value, "second") })}>
                                        <Option value="*">All</Option>
                                        {selectedCourse?.criteriaUserType === 'client' && <>
                                            {centers?.map(center => <Option value={center.centreId}>{center.name}</Option>)}
                                        </>}
                                        {selectedCourse?.criteriaUserType === 'employee' && <>
                                            {branches?.map(branch => <Option value={branch.branchId}>{branch.name}</Option>)}
                                        </>}
                                    </Select>
                                </Form.Item>
                                <Form.Item label={selectedCourse?.criteriaUserType === 'client' ? 'Group' : 'Designation'} rules={[{ validator: validateDropdown}]}>
                                    <Select defaultValue={selectedCourse?.third} value={selectedCourse?.third} mode="multiple" onChange={(value) => setSelectedCourse({ ...selectedCourse, third: checkAll(value, "third") })}>
                                        <Option value="*">All</Option>
                                        {selectedCourse?.criteriaUserType === 'client' && <>
                                            {groups?.map(group => <Option value={group.groupId}>{group.name}</Option>)}
                                        </>}
                                        {selectedCourse?.criteriaUserType === 'employee' && <>
                                            {designations?.map(designation => <Option value={designation.designationId}>{designation.name}</Option>)}
                                        </>}
                                    </Select>
                                </Form.Item>
                            </>
                        )}
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>Cancel</Button>
                            <Button type="primary" htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        </AppBody>
    );
};

const mapStateToProps = state => ({
    courseList: state.courseList?.response,
    locations: state.locations?.response,
    centers: state.centres?.response,
    groups: state.groups?.response,
    departments: state.departments?.response,
    designations: state.designations?.response,
    branches: state.branches?.response,
    addCourseCriteria: state.addCourseCriteria?.response,
});

const mapDispatchToProps = dispatch => ({
    getCourses_: () => dispatch(getCourses()),
    getLocations_: () => dispatch(getLocationsAction()),
    getCenters_: () => dispatch(getCentersAction()),
    getGroups_: () => dispatch(getGroupsAction()),
    getDepartments_: () => dispatch(getDepartmentsAction()),
    getDesignations_: () => dispatch(getDesignationsAction()),
    getBranches_: () => dispatch(getBranchesAction()),
    addCourseCriteria_: (data) => dispatch(addCourseCriteria(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseMap);