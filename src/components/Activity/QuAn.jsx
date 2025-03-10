import React, { useEffect, useState } from 'react';
import { Input, Button, Select, Divider, Form, Alert, Radio, Row, Switch } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { addLesson, getLesson, updateLesson } from '../../store/action/courses/courseAction';

const { Option } = Select;

const QuAn = (props) => {
    const [questions, setQuestions] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        answer: '',
    });
    const [isEdit, setIsEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const previewDiv = document.getElementById('previewAssessment');
        if (previewDiv) {
            previewDiv.scrollTop = previewDiv.scrollHeight + 200;
        }
        props.setQuestions(questions);
    }, [questions]);
    useEffect(() => {
        setQuestions([...props.questions]);
    }, []);
    useEffect(() => {
        if(props.reset) {
            form.resetFields();
            setCurrentQuestion({question: '', answer: ''});
            setQuestions([]);
        }
    }, [props.activityType]);

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
            answer: '',
        });
        form.resetFields();
    };

    const createAssesment = () => {
        setIsUpdate(true);
        let data = {lessonId: props.lessonId, activity: {type: props.activityType, questions}};
        console.log(props.save, data)
        props.save(data);
    }

    const edit = (index)=> {
        setCurrentQuestion(questions[index]);
        form.setFieldValue('question', questions[index].question);
        form.setFieldValue('answer', questions[index].answer);
        setIsEdit(true);
        setEditIndex(index);
    }


    return (
            <div style={{ display: 'flex', width: '100%', flex: 1 }}>
                { !(props.readOnly === "1" || props.readOnly === 1) && (
                    <>
                        <div className="left-side" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Form form={form} layout="vertical" style={{ flex: 1, overflowY: 'auto' }} onFinish={handleSubmit} requiredMark={false}>
                                <div style={{ border:"1px solid #4285F4", borderLeft: "10px solid #4285F4", padding: '20px', marginTop: "20px"}}>
                                    <Form.Item
                                        label="Question"
                                        name="question"
                                        rules={[{ required: true, message: 'Question cannot be empty' }]}
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                        <Form.Item
                                            label="Answer"
                                            name="answer"
                                            rules={[{ required: true, message: 'Answer cannot be empty' }]}
                                            style={{ flex: 1, marginRight: '170px' }}
                                        >
                                            {props.activityType === 'card' ? (
                                                <Radio.Group
                                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
                                                    value={currentQuestion.answer}
                                                >
                                                    <Radio value="true">True</Radio>
                                                    <Radio value="false">False</Radio>
                                                </Radio.Group>
                                            ) : (
                                                <Input
                                                    value={currentQuestion.answer}
                                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
                                                    style={{ border: 'none', borderBottom: '1px solid #d9d9d9', borderRadius: 0 }}
                                                    className="custom-input"
                                                />
                                            )}
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
                <div id="previewAssessment" className="right-side" style={{flex: 1, paddingLeft: '20px'}}>
                    <Row gutter={16} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ fontWeight: "700" }}>Preview Activity</h2>
                        <Form.Item label="Status" name="status" valuePropName="checked">
                            <Switch onChange={(checked) => props.setActive(checked)} value={props.active} />
                        </Form.Item>
                    </Row>
                    <div style={{ marginBottom: '30px', maxHeight:"400px", overflowY: "scroll"}}>
                        {questions.map((q, index) => (
                            <div key={index} className="preview-box" style={{border:"1px solid #4285F4", borderLeft: "10px solid #4285F4", padding: '20px', marginBottom: "10px"}}>
                                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <h3>
                                        <strong>Question: {q.question}</strong>
                                    </h3>
                                    { !(props.readOnly === "1" || props.readOnly === 1) && (
                                        <div style={{ backgroundColor: '#FFF6E8', borderRadius: '50%', padding: '5px', border: '2px solid #FCAC20', cursor:"pointer" }} onClick={()=>{edit(index)}}>
                                            <EditOutlined style={{ color: '#FCAC20', fontSize: '18px', padding:"2px" }} />
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'flex', marginTop: '20px' }}>

                                        <h2 style={{color: "green"}}>Answer:</h2>&nbsp;&nbsp;<h2>{q.answer}</h2>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {questions.length > 0 && !(props.readOnly === "1" || props.readOnly === 1) && 

                    <Button className="create-assessment-button" style={{ alignSelf: 'flex-end' }} onClick={createAssesment}>
                        Save Activity
                    </Button>
                }
                {(props.readOnly === "1" || props.readOnly === 1) && 
                    <Button className="create-assessment-button" style={{ alignSelf: 'flex-end' }} onClick={()=>navigate(`/add-module/1`)}>
                        Back to Modules
                    </Button>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuAn);