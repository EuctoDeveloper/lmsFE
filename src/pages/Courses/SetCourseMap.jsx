import React, { useEffect, useState } from 'react';
import { Layout, Table, Radio, Form, Button, Select } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { addCourseCriteria, getCourses } from '../../store/action/courses/courseAction';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBranchesAction, getCentersAction, getDepartmentsAction, getDesignationsAction, getGroupsAction, getLocationsAction } from '../../store/action/masters/masterAction';


const { Content } = Layout;
const { Option } = Select;

const SetCourseMap = (props) => {
    const [selectedType, setSelectedType] = useState('client');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [centers, setCenters] = useState([]);
    const [groups, setGroups] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [branches, setBranches] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isDirty, setIsDirty] = useState(false);
    const [location, setLocation] = useState([]);
    const [department, setDepartment] = useState([]);
    const [center, setCenter] = useState([]);
    const [branch, setBranch] = useState([]);
    const [group, setGroup] = useState([]);
    const [designation, setDesignation] = useState([]);
    const [courses, setCourses] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        props.getCourses_();
        getMasters();
        if(id)
            setSelectedRowKeys([parseInt(id)]);
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
        if(props.courseList && props.courseList.length > 0){
            setCourses(props.courseList.map(course => {
                    return {
                        key: course.courseId,
                        courseId: course.courseId,
                        title: course.title,
                    };
            }));
        }
    }, [props.courseList]);
    useEffect(() => {
        if(selectedType === 'client'){
            setDepartment([]);
            setBranch([]);
            setDesignation([]);
        } else if(selectedType === 'employee'){
            setLocation([]);
            setCenter([]);
            setGroup([]);
        } else {
            setLocation([]);
            setDepartment([]);
            setCenter([]);
            setBranch([]);
            setGroup([]);
            setDesignation([]);
        }
    }, [selectedType]);
    useEffect(() => {
        if(isDirty && props.addCourseCriteria && props.addCourseCriteria.message && props.addCourseCriteria.message.includes('Success')){
            navigate(-1);
        }
    }, [props.addCourseCriteria, isDirty])

    const columns = [
        {
            title: 'Course ID',
            dataIndex: 'courseId',
            key: 'courseId',
            sorter: (a, b) => a.courseId - b.courseId,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Course Title',
            dataIndex: 'title',
            key: 'title',
            sorter: true,
        },
    ];

    const getMasters = () => {
        props.getLocations_();
        props.getCenters_();
        props.getGroups_();
        props.getDepartments_();
        props.getDesignations_();
        props.getBranches_();
    };


    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const submitForm = () => {
        setIsDirty(true);
        const data = {
            courseIds: selectedRowKeys,
            userRole : selectedType === "All" ? ["*"] : [selectedType],
        }
        if(selectedType === 'client'){
            data.location = location.includes('*') ? ['*'] : location;
            data.center = center.includes('*') ? ['*'] : center;
            data.group = group.includes('*') ? ['*'] : group;
            data.branch = [];
            data.designation = [];
            data.department = [];
        } else if(selectedType === 'employee'){
            data.department = department.includes('*') ? ['*'] : department;
            data.branch = branch.includes('*') ? ['*'] : branch;
            data.designation = designation.includes('*') ? ['*'] : designation;
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
    const resetForm = () => {
        setSelectedType('client');
        setLocation([]);
        setDepartment([]);
        setCenter([]);
        setBranch([]);
        setGroup([]);
        setDesignation([]);
    }

    const checkAll = (value, item) => {
        if(value.includes('*') && !item.includes('*')) {
            return ['*'];
        } else {
            return value.filter(v => v !== '*');
        }
    }

    const renderDynamicInputs = () => {
        if (selectedType === 'All') return null;

        return (
            <>
                <Select
                    mode="multiple"
                    style={{ width: 'calc(30% - 16px)', marginRight: 8 }}
                    onChange={(value)=>{selectedType === 'client' ? setLocation(checkAll(value, location)) : setDepartment(checkAll(value, department))}}
                    value={selectedType === 'client' ? location : department}
                    placeholder={selectedType === 'client' ? 'Location' : selectedType === 'employee' ? 'Department' : 'No Filters'}
                >
                    {/* Options based on userType */}
                    <Option value="*">All</Option>
                    {selectedType === 'client' && <>
                        {(locations && Array.isArray(locations)?locations:[]).map(location => <Option value={location.locationId}>{location.name}</Option>)}

                    </>}
                    {selectedType === 'employee' && 
                        (departments && Array.isArray(departments)?departments:[]).map(department => <Option value={department.departmentId}>{department.name}</Option>)
                    }
                </Select>
                <Select
                    mode="multiple"
                    style={{ width: 'calc(30% - 16px)', marginRight: 8 }}
                    onChange={value => {selectedType === 'client' ? setCenter(checkAll(value, center)) : setBranch(checkAll(value, branch))}}
                    value={selectedType === 'client' ? center : branch}
                    placeholder={selectedType === 'client' ? 'Center' : selectedType === 'employee' ? 'Branch' : 'No Filters'}
                >
                    {/* Options based on userType */}
                    <Option value="*">All</Option>
                    {selectedType === 'client' && <>
                        {(centers && Array.isArray(centers)?centers:[]).map(center => <Option value={center.centreId}>{center.name}</Option>)}=
                    </>}
                    {selectedType === 'employee' && <>
                        {(branches && Array.isArray(branches)?branches:[]).map(branch => <Option value={branch.branchId}>{branch.name}</Option>)}
                    </>}
                </Select>
                <Select
                    mode="multiple"
                    style={{ width: 'calc(30% - 16px)', marginRight: 8 }}
                    onChange={value => {selectedType === 'client' ? setGroup(checkAll(value, group)) : setDesignation(checkAll(value, designation))}}
                    value={selectedType === 'client' ? group : designation}
                    placeholder={selectedType === 'client' ? 'Group' : selectedType === 'employee' ? 'Designation' : 'No Filters'}
                >
                    {/* Options based on userType */}
                    <Option value="*">All</Option>
                    {selectedType === 'client' && <>
                        {(groups && Array.isArray(groups)?groups:[]).map(group => <Option value={group.groupId}>{group.name}</Option>)}
                    </>}
                    {selectedType === 'employee' && <>
                        {(designations && Array.isArray(designations)?designations:[]).map(designation => <Option value={designation.designationId}>{designation.name}</Option>)}
                    </>}
                </Select>
            </>
        );
    };

    return (
        <AppBody heading={"Course Mapping"}>
            <Content style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <div style={{ flex: 0.4, paddingRight: '20px' }}>
                        <Table
                            columns={columns}
                            dataSource={courses}
                            pagination={false}
                            scroll={{ y: 300 }}
                            rowSelection={{
                                selectedRowKeys,
                                onChange: setSelectedRowKeys,
                            }}
                        />
                    </div>
                    <div style={{ flex: 0.6 }}>
                        <Radio.Group onChange={handleTypeChange} value={selectedType}>
                            <Radio value="client">Client</Radio>
                            <Radio value="employee">Employee</Radio>
                            <Radio value="All">All</Radio>
                        </Radio.Group>
                        <Form layout="vertical" style={{ marginTop: '20px' }}>
                            {renderDynamicInputs()}
                        </Form>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0' }}>
                            <Form.Item>
                                <Button type="default" onClick={resetForm} style={{marginRight: "15px"}}>Reset</Button>
                                <Button type="primary" onClick={submitForm}>Submit</Button>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Content>
        </AppBody>
    );
};

const mapStateToProps = state => ({
    courseList: state.courseList?.response,
    addCourseCriteria: state.addCourseCriteria?.response,
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
    addCourseCriteria_: (data) => dispatch(addCourseCriteria(data)),
    getLocations_: () => dispatch(getLocationsAction()),
    getCenters_: () => dispatch(getCentersAction()),
    getGroups_: () => dispatch(getGroupsAction()),
    getDepartments_: () => dispatch(getDepartmentsAction()),
    getDesignations_: () => dispatch(getDesignationsAction()),
    getBranches_: () => dispatch(getBranchesAction()),
    addCourseCriteria_: (data) => dispatch(addCourseCriteria(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(SetCourseMap);
