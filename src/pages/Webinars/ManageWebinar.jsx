import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Select } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { RiArrowGoBackLine } from 'react-icons/ri';
import moment from 'moment/moment';
import { getCustomers, getStaffs } from '../../store/action/users/usersAction';
import { clearCreateWebinar, clearUpdateWebinar, createWebinar, getBookedDates, getWebinarDetails, updateWebinar } from '../../store/action/webinar/webinarAction';
import dayjs from 'dayjs';
import SlotPicker from '../../components/Inputs/SlotPicker';
import OpenNotification from '../../utils/OpenNotification';


const ManageWebinar = (props) => {
    const {id} = useParams();
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [navigateHelper, setNavigateHelper] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeRange, setSelectedTimeRange] = useState(null);
    const [bookedSlots, setBookedSlots] = useState([]);
    

    useEffect(() => {
        form.resetFields();
        console.log(id)
        if (id) {
            props.getWebinarDetails_(id);
        }
        props.getCustomers_();
        props.getStaffs_();
    }, []);

    useEffect(()=>{
        if(Array.isArray(props.customerList) && Array.isArray(props.staffList)){
            setUsers([...props.customerList, ...props.staffList]);
        }
    }, [props.customerList, props.staffList])

    useEffect(() => {
        if (id && props.webinar) {
            console.log(props.webinar,"gdsgdf");
            form.setFieldsValue({
                title: props.webinar.title,
                description: props.webinar.description,
                date: dayjs(moment(moment(props.webinar.date).format("DD-MM-YYYY") + " " + props.webinar.time, "DD-MM-YYYY HH:mm").utc()),
                invitees: props.webinar.invitees
            });
        }
    }, [props.webinar]);

    useEffect(() => {
        if(!id && props.addWebinar && props.addWebinar.message && props.addWebinar.message.includes("success")){
            props.clearCreateWebinar_();
            navigate('/meetings');
        } else if(id && props.updateWebinar && props.updateWebinar.message && props.updateWebinar.message.includes("success")){
            props.clearUpdateWebinar_();
            navigate('/meetings');
        }
    }, [props.addWebinar, props.updateWebinar]);

    useEffect(() => {
        if(props.bookedDates && props.bookedDates.data && props.bookedDates.data.length > 0){
            setBookedSlots([...props.bookedDates.data]);
        } else {
            setBookedSlots([]);
        }
    }, [props.bookedDates]);

    const disabledTime = (current) => {
        if (!current) return {};
        const now = moment();
        if (current.isSame(now, "day")) {
          return {
            disabledHours: () => [...Array(now.hour()).keys()], // Disable past hours
            disabledMinutes: (selectedHour) => {
              return selectedHour === now.hour()
                ? [...Array(now.minute()).keys()] // Disable past minutes if the same hour
                : [];
            },
          };
        }
        return {};
    };

    const handleSubmit = (values) => {
        setNavigateHelper(true);
        const data = {
            title: values.title,
            description: values.description,  
            ...(!id ? {
                date: values.date.format("YYYY-MM-DD"),
                time: selectedTimeRange.split(" to ")[0],
                endTime: selectedTimeRange.split(" to ")[1],
            }: {}),
            invitees: values.invitees
        }
        if(!id) {
            props.createWebinar_(data);
        }
        else{
            props.updateWebinar_(data, id)
        }
    };

    const handleReset = () => {
        form.resetFields();
    };

    const handleBackClick = () => {
        navigate('/meetings');
    };

    const dateChange = (date) => {
        props.getBookedDates_(date.format("YYYY-MM-DD"));
        setSelectedDate(date);
    }

    return (
        <AppBody heading={`Manage Webinars`} title={`${id ? "Edit " : "Add "} Webinar`} extra={
            <Button
                onClick={handleBackClick}
                style={{ backgroundColor: "#FF6767", borderRadius: "30px", padding: "8px" }}
            >
                <RiArrowGoBackLine style={{ color: "white", fontWeight: "700" }} />
            </Button>
        }>
            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please Enter Webinar Title' }]}>
                            <Input placeholder="Enter Webinar Title"  />
                        </Form.Item>
                    </Col>
                    { !id &&
                        <>
                            <Col span={12}>
                                <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date & time' }]}>
                                    <DatePicker format="DD-MM-YYYY" disabledDate={(current) => current < moment().startOf('day')} disabledTime={disabledTime} onChange={dateChange}  />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Select Slot" rules={[{ required: true, message: 'Please select a date & time' }]}>
                                    {selectedDate ? <SlotPicker bookedSlots={bookedSlots} selectedDate={selectedDate} onChange={setSelectedTimeRange} onNonContinuousError={()=>OpenNotification("error", "Slot Unavailable", "Only Continuous Slots can be selected")} /> : <span style={{color: "red"}}>Choose any date</span>}
                                </Form.Item>
                            </Col>
                        </>
                    }
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter webinar description' }]}>
                            <Input.TextArea rows={4} placeholder="Enter Description" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="invitees" label="Invite Users">
                            <Select
                                mode="multiple"
                                placeholder="Search and select users"
                                showSearch
                                filterOption={(input, option) =>{
                                    let string = option.children.join('');
                                    return(string.toLowerCase().includes(input.toLowerCase()))
                                }
                                }
                            >
                                {users.map(user => (
                                    <Select.Option key={user.userId} value={user.userId}>
                                        {user.email ? user.email : ""} {user.email && user.phone ? " - " : ""} {user.phone ? `${user.phone}`:""}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
                    <Col>
                        <Button onClick={handleReset} style={{ marginRight: 8 }}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </AppBody>
    );
};

const mapStateToProps = (state) => ({
    webinar: state.webinar?.response,
    customerList: state.customerList?.response,
    staffList: state.staffList?.response,
    addWebinar: state.addWebinar?.response,
    updateWebinar: state.updateWebinar?.response,
    bookedDates: state.bookedDates?.response
});

const mapDispatchToProps = (dispatch) => ({
    getCustomers_: () => dispatch(getCustomers()),
    getStaffs_: () => dispatch(getStaffs()),
    createWebinar_: (data) => dispatch(createWebinar(data)),
    getWebinarDetails_: (id) => dispatch(getWebinarDetails(id)),
    updateWebinar_: (data, id) => dispatch(updateWebinar(data, id)),
    getBookedDates_: (date) => dispatch(getBookedDates(date)),
    clearCreateWebinar_: () => dispatch(clearCreateWebinar()),
    clearUpdateWebinar_: () => dispatch(clearUpdateWebinar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageWebinar);
