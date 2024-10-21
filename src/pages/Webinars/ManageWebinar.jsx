import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, TimePicker, Select } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { addBranchAction, addCenterAction, addDepartmentAction, addDesignationAction, addGroupAction, addLocationAction, getBranchAction, getCenterAction, getDepartmentAction, getDesignationAction, getGroupAction, getLocationAction, updateBranchAction, updateCenterAction, updateDepartmentAction, updateDesignationAction, updateGroupAction, updateLocationAction } from '../../store/action/masters/masterAction';
import moment from 'moment/moment';


const ManageMaster = (props) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [navigateHelper, setNavigateHelper] = useState(false);

    useEffect(() => {
        form.resetFields();
        if (id) {
            //get webinar
        }
    }, []);
    useEffect(() => {
        //success and edit dep and navigate logic
    }, []);

    // useEffect(() => {
    //     if (id && props.webinars) {
    //         form.setFieldsValue({
    //             name: props.webinars.titls,
    //         });
    //     }
    // }, [props.webinars]);

    const handleSubmit = (values) => {
        // setNavigateHelper(true);
        // if(!id)
        //     props["add" + master.charAt(0).toUpperCase() + master.slice(1)+"_"](values);
        // else
        //     props["update" + master.charAt(0).toUpperCase() + master.slice(1)+"_"](id, values);
    };

    const handleReset = () => {
        form.resetFields();
    };

    const handleBackClick = () => {
        // navigate('/master/' + master);
    };

    return (
        <AppBody heading={`Manage Webinars`} title={`${id ? "Edit " : "Add "} Webinar`} extra={
            <Button
                onClick={handleBackClick}
                style={{ backgroundColor: "#FF6767", borderRadius: "30px", padding: "8px" }}
            >
                <RiArrowGoBackLine style={{ color: "white", fontWeight: "700" }} />
            </Button>
        }>
            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                <Row gutter={16}>
                    <Col span={10}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter Webinar Title' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="host" label="Host" rules={[{ required: true, message: 'Please select a host' }]}>
                            <Select>
                                {(props.hosts || []).map(host => (
                                    <Select.Option key={host.id} value={host.id}>
                                        {host.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
                            <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD" disabledDate={(current) => current && current < moment().endOf('day')} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please select a time' }]}>
                            <TimePicker format="HH:mm" disabledHours={() => [...Array(24).keys()].filter(h => h < moment().hour())} />
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
    location: state.location?.response,
    department: state.department?.response,
    branch: state.branch?.response,
    designation: state.designation?.response,
    centre: state.center?.response,
    group: state.group?.response,
    addLocation: state.addLocation?.response,
    addDepartment: state.addDepartment?.response,
    addBranch: state.addBranch?.response,
    addDesignation: state.addDesignation?.response,
    addCentre: state.addCenter?.response,
    addGroup: state.addGroup?.response,
    updateLocation: state.updateLocation?.response,
    updateDepartment: state.updateDepartment?.response,
    updateBranch: state.updateBranch?.response,
    updateDesignation: state.updateDesignation?.response,
    updateCentre: state.updateCenter?.response,
    updateGroup: state.updateGroup?.response,
});

const mapDispatchToProps = (dispatch) => ({
    getLocationDetail_: (id) => dispatch(getLocationAction(id)),
    getDepartmentDetail_: (id) => dispatch(getDepartmentAction(id)),
    getBranchDetail_: (id) => dispatch(getBranchAction(id)),
    getDesignationDetail_: (id) => dispatch(getDesignationAction(id)),
    getCentreDetail_: (id) => dispatch(getCenterAction(id)),
    getGroupDetail_: (id) => dispatch(getGroupAction(id)),
    addLocation: (data) => dispatch(addLocationAction(data)),
    addDepartment_: (data) => dispatch(addDepartmentAction(data)),
    addBranch_: (data) => dispatch(addBranchAction(data)),
    addDesignation_: (data) => dispatch(addDesignationAction(data)),
    addCentre_: (data) => dispatch(addCenterAction(data)),
    addGroup_: (data) => dispatch(addGroupAction(data)),
    updateLocation_: (id, data) => dispatch(updateLocationAction(id, data)),
    updateDepartment_: (id, data) => dispatch(updateDepartmentAction(id, data)),
    updateBranch_: (id, data) => dispatch(updateBranchAction(id, data)),
    updateDesignation_: (id, data) => dispatch(updateDesignationAction(id, data)),
    updateCentre_: (id, data) => dispatch(updateCenterAction(id, data)),
    updateGroup_: (id, data) => dispatch(updateGroupAction(id, data)),


});

export default connect(mapStateToProps, mapDispatchToProps)(ManageMaster);
