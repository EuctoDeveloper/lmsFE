import React, { useEffect, useState } from 'react';
// import CardActivity from '../../components/CardActivity';
// import MatchJumbledActivity from '../../components/MatchJumbledActivity';
import { Button } from 'antd';
import AppBody from '../../components/Layout/AppBody';

import QuAn from '../../components/Activity/QuAn';
import { clearSaveActivityAction, fetchLessonActivityAction, fetchLessonActivityClearAction, saveActivityAction } from '../../store/action/courses/courseAction';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const ManageActivity = (props) => {
    const [selectedActivity, setSelectedActivity] = useState('');
    const [questions, setQuestions] = useState([]);
    const [question2, setQuestions2] = useState([]);
    const [active, setActive] = useState(false);
    const [active2, setActive2] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        props.fetchLessonActivityAction_(id);
    }, []);

    useEffect(() => {
        if(props.saveActivity && props.saveActivity.message && props.saveActivity.message.includes('Success')) {
            props.clearSaveActivityAction_();
            props.fetchLessonActivityClearAction_();
            navigate(-1);
        }
    }, [props.saveActivity]);

    useEffect(() => {
        if(props.lessonActivity && props.lessonActivity.activity) {
            setSelectedActivity(props.lessonActivity.activity.type || "");
            if(props.lessonActivity.activity.length > 0) {
                setQuestions(props.lessonActivity.activity[0].questions || []);
                setQuestions2(props.lessonActivity.activity[1].questions || []);
                setActive(props.lessonActivity.activity[0].active || false);
                setActive2(props.lessonActivity.activity[1].active || false);
            } else {
                setQuestions([]);
                setQuestions2([]);
                setActive(false);
                setActive2(false);
            }
        }
    }, [props.lessonActivity]);

    const renderActivity = () => {
        if(selectedActivity) {
            return (
                <QuAn
                    activityType={selectedActivity}
                    questions={selectedActivity === "card" ? questions : question2}
                    setQuestions={selectedActivity === "card" ? setQuestions : setQuestions2}
                    readOnly={false}
                    active={selectedActivity === "card" ? active : active2}
                    setActive={selectedActivity === "card" ? setActive : setActive2}
                    save={()=>{
                        let data = {
                            lessonId: id,
                            activity: [{
                                type: "card",
                                questions: questions,
                                active: active
                            }, {
                                type: "matchJumbled",
                                questions: question2,
                                active: active2
                            }]
                        }
                        props.saveActivityAction_(data);
                    }}
                    lessonId={id}
                    key={selectedActivity}
                />
            )
        }
        else {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '300', color: 'grey' }}>
                        Please Select a Activity Type to Continue
                    </h3>
                </div>
            );
        }
    }

    return (
        <AppBody heading={"Manage Activity"}>
            <div>
                <h2>Activity Type</h2>
                <Button 
                    type={selectedActivity === 'card' ? 'primary' : 'default'} 
                    onClick={() => setSelectedActivity('card')}
                    style={{ marginRight: '10px' }}
                >
                    Card Swipe Activity
                </Button>
                <Button 
                    type={selectedActivity === 'matchJumbled' ? 'primary' : 'default'} 
                    onClick={() => setSelectedActivity('matchJumbled')}
                >
                    Match Jumbled Activity
                </Button>
            </div>
            <div>
                {renderActivity()}
            </div>
        </AppBody>
    );
};


const mapStateToProps = (state) => ({
    saveActivity: state.saveActivity?.response,
    lessonActivity: state.lessonActivity?.response
});

const mapDispatchToProps = dispatch => ({
    saveActivityAction_: (data) => dispatch(saveActivityAction(data)),
    clearSaveActivityAction_: () => dispatch(clearSaveActivityAction()),
    fetchLessonActivityAction_: (data) => dispatch(fetchLessonActivityAction(data)),
    fetchLessonActivityClearAction_: () => dispatch(fetchLessonActivityClearAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageActivity);