import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser, getUserDetail, updateUser } from '../../store/action/users/usersAction';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { getBranchesAction, getCentersAction, getDepartmentsAction, getDesignationsAction, getGroupsAction, getLocationsAction } from '../../store/action/masters/masterAction';

const { Option } = Select;

const ManageUser = (props) => {
    const [userType, setUserType] = useState('');
    const [locations, setLocations] = useState([]);
    const [centers, setCenters] = useState([]);
    const [groups, setGroups] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [branches, setBranches] = useState([]);
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [navigateHelper, setNavigateHelper] = useState(false);

    useEffect(() => {
        form.resetFields();
        if (id) {
            props.getUserDetail_(id);
        }
        props.getLocations_();
        props.getDepartments_();
        props.getBranches_();
        props.getDesignations_();
        props.getCenters_();
        props.getGroups_();
    }, []);
    useEffect(() => {
        if (navigateHelper && (
            (!id && props.createUser.message && props.createUser.message.includes("success")) || 
            (id && props.updateUser.message && props.updateUser.message.includes("success")))
        ) {
            navigate("/users");
        }
    }, [props.createUser, props.updateUser]);

    useEffect(() => {
        if (id && props.userDetail) {
            form.setFieldsValue({
                firstName: props.userDetail.firstName,
                lastName: props.userDetail.lastName,
                userType: props.userDetail.role === "customer" ? "client" : props.userDetail.role === "employee" ? "staff" : "course admin",
                locationId: props.userDetail.locationId,
                centerId: props.userDetail.centerId,
                groupId: props.userDetail.groupId,
                departmentId: props.userDetail.departmentId,
                branchId: props.userDetail.branchId,
                designationId: props.userDetail.designationId,
                email: props.userDetail.email,
                phone: props.userDetail.phone?.toString(),
            });
            setUserType(props.userDetail.role === "customer" ? "client" : props.userDetail.role === "instructor" ? "staff" : "course admin");
        }
    }, [props.userDetail]);

    useEffect(() => {
        if (props.locations) {
            setLocations(props.locations || []);
        }
    }, [props.locations]);
    useEffect(() => {
        if (props.centers) {
            setCenters(props.centers || []);
        }
    }, [props.centers]);
    useEffect(() => {
        if (props.groups) {
            setGroups(props.groups || []);
        }
    }, [props.groups]);
    useEffect(() => {
        if (props.departments) {
            setDepartments(props.departments || []);
        }
    }, [props.departments]);
    useEffect(() => {
        if (props.designations) {
            setDesignations(props.designations || []);
        }
    }, [props.designations]);
    useEffect(() => {
        if (props.branches) {
            setBranches(props.branches || []);
        }
    }, [props.branches]);

    const handleUserTypeChange = (value) => {
        setUserType(value);
    };

    const handleSubmit = (values) => {
        setNavigateHelper(true);
        values.userType = userType;
        if(!id)
            props.createUser_(values);
        else
            props.updateUser_(id, values);
    };

    const handleReset = () => {
        form.resetFields();
    };

    const handleBackClick = () => {
        navigate('/users');
    };

    return (
        <AppBody heading="Manage Users" title={id ? "Edit User" : "Add User"} extra={
            <Button
                onClick={handleBackClick}
                style={{ backgroundColor: "#FF6767", borderRadius: "30px", padding: "8px" }}
            >
                <RiArrowGoBackLine style={{ color: "white", fontWeight: "700" }} />
            </Button>
        }>
            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter first name' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter last name' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    { !id &&
                        <Col span={8}>
                            <Form.Item name="userType" label="User Type" rules={[{ required: true, message: 'Please select user type' }]}>
                                <Select onChange={handleUserTypeChange}>
                                    <Option value="client">Client</Option>
                                    <Option value="staff">Staff</Option>
                                    <Option value="course admin">Course Admin</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    }
                </Row>
                    {userType === 'client' && (
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="locationId" label="Location Name" rules={[{ required: true, message: 'Please select location name' }]}>
                                    <Select>
                                        {(locations && Array.isArray(locations)? locations:[])?.map((location) => (
                                            <Option key={location.locationId} value={location.locationId}>{location.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="centerId" label="Center Name" rules={[{ required: true, message: 'Please select center name' }]}>
                                    <Select>
                                        {(centers && Array.isArray(centers)? centers:[])?.map((center) => (
                                            <Option key={center.centreId} value={center.centreId}>{center.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="groupId" label="Group Name" rules={[{ required: true, message: 'Please select group name' }]}>
                                    <Select>
                                        {(groups && Array.isArray(groups)? groups:[])?.map((group) => (
                                            <Option key={group.groupId} value={group.groupId}>{group.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                    {userType !== 'client' && (
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="departmentId" label="Department" rules={[{ required: true, message: 'Please select department' }]}>
                                    <Select>
                                        {(departments && Array.isArray(departments)? departments : []).map((department) => (
                                            <Option key={department.departmentId} value={department.departmentId}>{department.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="branchId" label="Branch" rules={[{ required: true, message: 'Please select branch' }]}>
                                    <Select>
                                        {(branches && Array.isArray(branches)? branches:[]).map((branch) => (
                                            <Option key={branch.branchId} value={branch.branchId}>{branch.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="designationId" label="Designation" rules={[{ required: true, message: 'Please select designation' }]}>
                                    <Select>
                                        {(designations && Array.isArray(designations)? designations:[])?.map((designation) => (
                                            <Option key={designation.designationId} value={designation.designationId}>{designation.name}</Option>
                                        ))}                               
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="email" label="Email ID" rules={[{ required: true, message: 'Please enter email id' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter phone number' }, { pattern: /^\d{10}$/, message: 'Phone Number requires exactly 10 digits' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Col>
                            <Button onClick={handleReset} style={{ marginRight: 8 }}>
                                Reset
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
            </Form>
        </AppBody>
    );
};

const mapStateToProps = (state) => ({
    userDetail: state.userDetail?.response,
    createUser: state.createUser?.response,
    updateUser: state.updateUser?.response,
    locations: state.locations?.response,
    departments: state.departments?.response,
    branches: state.branches?.response,
    designations: state.designations?.response,
    centers: state.centres?.response,
    groups: state.groups?.response,
});

const mapDispatchToProps = (dispatch) => ({
    getUserDetail_: (userId) => dispatch(getUserDetail(userId)),
    createUser_: (data) => dispatch(createUser(data)),
    updateUser_: (userId, data) => dispatch(updateUser(userId, data)),
    getLocations_: () => dispatch(getLocationsAction()),
    getDepartments_: () => dispatch(getDepartmentsAction()),
    getBranches_: () => dispatch(getBranchesAction()),
    getDesignations_: () => dispatch(getDesignationsAction()),
    getCenters_: () => dispatch(getCentersAction()),
    getGroups_: () => dispatch(getGroupsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
