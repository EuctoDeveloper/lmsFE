import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, DatePicker as AntDatePicker, Form, Alert, Upload, message } from 'antd';
import { RiArrowGoBackLine } from "react-icons/ri";
import AppBody from '../../components/Layout/AppBody';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCourse, getCourse, updateCourse } from '../../store/action/courses/courseAction';
import dayjs from 'dayjs';
import OpenNotification from '../../utils/OpenNotification';
import { UploadOutlined } from '@ant-design/icons';


const AddCourse = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [form] = Form.useForm();
    const [isDirty, setIsDirty] = useState(false);
    const [imageChanged, setImageChanged] = useState(false);
    const [fileKey, setFileKey] = useState(Date.now()); // Unique key to reset input


    const filesRef = useRef(null);

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
    const draggerProps = {
        name: 'file',
        multiple: false,  // To allow only one file
        maxCount: 1,      // Limit to one file
        showUploadList: true,  // If you want to show the file list
        beforeUpload: (file) => {
            if (file.size / 1024 / 1024 > 10) {
                OpenNotification("error", "File Size Error", 'File must be smaller than 10 MB!');
                return Upload.LIST_IGNORE;
            }
            const validMimeTypes = ['image/jpeg', 'image/png'];
            if (!validMimeTypes.includes(file.type)) {
                OpenNotification("error", "File Type Error", 'File must be a JPEG or PNG image!');
                return Upload.LIST_IGNORE;
            }
          message.success(`${file.name} selected.`);
          return false;
        },
        onChange: () => {
            setImageChanged(true);
        },
        onRemove: (file) => {
          // Remove the file from the list if needed
          if(filesRef && filesRef.current)
            filesRef.current = filesRef.current.filter((f) => f.uid !== file.uid);
          return true;
        },
      };

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
        if (values.image?.fileList.length > 0) {
            formData.append('thumbnail', values.image?.fileList[0].originFileObj);
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
            { id && props.course && moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <Alert
                        message="Warning"
                        description="This course cannot be edited as already mapped and the start date has already passed."
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
                            rules={[{ required: true, message: 'Please input the course title!' }, 
                                { whitespace: true, message: 'Course title cannot be empty' }]}
                            style={{ flex: 1 }}
                        >
                            <Input
                                disabled={id && props.course && moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Course Image (Accepts Upto 10 MB)"
                            name="image"
                            rules={[
                                { required: !id ? true: false, message: 'Please upload the course image!' },
                            ]}
                            style={{ flex: 0.5 }}
                        >
                            <Upload
                                name="files" 
                                listType="picture"
                                accept="image/jpeg,image/png"
                                maxCount={1}
                                disabled={id && props.course && moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0}
                                {...draggerProps}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
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
                                disabled={id && props.course && moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0}
                                disabledDate={!id ? (current) => current && current < moment().startOf('day'): null}
                                inputReadOnly={id && props.course && moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0}
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
                                disabled={id && props.course && moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0}
                                disabledDate={(current) => current && current < moment().startOf('day')}
                                inputReadOnly
                            />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Course Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the course description!' }, 
                            { whitespace: true, message: 'Course description cannot be empty' }]}
                    >
                        <Input.TextArea rows={5}
                            disabled={id && props.course && moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0} />
                    </Form.Item>
                </div>
                { !(moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0) && (

                    <div style={{ textAlign: 'right', padding: '10px 0' }}>
                        <Button type="default" htmlType="reset" style={{ marginRight: '10px' }}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                )} 
            
                { id && props.course && moment(props.course.startDate).isBefore(moment()) && props.course.courseCriteria && props.course.courseCriteria.length > 0 && (

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