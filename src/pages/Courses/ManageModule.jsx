import React, { useEffect, useState } from 'react';
import { Input, Button, Card, Popconfirm, Badge, Tooltip, Modal, Alert } from 'antd';
import { EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { RiArrowGoBackLine } from 'react-icons/ri';
import OpenNotification from '../../utils/OpenNotification';
import { useNavigate, useParams } from 'react-router-dom';
import AppBody from '../../components/Layout/AppBody';
import { connect } from 'react-redux';
import { activateLessonAction, activateModuleAction, addModule, deactivateLessonAction, deactivateModuleAction, getModules, resetModule, updateModule } from '../../store/action/courses/courseAction';
import { FaVideo } from 'react-icons/fa';
import { BsXLg } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';
import { TbFileCertificate } from 'react-icons/tb';

const ManageModule = (props) => {
    const [moduleData, setModuleData] = useState([]);
    const [moduleName, setModuleName] = useState('');
    const [editModuleName, setEditModuleName] = useState('');
    const {id, readOnly} = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [editModuleId, setEditModuleId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
  
    const showModal = (imageUrl) => {
      setSelectedImage(imageUrl);
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  

    useEffect(() => {
        props.resetModule_();
        if(id) {
            props.getModules_(id);
        }
    }, []);
    useEffect(() => {
        if(props.modules && props.modules.length > 0)
            setModuleData(props.modules);
        else
            setModuleData([]);
    }, [props.modules]);
    useEffect(() => {
        if(props.updateModule && props.updateModule.message && props.updateModule.message.includes("Success")) {
            setEditMode(false);
            setEditModuleId(null);
            setEditModuleName('');
            props.getModules_(id);
        }
    }, [props.updateModule]);
    useEffect(() => {
        if(props.addModule && props.addModule.message && props.addModule.message.includes("Success")) {
            setModuleName('');
            props.getModules_(id);
        }
    }, [props.addModule]);
    useEffect(() => {
        if(
            (props.activateModule && props.activateModule.message && props.activateModule.message.includes("Success"))
            || (props.deactivateModule && props.deactivateModule.message && props.deactivateModule.message.includes("Success"))
            || (props.activateLesson && props.activateLesson.message && props.activateLesson.message.includes("Success"))
            || (props.deactivateLesson && props.deactivateLesson.message && props.deactivateLesson.message.includes("Success"))
        ) {
            props.getModules_(id);
        }
    }, [props.activateModule, props.deactivateModule, props.activateLesson, props.deactivateLesson]);

    const handleBackClick = () => {
        // Handle back button click
        navigate(-1);
    };
    const addModule = () => {
        if(!moduleName || moduleName === '') {
            OpenNotification('error', 'Module name is required');
            return;
        }
        let data = {title: moduleName, courseId: id};
        props.addModule_(data);
    };
    const updateModule = () => {
        let data = {title: editModuleName};
        let idToUpdate = editModuleId;
        props.updateModule_(idToUpdate, data);
    };
    const cancelUpdateModule = () => {
        setEditMode(false);
        setEditModuleId(null);
        setEditModuleName('');
    };
    const deactivateLesson = (lessonId) => {
        props.deactivateLesson_(lessonId);
    }
    const deactivateModule = (moduleId) => {
        props.deactivateModule_(moduleId);
    }
    const activateLesson = (lessonId) => {
        props.activateLesson_(lessonId);
    }
    const activateModule = (moduleId) => {
        props.activateModule_(moduleId);
    }
    return (
        <AppBody heading={"Manage Course"} title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width:"70%" }}>
                <h3 style={{fontWeight:"700"}}>Setup Module</h3>
                <Input 
                    placeholder="Enter module" 
                    value={moduleName} 
                    onChange={(e) => setModuleName(e.target.value)} 
                />
                <Button type='primary' onClick={addModule}>Add Module +</Button>
            </div>
        } extra={
            <Button onClick={handleBackClick} style={{ backgroundColor:"#FF6767", borderRadius:"30px", padding:"8px" }}>
                <RiArrowGoBackLine style={{ color: "white", fontWeight: "700" }} />
            </Button>
        }
        style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
            { id && readOnly && (
                <div style={{ marginBottom: '20px' }}>
                    <Alert
                        message="Warning"
                        description="This course cannot be edited as already mapped and the start date has already passed."
                        type="warning"
                        showIcon
                    />
                </div>
            )}
            <div className="body">
                { moduleData.map((module, index) => (
                    <div style={{marginBottom: "20px"}}>
                        <Card key={index} className="module-card" style={{backgroundColor: "#f8f8f8", marginBottom: "5px"}}>
                            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', width:"70%" }}>
                                    {/* <CopyOutlined /> */}
                                    { editMode && editModuleId === module.moduleId ? (
                                        <Input placeholder="Enter module" value={editModuleName} onChange={(e) => setEditModuleName(e.target.value)} />
                                        ): (
                                            <h2>
                                                {module.title}
                                                { !module.isActive && (
                                                    <span style={{marginLeft: "10px"}}>
                                                        <Badge count={!module.isActive ? 'Inactive': ""} style={{ backgroundColor: '#f5222d' }} />
                                                    </span>)
                                                }

                                            </h2>
                                        )
                                    }
                                </div>
                                <div className="card-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    { editMode && editModuleId === module.moduleId ? (
                                        <>
                                            <Tooltip title="Cancel">
                                                <div style={{ backgroundColor: '#FFE5E5', borderRadius: '50%', padding: '5px 6px', border: '2px solid #FF0808', cursor:"pointer" }} onClick={cancelUpdateModule}>
                                                    <BsXLg style={{ color: '#FF0808', fontSize: '18px', margin:"-4px 1px" }} />
                                                </div>
                                            </Tooltip>
                                            <Tooltip title="Save">
                                                <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '3px 5px', border: '2px solid #FCAC20', cursor:"pointer" }} onClick={updateModule}>
                                                    <MdDone style={{ color: '#FCAC20', fontSize: '25px', padding:"2px" }} />
                                                </div>
                                            </Tooltip>
                                        </>
                                    ): (
                                        <>
                                        { module.isActive ? (
                                            <>
                                                {!(readOnly === 1 || readOnly === "1") && (
                                                    <>
                                                        <Tooltip title="Add Assessment">
                                                            <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '5px', border: '2px solid #FCAC20', cursor:"pointer" }} onClick={()=>navigate(`/add-assessment/${module.moduleId}/${id}`)}>
                                                                <img src="/images/icons/assesment.png" alt="Assessment Icon" style={{width: '25px', padding:"2px" }} />
                                                            </div>
                                                        </Tooltip>
                                                        <Tooltip title="Edit Module">
                                                            <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '5px', border: '2px solid #FCAC20', cursor:"pointer" }} onClick={()=>{setEditModuleId(module.moduleId);setEditMode(true);setEditModuleName(module.title);}}>
                                                                <EditOutlined style={{ color: '#FCAC20', fontSize: '18px', padding:"2px" }} />
                                                            </div>
                                                        </Tooltip>
                                                        <Tooltip title="Add Lesson">
                                                            <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '5px', border: '2px solid #FCAC20', cursor:"pointer" }} onClick={()=>navigate(`/add-lesson/${module.moduleId}/${id}`)}>
                                                                <PlusOutlined style={{ color: '#FCAC20', fontSize: '18px', padding:"2px" }} />
                                                            </div>
                                                        </Tooltip>
                                                    </>
                                                )}
                                                <Popconfirm
                                                    title="Are you sure to Deactivate this module?"
                                                    onConfirm={() => deactivateModule(module.moduleId) }
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Tooltip title="Deactivate Module">
                                                        <div style={{ backgroundColor: '#FFE5E5', borderRadius: '50%', padding: '5px 6px', border: '2px solid #FF0808', cursor:"pointer" }}>
                                                            <BsXLg style={{ color: '#FF0808', fontSize: '18px', margin:"-4px 1px" }} />
                                                        </div>
                                                    </Tooltip>
                                                </Popconfirm>
                                            </>
                                        ):(
                                            <Popconfirm
                                                title="Are you sure to Activate this module?"
                                                onConfirm={() => activateModule(module.moduleId) }
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Tooltip title="Activate Module">
                                                    <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '5px 6px', border: '2px solid #FCAC20', cursor:"pointer" }}>
                                                        <MdDone style={{ color: '#FCAC20', fontSize: '18px', margin:"-4px 1px" }}  />
                                                    </div>
                                                </Tooltip>
                                            </Popconfirm>
                                        )}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* <span>Size: 500MB</span>
                                <span>Duration: 20 mins</span> */}
                            </div>
                        </Card>

                        {module.lessons && module.lessons.length > 0 && (module.lessons.filter(lesson => lesson.type === "video").map((lesson, lindex) => (
                                <Card key={index+""+lindex} className="lesson-card" style={{backgroundColor: "#F6F5FA", marginBottom: "5px"}}>
                                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <FaVideo style={{fontSize: "30px"}} />
                                            <div>
                                                <h2 style={{padding: "0", margin:"0"}}>{lesson.title}
                                                    { !lesson.isActive || !module.isActive ? (
                                                        <span style={{marginLeft: "10px"}}>
                                                            <Badge count={!lesson.isActive ? 'Inactive': !module.isActive ? "Module Inactive" : ""} style={{ backgroundColor: '#f5222d' }} />
                                                        </span>):null
                                                    }
                                                </h2>
                                                <div>
                                                    <p style={{textDecoration: "underline", color: "rgb(252, 172, 32)", cursor: "pointer"}} onClick={()=>showModal(lesson.source)}>Preview</p>
                                                </div>
                                            </div>
                                        </div>
                                        {module.isActive && (
                                            <div className="card-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                { lesson.isActive ? (
                                                    <>
                                                        {!(readOnly === 1 || readOnly === "1") && (
                                                            <Tooltip title="Edit Lesson">
                                                                <EditOutlined style={{ color: 'black', fontSize: '18px', padding:"2px" }} onClick={()=>navigate(`/edit-lesson/${lesson.lessonId}`)} />
                                                            </Tooltip>
                                                        )}
                                                        <Popconfirm
                                                            title="Are you sure to Deactivate this lesson?"
                                                            onConfirm={() => deactivateLesson(lesson.lessonId) }
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Tooltip title="Deactivate Lesson">
                                                                <BsXLg style={{ color: 'black', fontSize: '18px', padding:"2px", cursor: 'pointer' }} />
                                                            </Tooltip>
                                                        </Popconfirm>
                                                    </>
                                                    ):(
                                                        <Popconfirm
                                                            title="Are you sure to Activate this lesson?"
                                                            onConfirm={() => activateLesson(lesson.lessonId) }
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Tooltip title="Activate Lesson">
                                                                <MdDone style={{ color: 'black', fontSize: '18px', padding:"2px", cursor: 'pointer' }} />
                                                            </Tooltip>
                                                        </Popconfirm>
                                                    )
                                                }
                                            </div>)
                                        }
                                    </div>
                                </Card>
                        )))}
                        {module.lessons && module.lessons.length > 0 && (module.lessons.filter(lesson => lesson.type === "assessment").map((lesson, lindex) => (
                                <Card key={index+""+lindex} className="lesson-card" style={{backgroundColor: "#F6F5FA", marginBottom: "5px"}}>
                                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <TbFileCertificate style={{fontSize: "30px"}} />
                                            <div>
                                                <h2 style={{padding: "0", margin:"0"}}>{lesson.title}
                                                    { !lesson.isActive || !module.isActive ? (
                                                        <span style={{marginLeft: "10px"}}>
                                                            <Badge count={!lesson.isActive ? 'Inactive': !module.isActive ? "Module Inactive" : ""} style={{ backgroundColor: '#f5222d' }} />
                                                        </span>):null
                                                    }
                                                </h2>
                                                <span>{lesson.questions.length} Questions&nbsp; &nbsp; &nbsp;</span>
                                                <span>Points: {lesson.totalGrade}</span>
                                            </div>
                                        </div>
                                        {module.isActive && (
                                            <div className="card-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                { lesson.isActive ? (
                                                    <>
                                                        {!(readOnly === 1 || readOnly === "1") && (
                                                            <Tooltip title="Edit Assessment">
                                                                <EditOutlined style={{ color: 'black', fontSize: '18px', padding:"2px" }} onClick={()=>navigate(`/edit-assessment/${lesson.lessonId}`)} />
                                                            </Tooltip>
                                                        )}
                                                        {(readOnly === 1 || readOnly === "1") && (
                                                            <Tooltip title="View Assessment">
                                                            <EyeOutlined style={{ color: 'black', fontSize: '18px', padding:"2px" }} onClick={()=>navigate(`/edit-assessment/${lesson.lessonId}/1`)} />
                                                            </Tooltip>
                                                        )}

                                                        <Popconfirm
                                                            title="Are you sure to Deactivate this Assessment?"
                                                            onConfirm={() => deactivateLesson(lesson.lessonId) }
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Tooltip title="Deactivate Assessment">
                                                                <BsXLg style={{ color: 'black', fontSize: '18px', padding:"2px", cursor: 'pointer' }} />
                                                            </Tooltip>
                                                        </Popconfirm>
                                                    </>
                                                    ):(
                                                        <Popconfirm
                                                            title="Are you sure to Activate this Assessment?"
                                                            onConfirm={() => activateLesson(lesson.lessonId) }
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Tooltip title="Activate Assessment">
                                                                <MdDone style={{ color: 'black', fontSize: '18px', padding:"2px", cursor: 'pointer' }} />
                                                            </Tooltip>
                                                        </Popconfirm>
                                                    )
                                                }
                                            </div>)
                                        }
                                    </div>
                                </Card>
                            )))}
                        </div>
                    ))}
                {/* Repeat Card component for more modules */}
            </div>
            { moduleData.length > 0 && (
                <div style={{ padding: '20px', textAlign: 'right' }}>
                    <Button type='primary' style={{ width: '200px' }} onClick={()=>{
                        props.resetModule_();
                        navigate("/courses");
                    }}>Process</Button>
                </div>
            )}

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
                <video width="640" height="360" controls
                    style={{ width: '100%', height: 'auto' }}
                >
                      <source key={selectedImage} src={selectedImage} type="video/mp4" />
                </video>
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


const mapStateToProps = (state) => ({
    // Map your state to props here
    modules: state.modulesList?.response,
    updateModule: state.updateModule?.response,
    addModule: state.addModule?.response,
    activateModule: state.activateModule?.response,
    deactivateModule: state.deactivateModule?.response,
    activateLesson: state.activateLesson?.response,
    deactivateLesson: state.deactivateLesson?.response,
});

const mapDispatchToProps = (dispatch) => ({
    getModules_: (id) => dispatch(getModules(id)),
    updateModule_: (id, data) => dispatch(updateModule(id, data)),
    addModule_: (data) => dispatch(addModule(data)),
    activateModule_: (data) => dispatch(activateModuleAction(data)),
    deactivateModule_: (data) => dispatch(deactivateModuleAction(data)),
    activateLesson_: (data) => dispatch(activateLessonAction(data)),
    deactivateLesson_: (data) => dispatch(deactivateLessonAction(data)),
    resetModule_: () => dispatch(resetModule()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageModule);