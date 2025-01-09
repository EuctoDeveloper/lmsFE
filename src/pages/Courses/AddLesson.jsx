import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Upload, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Content } from 'antd/es/layout/layout';
import AppBody from '../../components/Layout/AppBody';
import { connect } from 'react-redux';
import { addLesson, getLesson, updateLesson } from '../../store/action/courses/courseAction';
import OpenNotification from '../../utils/OpenNotification';

const AddLesson = (props) => {
    const navigate = useNavigate();
    const {id, moduleId, courseId} = useParams();
    const [form] = Form.useForm();
    const [isUpdate, setIsUpdate] = useState(false);
    const filesRef = useRef([]);

    const draggerProps = {
        name: 'file',
        multiple: false,  // To allow only one file
        maxCount: 1,      // Limit to one file
        showUploadList: true,  // If you want to show the file list
        beforeUpload: (file) => {
            const isMp4 = file.type === 'video/mp4';
            if (!isMp4) {
                OpenNotification("error", "File Type Error", "Only MP4 files are allowed!");
                return Upload.LIST_IGNORE;
            }
            if (file.size / 1024 / 1024 > 500) {
                OpenNotification("error", "File Size Error", "File must be smaller than 500 MB!");
                return Upload.LIST_IGNORE;
            }
            message.success(`${file.name} selected.`);
            return false; // Prevent automatic upload
        },
        onRemove: (file) => {
          // Remove the file from the list if needed
          filesRef.current = filesRef.current.filter((f) => f.uid !== file.uid);
        },
      };
    


    const handleSubmit = (values) => {
        setIsUpdate(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('type', 'video');
        formData.append('totalGrade', 0);
        // let data = {title: values.title, content: values.content, type: 'video', totalGrade: 0};
        if(id) {
            if(values.attachment && values.attachment[0]) {
                formData.append('source', values.attachment[0].originFileObj);
            }
            props.updateLesson_(id, formData);
        } else {
            formData.append('source', values.attachment[0].originFileObj);
            formData.append('courseId', courseId);
            formData.append('moduleId', moduleId);
            props.addLesson_(formData);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        if(id) {
            props.getLesson_(id);
        }
    }, []);

    useEffect(() => {
        if(id && props.lesson) {
            form.setFieldsValue({
                title: props.lesson.title,
                content: props.lesson.content,
            });
        }
    }, [props.lesson]);
    useEffect(() => {
        if(isUpdate && props.lessonUpdate && props.lessonUpdate.message && props.lessonUpdate.message.includes("Success")) {
            navigate(-1);
        } else if(isUpdate && props.addLesson && props.addLesson.message && props.addLesson.message.includes("Success")) {
            navigate(-1);
        }
    }, [props.lessonUpdate, props.addLesson]);

    return (
        <AppBody
        heading={"Manage Course"}
        title="Add Lesson"
        extra={
            <Button
                onClick={handleBackClick}
                style={{ backgroundColor: "#FF6767", borderRadius: "30px", padding: "8px" }}
            >
                <RiArrowGoBackLine style={{ color: "white", fontWeight: "700" }} />
            </Button>
        }
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Content style={{ padding: '24px' }}>
                <Form layout="vertical" onFinish={handleSubmit} 
                    requiredMark={false} form={form}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Please input the title!' }, 
                                    { whitespace: true, message: 'Title cannot be empty' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Attachment (Accepts Upto 500MB)"
                        name="attachment"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                        rules={[{ required: !id ? true: false, message: 'Please upload a video!' }]}
                    >
                        <Upload.Dragger 
                            name="files" 
                            listType="picture"
                            accept="video/*"
                            maxCount={1}
                            {...draggerProps}
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag video file to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="content"
                        rules={[{ required: true, message: 'Please input the description!' }, 
                            { whitespace: true, message: 'Description cannot be empty' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ display: 'block', margin: '0 auto' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </AppBody>
    );
};

const mapStateToProps = (state) => ({
    lesson: state.lessonDetail?.response,
    lessonUpdate: state.lessonUpdate?.response,
    addLesson: state.addLesson?.response,
});

const mapDispatchToProps = (dispatch) => ({
    getLesson_: (id) => dispatch(getLesson(id)),
    updateLesson_: (id, data) => dispatch(updateLesson(id, data)),
    addLesson_: (data) => dispatch(addLesson(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLesson);