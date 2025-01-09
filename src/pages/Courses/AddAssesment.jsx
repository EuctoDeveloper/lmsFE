import React, { useEffect, useState } from 'react';
import { Input, Button, Select, Divider, Form, Alert } from 'antd';
import './css/AddAssessment.css';
import AppBody from '../../components/Layout/AppBody';
import { useNavigate, useParams } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { addLesson, getLesson, updateLesson } from '../../store/action/courses/courseAction';

const { Option } = Select;

const AddAssessment = (props) => {
    const [questions, setQuestions] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        options: ['', ''],
        correctAnswer: '',
        points: 1,
    });
    const [isEdit, setIsEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {id, moduleId, courseId, readOnly} = useParams();

    useEffect(() => {
        const previewDiv = document.getElementById('previewAssessment');
        if (previewDiv) {
            previewDiv.scrollTop = previewDiv.scrollHeight + 200;
        }
    }, [questions]);
    useEffect(() => {
        if(id) {
            props.getLesson_(id);
        }
    }, []);
    useEffect(() => {
        if(id && props.lesson && props.lesson.questions) {
            setQuestions(props.lesson.questions.map((q) => ({
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                points: q.points,
            })));
        }
    }, [props.lesson]);
    useEffect(() => {
        if(isUpdate && props.lessonUpdate && props.lessonUpdate.message && props.lessonUpdate.message.includes("Success")) {
            navigate(-1);
        } else if(isUpdate && props.addLesson && props.addLesson.message && props.addLesson.message.includes("Success")) {
            navigate(-1);
        }
    }, [props.lessonUpdate, props.addLesson]);

    const handleAddOption = () => {
        setCurrentQuestion({
            ...currentQuestion,
            options: [...currentQuestion.options, ''],
        });
    };

    const handleRemoveOption = (index) => {
        if (currentQuestion.options.length > 2) {
            let editingQuestion = {...currentQuestion};
            if(currentQuestion.correctAnswer.toString() == currentQuestion.options[index].toString()) {
                editingQuestion.correctAnswer = "";
                form.setFieldValue('correctAnswer', "");
            }
            const newOptions = currentQuestion.options.filter((_, i) => i !== index);
            setCurrentQuestion({
                ...editingQuestion,
                options: newOptions,
            });
        }
    };

    const handleOptionChange = (value, index) => {
        const newOptions = currentQuestion.options.map((option, i) =>
            i === index ? value : option
        );
        setCurrentQuestion({
            ...currentQuestion,
            options: newOptions,
        });
        form.setFieldValue(`option${index}`, value);
    };

    const handleSubmit = () => {
        if(isEdit) {
            questions[editIndex] = currentQuestion;
            setQuestions([...questions]);
            setIsEdit(false);
        } else {
            setQuestions([...questions, currentQuestion]);
        }
        setCurrentQuestion({
            question: '',
            options: ['', ''],
            correctAnswer: '',
            points: 1,
        });
        form.resetFields();
    };

    const createAssesment = () => {
        setIsUpdate(true);
        let data = {title: "Assessment", content: "Assessment", type: 'assessment', totalGrade: 0, questions};
        questions.forEach((q) => {
            data.totalGrade += q.points;
        });
        if(id) {
            props.updateLesson_(id, data);
        } else {
            data = {...data, courseId, moduleId};
            props.addLesson_(data);
        }
    }

    const edit = (index)=> {
        setCurrentQuestion(questions[index]);
        form.setFieldValue('question', questions[index].question);
        form.setFieldValue('correctAnswer', questions[index].correctAnswer);
        form.setFieldValue('points', questions[index].points);
        questions[index].options.forEach((option, i) => {
            form.setFieldValue(`option${i}`, option);
        });
        setIsEdit(true);
        setEditIndex(index);
    }


    return (
        <AppBody
            heading={"Manage Course"}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            { id && readOnly && (
                <div style={{ marginBottom: '20px' }}>
                    <Alert
                        message="Warning"
                        description="This Assessment cannot be edited as the Course's start date has already passed."
                        type="warning"
                        showIcon
                    />
                </div>
            )}
            <div style={{ display: 'flex', width: '100%', flex: 1 }}>
                { !(readOnly === "1" || readOnly === 1) && (
                    <>
                        <div className="left-side" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Form form={form} layout="vertical" style={{ flex: 1, overflowY: 'auto' }} onFinish={handleSubmit} requiredMark={false}>
                                <h2 style={{ fontWeight: "700" }}>Create Assessment</h2>
                                <div style={{ border:"1px solid #4285F4", borderLeft: "10px solid #4285F4", padding: '20px',}}>
                                    <Form.Item
                                        label="Enter Question"
                                        name="question"
                                        rules={[{ required: true, message: 'Question cannot be empty' }, 
                                            { whitespace: true, message: 'Question cannot be empty' }]}
                                        form={form}
                                    >
                                        <Input
                                            value={currentQuestion.question}
                                            onChange={(e) =>
                                                setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                                            }
                                            style={{ border: 'none', borderBottom: '1px solid #d9d9d9', borderRadius: 0 }}
                                            className="custom-input"
                                        />
                                    </Form.Item>
                                    {currentQuestion.options.map((option, index) => (
                                        <Form.Item
                                            key={index}
                                            label={`Option ${index + 1}`}
                                            name={`option${index}`}
                                            rules={[{ required: true, message: 'Option cannot be empty' }, 
                                                { whitespace: true, message: 'Option cannot be empty' }]}
                                        >
                                            <p style={{display: "none"}}>{option}</p>
                                            <Input
                                                value={option}
                                                onChange={(e) => handleOptionChange(e.target.value, index)}
                                                style={{ border: 'none', borderBottom: '1px solid #d9d9d9', borderRadius: 0 }}
                                                className="custom-input"
                                                suffix={
                                                    currentQuestion.options.length > 2 ? (
                                                        <Button
                                                            type="link"
                                                            onClick={() => handleRemoveOption(index)}
                                                            style={{ padding: 0, color: 'red' }}
                                                        >
                                                            X
                                                        </Button>
                                                    ) : null
                                                }
                                            />
                                        </Form.Item>
                                    ))}
                                    <Button type="dashed" onClick={handleAddOption}>
                                        Add Option
                                    </Button>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                        <Form.Item
                                            label="Correct Answer"
                                            name="correctAnswer"
                                            rules={[{ required: true, message: 'Correct answer cannot be empty' }, 
                                                { whitespace: true, message: 'Correct answer cannot be empty' }]}
                                            style={{ flex: 1, marginRight: '170px' }}
                                        >
                                            <Select
                                                value={currentQuestion.correctAnswer}
                                                onChange={(value) =>
                                                    setCurrentQuestion({ ...currentQuestion, correctAnswer: value })
                                                }
                                            >
                                                {currentQuestion.options.map((option, index) => (
                                                    <Option key={index} value={option}>
                                                        {option}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Points" name="points" style={{ flex: 1 }}>
                                            <Select
                                                name="points"
                                                value={currentQuestion.points}
                                                defaultValue={1}
                                                onChange={(value) =>
                                                    setCurrentQuestion({ ...currentQuestion, points: value })
                                                }
                                            >
                                                {[1, 2, 3, 4, 5, 10].map((point) => (
                                                    <Option key={point} value={point}>
                                                        {point}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="button-group" style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '10px 0', textAlign: "right" }}>
                                    <Button type="default" style={{marginRight: "10px"}} onClick={()=>navigate(-1)}>Back</Button>
                                    <Button type="primary" htmlType="submit">
                                        {isEdit ? "Modify": "Add"} Question
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        <Divider type="vertical" className="divider" style={{ height: 'auto' }} />
                    </>
                )}
                <div id="previewAssessment" className="right-side" style={{ flex: 1, paddingLeft: '20px', marginBottom: '30px', maxHeight:"500px", overflowY: "scroll"}}>
                    <h2 style={{ fontWeight: "700" }}>Preview Assessment</h2>
                    {questions.map((q, index) => (
                        <div key={index} className="preview-box" style={{border:"1px solid #4285F4", borderLeft: "10px solid #4285F4", padding: '20px', marginBottom: "10px"}}>
                            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                <h3>
                                    <strong>Question: {q.question}</strong>
                                </h3>
                                { !(readOnly === "1" || readOnly === 1) && (
                                    <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '5px', border: '2px solid #FCAC20', cursor:"pointer" }} onClick={()=>{edit(index)}}>
                                        <EditOutlined style={{ color: '#FCAC20', fontSize: '18px', padding:"2px" }} />
                                    </div>
                                )}
                            </div>
                            {q.options.map((option, i) => (
                                <p key={i}><strong>{i+1}.</strong> {option}</p>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                <div>
                                    <h2 style={{color: "green"}}>Correct Answer</h2><h3>{q.correctAnswer}</h3>
                                </div>
                                <div>
                                    <h2>Points</h2><h3>{q.points}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {questions.length > 0 && !(readOnly === "1" || readOnly === 1) && 

                    <Button className="create-assessment-button" style={{ alignSelf: 'flex-end' }} onClick={createAssesment}>
                        Create Assessment
                    </Button>
                }
                {(readOnly === "1" || readOnly === 1) && 

                    <Button className="create-assessment-button" style={{ alignSelf: 'flex-end' }} onClick={()=>navigate(`/add-module/${id}/1`)}>
                        Back to Modules
                    </Button>
                }
            </div>
        </AppBody>
    );
};


const mapStateToProps = (state) => ({
    lesson: state.lessonDetail?.response,
    lessonUpdate: state.lessonUpdate?.response,
    addLesson: state.addLesson?.response,
});

const mapDispatchToProps = dispatch => ({
    getLesson_: (id) => dispatch(getLesson(id)),
    updateLesson_: (id, data) => dispatch(updateLesson(id, data)),
    addLesson_: (data) => dispatch(addLesson(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAssessment);