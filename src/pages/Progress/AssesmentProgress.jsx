import { connect } from "react-redux";
import { Button, Card, Row } from "antd";
import PageHeading from "../../components/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import AppBody from "../../components/Layout/AppBody";
import { getCourseProgressDetail } from "../../store/action/users/usersAction";
import { useEffect, useState } from "react";
import { Typography } from 'antd';
import { DownloadOutlined} from '@ant-design/icons';

const { Text } = Typography;

function AssessmentProgress(props) {
    const {courseId, userId, moduleId, lessonId} = useParams();
    const query = new URLSearchParams(window.location.search);
    const name = query.get('user');
    const [questions, setQuestions] = useState([]);
    const [progress, setProgress] = useState([]);
    const [answer, setAnswe] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        props.getCourseProgressDetail_(courseId, userId);
    }, [])
    useEffect(() => {
        if(props.courseProgressDetail && props.courseProgressDetail.modules){
            if(props.courseProgressDetail && props.courseProgressDetail.modules && Array.isArray(props.courseProgressDetail.modules)){
                let module = props.courseProgressDetail.modules.filter(module => module.moduleId === parseInt(moduleId))[0];
                if(module && module.lessons && Array.isArray(module.lessons)) {
                    let lesson = module.lessons.filter(lesson => lesson.lessonId === parseInt(lessonId))[0];
                    if(lesson && lesson.questions && Array.isArray(lesson.questions)) {
                        setQuestions(lesson.questions)
                        setProgress(lesson.progress)
                    }
                }
            }
        }
    }, [props.courseProgressDetail])

    const generateQuestions = (item, index) => {
        let isCorrect = false; 
        let score = 0;
        let answeredOption = "";

        if(progress && progress.questions && Array.isArray(progress.questions)) {

            for(let i=0; i<progress.questions.length; i++) {
                if(progress.questions[i].sourceQuestionId === item._id) {
                    answeredOption = progress.questions[i].answer
                    isCorrect = progress.questions[i].answer === item.correctAnswer;
                    if(isCorrect)
                        score = item.points
                    break;
                }
            }
        }
        return (
            <>
                <div style={{ flex: '0 0 70%' }}>
                    <h3 style={{ fontWeight: 600 }}>Q.No {index + 1}: {item.question}</h3>
                    <div>
                        {item.options.map((option, optionIndex) => (
                            <>
                            <Row>
                                <div style={{width: "15px", height:"15px", borderRadius: 40, border: `${answeredOption === option || item.correctAnswer === option ? 4:2}px solid ${item.correctAnswer === option ? "green" : (answeredOption === option ? "red":"gray")}`, marginTop: "2px", marginRight: "10px"}}></div>
                                <p key={optionIndex} style={{fontSize: '12px'}}>
                                {option}</p>
                            </Row>
                            </>
                        ))}
                    </div>
                </div>
                <div style={{ flex: '0 0 30%' }}>
                    <div>
                        {isCorrect ?
                            <p style={{padding: "2px 5px", color: "#1A6500", backgroundColor:"#EAFFE3", width: "fit-content"}}>Correct Answer</p> : 
                            <p style={{padding: "2px 5px", color: "#FF0808", backgroundColor:"#FFE1E1", width: "fit-content"}}>Wrong Answer</p>
                        }
                    </div>
                    <div style={{position: "absolute", bottom: "10px"}}>
                        <p style={{padding: "2px 5px", width: "fit-content", fontWeight: 600}}>POINTS: {score} </p>
                    </div>
                </div>
            </>
        )
    }

return (
    <>
        <AppBody heading={`${name}`}>
            {questions.map((item, index) => (
                <Card style={{ backgroundColor: "#F6F6F6" }} key={index}>
                    <Row gutter={16}>
                        {generateQuestions(item, index)}
                    </Row>
                </Card>
            ))}
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <Button onClick={()=>{navigate(-1)}}>Back</Button>
            </div>

        </AppBody>
    </>
);
}

const mapStateToProps = (state) => ({
    courseProgressDetail: state.courseProgressDetail?.response
})
const mapDispatchToProps = (dispatch) => ({
    getCourseProgressDetail_: (courseId, userId) => dispatch(getCourseProgressDetail(courseId, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentProgress)
