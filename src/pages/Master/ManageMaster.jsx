import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { addBranchAction, addCenterAction, addDepartmentAction, addDesignationAction, addGroupAction, addLocationAction, getBranchAction, getCenterAction, getDepartmentAction, getDesignationAction, getGroupAction, getLocationAction, updateBranchAction, updateCenterAction, updateDepartmentAction, updateDesignationAction, updateGroupAction, updateLocationAction } from '../../store/action/masters/masterAction';


const ManageMaster = (props) => {
    const { id, master } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [navigateHelper, setNavigateHelper] = useState(false);

    useEffect(() => {
        form.resetFields();
        if (id) {
            props["get" + master.charAt(0).toUpperCase() + master.slice(1) + "Detail_"](id);
        }
    }, []);
    useEffect(() => {
        
        if (navigateHelper && (
            (!id && props["add" + master.charAt(0).toUpperCase() + master.slice(1)].message && props["add" + master.charAt(0).toUpperCase() + master.slice(1)].message.includes("Success")) || 
            (id && props["update" + master.charAt(0).toUpperCase() + master.slice(1)].message && props["update" + master.charAt(0).toUpperCase() + master.slice(1)].message.includes("Success")))
        ) {
            navigate(`/master/${master}`);
        }
    }, [props["add"+ master.charAt(0).toUpperCase() + master.slice(1)], props["update" + master.charAt(0).toUpperCase() + master.slice(1)]]);

    useEffect(() => {
        if (id && props[master]) {
            form.setFieldsValue({
                name: props[master].name,
            });
        }
    }, [props[master]]);

    const handleSubmit = (values) => {
        setNavigateHelper(true);
        if(!id)
            props["add" + master.charAt(0).toUpperCase() + master.slice(1)+"_"](values);
        else
            props["update" + master.charAt(0).toUpperCase() + master.slice(1)+"_"](id, values);
    };

    const handleReset = () => {
        form.resetFields();
    };

    const handleBackClick = () => {
        navigate('/master/' + master);
    };

    return (
        <AppBody heading={`Manage ${master.charAt(0).toUpperCase() + master.slice(1)}`} title={`${id ? "Edit " : "Add "} ${master.charAt(0).toUpperCase() + master.slice(1)}`} extra={
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
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
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
    addCentre: state.addCentre?.response,
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
    addLocation_: (data) => dispatch(addLocationAction(data)),
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
