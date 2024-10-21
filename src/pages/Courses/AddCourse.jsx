import React, { useEffect, useState } from 'react';
import { Button, Input, DatePicker as AntDatePicker, Form, Alert } from 'antd';
import { RiArrowGoBackLine } from "react-icons/ri";
import AppBody from '../../components/Layout/AppBody';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCourse, getCourse, updateCourse } from '../../store/action/courses/courseAction';
import dayjs from 'dayjs';

const AddCourse = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [form] = Form.useForm();
    const [isDirty, setIsDirty] = useState(false);
    const [imageChanged, setImageChanged] = useState(false);

    useEffect(() => {
        if(id) {
            props.getCourse_(id);
        }
    }, []);
    useEffect(() => {
        if(id && props.course) {
            form.setFieldsValue({
                title: props.course.title,
                courseImage: props.course.image,
                startDate: dayjs(moment.utc(props.course.startDate).format("DD-MM-YYYY"),"DD-MM-YYYY" ),
                endDate: dayjs(moment.utc(props.course.endDate).format("DD-MM-YYYY"),"DD-MM-YYYY" ),
                description: props.course.description,
            });
        }
    }, [props.course]);
    useEffect(() => {
        if(isDirty){
            if(id && props.updateCourse && props.updateCourse.message && props.updateCourse.message.includes('Success')) {
                navigate(`/add-module/${id}`)
            } else if(props.addCourse && props.addCourse.message && props.addCourse.message.includes('Success')) {
                let courseId = props.addCourse.course.courseId;
                navigate(`/add-module/${courseId}`);

            }
        }

    }, [props.addCourse, props.updateCourse]);

    const handleBackClick = () => {
        navigate('/courses');
    };
    const submitCourse = (values) => {
        setIsDirty(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('startDate', dayjs(values.startDate).format('YYYY-MM-DD'));
        formData.append('endDate', dayjs(values.endDate).format('YYYY-MM-DD'));
        formData.append('description', values.description);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput.files.length > 0) {
            formData.append('thumbnail', fileInput.files[0]);
        }
        if(id) {
            props.updateCourse_(id, formData);
        }
        else {
            props.addCourse_(formData);
        }
    };

    return (
        <AppBody
            heading={"Manage Course"}
            title={id ? "Edit Course" : "Add Course"}
            extra={
                <Button
                    onClick={handleBackClick}
                    style={{ backgroundColor: "#FF6767", borderRadius: "30px", padding: "8px" }}
                >
                    <RiArrowGoBackLine style={{ color: "white", fontWeight: "700" }} />
                </Button>
            }
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            { id && props.course && moment(props.course.startDate).isBefore(moment()) && (
                <div style={{ marginBottom: '20px' }}>
                    <Alert
                        message="Warning"
                        description="This course cannot be edited as the start date has already passed."
                        type="warning"
                        showIcon
                    />
                </div>
            )}
            <Form
                layout="vertical"
                onFinish={submitCourse}
                initialValues={{ remember: true }}
                requiredMark={false}
                form={form}
            >
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Form.Item
                            label="Course Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input the course title!' }]}
                            style={{ flex: 1 }}
                        >
                            <Input
                                disabled={id && props.course && moment(props.course.startDate).isBefore(moment())}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Course Image"
                            name="image"
                            rules={[
                                { required: !id ? true: false, message: 'Please upload the course image!' },
                            ]}
                            style={{ flex: 0.5 }}
                        >
                            <Input type="file" accept="image/jpeg,image/png" onChange={()=>setImageChanged(true)}
                                disabled={id && props.course && moment(props.course.startDate).isBefore(moment())} />
                        </Form.Item>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Form.Item
                            label="Start Date"
                            name="startDate"
                            rules={[{ required: true, message: 'Please select the start date!' }]}
                            style={{ flex: 0.2 }}
                        >
                            <AntDatePicker
                                disabled={id && props.course && moment(props.course.startDate).isBefore(moment())}
                                disabledDate={!id ? (current) => current && current < moment().startOf('day'): null}
                                inputReadOnly={id && props.course && moment(props.course.startDate).isBefore(moment())}
                            />
                        </Form.Item>
                        <Form.Item
                            label="End Date"
                            name="endDate"
                            dependencies={['startDate']}
                            rules={[
                                { required: true, message: 'Please select the end date!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!getFieldValue('startDate')) {
                                            return Promise.reject(new Error('Select Start date First!'));
                                        }
                                        if (value && value < moment().startOf('day')) {
                                            return Promise.reject(new Error('End date cannot be before today!'));
                                        }
                                        if (!value || getFieldValue('startDate') <= value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('End date cannot be before start date!'));
                                    },
                                }),
                            ]}
                            style={{ flex: 0.5 }}
                        >
                            <AntDatePicker
                                disabled={id && props.course && moment(props.course.startDate).isBefore(moment())}
                                disabledDate={(current) => current && current < moment().startOf('day')}
                                inputReadOnly
                            />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Course Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the course description!' }]}
                    >
                        <Input.TextArea rows={5}
                            disabled={id && props.course && moment(props.course.startDate).isBefore(moment())} />
                    </Form.Item>
                </div>
                { !moment(props.course.startDate).isBefore(moment()) && (

                    <div style={{ textAlign: 'right', padding: '10px 0' }}>
                        <Button type="default" htmlType="reset" style={{ marginRight: '10px' }}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                )} 
            
                { id && props.course && moment(props.course.startDate).isBefore(moment()) && (

                    <div style={{ textAlign: 'right', padding: '10px 0' }}>
                        <Button type="primary" htmlType="button" onClick={()=>navigate(`/add-module/${id}/1`)}>
                            View Modules and Lessons
                        </Button>
                    </div>
                )}
            </Form>
        </AppBody>
    );
};

const mapStateToProps = (state) => ({
    course: state.courseDetail?.response,
    addCourse: state.addCourse?.response,
    updateCourse: state.updateCourse?.response,
});

const mapDispatchToProps = (dispatch) => ({
    getCourse_: (id) => dispatch(getCourse(id)),
    updateCourse_: (id, data) => dispatch(updateCourse(id, data)),
    addCourse_: (data) => dispatch(addCourse(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);