import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Space, Modal, Popconfirm, Tooltip } from 'antd';
import { DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppBody from '../../components/Layout/AppBody';
import { connect } from 'react-redux';
import { activateCourseAction, clearCourse, deactivateCourseAction, getCourses } from '../../store/action/courses/courseAction';
import { downloadCSV } from '../../constants/helper';
import moment from 'moment/moment';
import { BsXLg } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';

const CourseList = (props) => {

    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
  
    const showModal = (imageUrl) => {
      setSelectedImage(imageUrl);
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  

    const columns = [
        {
            title: 'ID',
            dataIndex: 'courseId',
            key: 'courseId',
            sorter: (a, b)=> a.courseId - b.courseId,
            defaultSortOrder: 'descend',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (text, record) => (
            <img
              src={record.image}
              alt="thumbnail"
              style={{ width: '100px', cursor: 'pointer' }}
              onClick={() => showModal(record.image)}
            />
          ),
        },
        {
            title: 'Course Title',
            dataIndex: 'courseTitle',
            key: 'courseTitle',
            sorter: true, 
        },
        {
            title: 'Uploaded Date',
            dataIndex: 'uploadedDate',
            key: 'uploadedDate',
            sorter: true, 
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'uploadedDate',
            sorter: true, 
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'uploadedDate',
            sorter: true, 
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status), 
            render: status => {
                let color = 'green';
                if (status === 'Inactive') {
                    color = '#CDB500';
                } else if (status === 'Deactivated') {
                    color = 'red';
                }
                return (
                    <>
                        <span style={{ marginRight: 8, display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: color }}></span>
                        {status}
                    </>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                const isEditable = moment(record.startDate, 'DD-MM-YYYY').valueOf() > moment.now();
                return (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Button
                                icon={<EditOutlined />} 
                                onClick={() => {
                                    // if (!isEditable) {
                                    //     Modal.warning({
                                    //         title: 'Course Edit Restricted',
                                    //         content: 'Course is already started, hence Cannot be Edited',
                                    //     });
                                    // } else {
                                        navigate(`/manage-course/${record.courseId}`);
                                    // }
                                }} 
                            />
                            {record.isActive ? 
                                (
                                    <Popconfirm
                                        title="Are you sure to Deactivate this Course?"
                                        onConfirm={() => props.deactivateCourse_(record.courseId) }
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Tooltip title="Deactivate Course">
                                            <div style={{ backgroundColor: '#FFE5E5', borderRadius: '50%', padding: '5px 6px', border: '2px solid #FF0808', cursor:"pointer" }}>
                                                <BsXLg style={{ color: '#FF0808', fontSize: '18px', margin:"-4px 1px" }} />
                                            </div>
                                        </Tooltip>
                                    </Popconfirm>
                                ):(
                                    <Popconfirm
                                        title="Are you sure to Activate this Course?"
                                        onConfirm={() => props.activateCourse_(record.courseId) }
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Tooltip title="Activate Course">
                                            <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '5px 6px', border: '2px solid #FCAC20', cursor:"pointer" }}>
                                                <MdDone style={{ color: '#FCAC20', fontSize: '18px', margin:"-4px 1px" }}  />
                                            </div>
                                        </Tooltip>
                                    </Popconfirm>
                                )
                            }
                        </div>
                );
            },
        },
    ];

    const navigate = useNavigate();

    useEffect(() => {
        props.getCourses_();
    }, []);

    useEffect(() => {
            props.getCourses_();
    }, [props.activeCourse, props.deactiveCourseAction]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData =  courses
    ?.filter((course) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            lowerCaseSearchTerm ? course.courseTitle?.toLowerCase().includes(lowerCaseSearchTerm) : true
        );
    });

    useEffect(() => {
        if(props.courseList && props.courseList.length > 0){
            setCourses(props.courseList.map(course => {
                let status = 'Deactivated';
                    if(course.isActive) {
                        const today = new Date();
                        const startDate = new Date(course.startDate);
                        const endDate = new Date(course.endDate);

                        if (moment(today).isSameOrAfter(moment(startDate), 'day') &&  moment(today).isBefore(moment(endDate), 'day')) {
                            status = 'Active';
                        }
                        else {
                            status = 'Inactive';
                        }
                    }

                return {
                    key: course.courseId,
                    courseId: course.courseId,
                    courseTitle: course.title,
                    image: course.image,
                    uploadedDate: new Date(course.createdAt).toLocaleDateString(),
                    startDate: new Date(course.startDate).toLocaleDateString(),
                    endDate: new Date(course.endDate).toLocaleDateString(),
                    status: status,
                    isActive: course.isActive
                };
            }));
        }
    }, [props.courseList]);

    return (
        <AppBody heading={"Manage Course"} title="Course List" extra={<Button type="primary" onClick={()=>{props.clearCourse_();navigate("/add-course")}}>Add New Course</Button>}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Button icon={<DownloadOutlined />} onClick={
                    () => downloadCSV(
                        ['ID', 'Course Title', 'Uploaded Date', 'Start Date', 'End Date', 'Status'], 
                        filteredData.map(item => [
                            item.courseId, 
                            item.courseTitle,
                            item.uploadedDate,
                            item.startDate,
                            item.endDate,
                            item.status
                        ])
                )}>Download CSV</Button>
                <Input placeholder="Search courses" style={{width: "200px"}} value={searchTerm} onChange={handleSearch}   />
            </div>
            <Table columns={columns} dataSource={filteredData} />
            <Modal
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
                closable={false}
                width={"50vw"}
                bodyStyle={{ padding: 0 }}  // Removes padding for modal
                style={{ maxWidth: '80vw', textAlign: 'center' }}  // Set max width for the image
            >
                <img
                src={selectedImage}
                alt="large-course"
                style={{ width: '100%', height: 'auto' }}
                />
                <span
                onClick={handleCancel}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: 'white',
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '4px 10px',
                    borderRadius: '50%',
                }}
                >
                X
                </span>
            </Modal>
        </AppBody>
    );
};

const mapStateToProps = state => ({
    courseList: state.courseList?.response, // Adjust according to your state structure
    activeCourse: state.activateCourse?.response,
    deactiveCourseAction: state.deactivateCourse?.response,
});

const mapDispatchToProps = dispatch => ({
    getCourses_: () => dispatch(getCourses()),
    activateCourse_: (id) => dispatch(activateCourseAction(id)),
    deactivateCourse_: (id) => dispatch(deactivateCourseAction(id)),
    clearCourse_: ()=>dispatch(clearCourse())
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);