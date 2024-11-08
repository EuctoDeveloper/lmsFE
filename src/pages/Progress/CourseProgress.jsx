import { connect } from "react-redux"
import AppBody from "../../components/Layout/AppBody"
import { Button, Card, Progress } from 'antd';
import { FaVideo } from 'react-icons/fa';
import { TbFileCertificate } from 'react-icons/tb';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseProgressDetail } from "../../store/action/users/usersAction";


const CourseProgress = (props) => {
    const [moduleData, setModuleData] = useState([]);
    const {courseId, userId} = useParams();
    const query = new URLSearchParams(window.location.search);
    const name = query.get('user');
    const navigate = useNavigate();


    const getColor = (percentage) => {
        if (percentage === 100) return 'green';
        if (percentage <= 10) return 'red';
        return 'orange';
    };
    useEffect(() => {
        props.getCourseProgressDetail_(courseId, userId);
    }, [])
    useEffect(() => {
        if(props.courseProgressDetail && props.courseProgressDetail.modules){
            setModuleData(props.courseProgressDetail.modules);
        }
    }, [props.courseProgressDetail])
    return (
        <AppBody title={props.courseProgressDetail.title} heading={`${name}'s Progress`}>
            <div className="body">
                { moduleData.map((module, index) => (
                    <div style={{marginBottom: "20px"}}>
                        <Card key={index} className="module-card" style={{backgroundColor: "#f8f8f8", marginBottom: "5px"}}>
                            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', width:"70%" }}>
                                    {/* <CopyOutlined /> */}
                          .          <h2>{module.title}</h2>
                                </div>
                                <div className="card-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Progress
                                        type="circle"
                                        percent={module.progress.completedPercentage}
                                        strokeColor={getColor(module.progress.completedPercentage)}
                                        format={percent => `${percent}%`}
                                        width={50}
                                    />
                                </div>
                            </div>
                        </Card>

                        {module.lessons && module.lessons.length > 0 && (module.lessons.filter(lesson => lesson.type === "video").map((lesson, lindex) => (
                                <Card key={index+""+lindex} className="lesson-card" style={{backgroundColor: "#F6F5FA", marginBottom: "5px"}}>
                                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <FaVideo style={{fontSize: "30px"}} />
                                            <div>
                                                <h2 style={{padding: "0", margin:"0"}}>{lesson.title}</h2>
                                            </div>
                                        </div>
                                        <div className="card-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Progress
                                                type="circle"
                                                percent={lesson.progress.completedPercentage}
                                                strokeColor={getColor(lesson.progress.completedPercentage)}
                                                format={percent => `${percent}%`}
                                                width={50}
                                            />
                                        </div>
                                    </div>
                                </Card>
                        )))}
                        {module.lessons && module.lessons.length > 0 && (module.lessons.filter(lesson => lesson.type === "assessment").map((lesson, lindex) => (
                                <Card key={index+""+lindex} className="lesson-card" style={{backgroundColor: "#F6F5FA", marginBottom: "5px"}}>
                                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <TbFileCertificate style={{fontSize: "30px"}} />
                                            <div>
                                                <h2 style={{padding: "0", margin:"0"}}>{lesson.title}</h2>
                                                <p>{lesson.questions.length} Questions | <span style={{color: "#085FBE", cursor: "pointer", textDecoration:"underline"}} onClick={()=>navigate(`/progress/assessment/${courseId}/${userId}/${module.moduleId}/${lesson.lessonId}?user=${name}`)}>Preview</span></p>
                                            </div>
                                        </div>
                                        <div className="card-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {lesson.progress?.score} / {lesson.totalGrade}
                                        </div>
                                    </div>
                                </Card>
                            )))}
                        </div>
                    ))}
                {/* Repeat Card component for more modules */}
            </div>

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <Button onClick={()=>{navigate(-1)}}>Back</Button>
            </div>
        </AppBody>
    )
}

const mapStateToProps = (state) => ({
    courseProgressDetail: state.courseProgressDetail?.response
})
const mapDispatchToProps = (dispatch) => ({
    getCourseProgressDetail_: (courseId, userId) => dispatch(getCourseProgressDetail(courseId, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseProgress)
