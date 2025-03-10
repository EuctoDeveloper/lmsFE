import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Tooltip } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { Table } from 'antd';
import { EditOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { downloadCSV } from '../../constants/helper';
import { disableWebinar, getWebinars } from '../../store/action/webinar/webinarAction';
import { render } from 'less';
import moment from 'moment';
import OpenNotification from '../../utils/OpenNotification';
import { BsXLg } from 'react-icons/bs';

const MasterList = (props) => {

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        console.log(props.user);
        if(props.webinars && props.webinars && props.webinars.length > 0) {
            setList(props.webinars);
        }
    }, [props.webinars]);
    const joinWebinar = (webinar) => {
        if(new Date(`${new Date(new Date(webinar.date).setUTCHours(...webinar.time?.split(':').map(Number), 0, 0)).toISOString()}`).getTime() - new Date().getTime() > ((10 * 60 * 1000) + (5.5 * 60 * 60 * 1000))) {
            OpenNotification('error', 'Error', 'You can join the webinar 10 minutes before the scheduled time');
        } else {
            navigate(`/join-webinar/${webinar.webinarId}`);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'webinarId',
            key: 'webinarId',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            key: 'date',
            render: (text, record) => (
                <span>{moment(record.date).format("DD-MM-YYYY")}</span>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>{record.isActive ? 
                    (
                        <Popconfirm
                        title={<p>Are you sure to Deactivate this Webinar?<br />Warning: This cannot be undone</p>}
                        onConfirm={() => props.disableWebinar_(record.webinarId) }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tooltip title="Deactivate Webinar">
                                <div style={{ backgroundColor: '#FFE5E5', borderRadius: '50%', padding: '5px 6px', border: '2px solid #FF0808', cursor:"pointer" }}>
                                    <BsXLg style={{ color: '#FF0808', fontSize: '18px', margin:"-4px 1px" }} />
                                </div>
                            </Tooltip>
                        </Popconfirm>
                    ):null}
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    { (!(new Date().getTime() - new Date(`${new Date(new Date(record.date).setUTCHours(...record.time?.split(':').map(Number), 0, 0)).toISOString()}`).getTime() > 5  * 60 * 60 * 1000)) && (record.hostId === parseInt(props.user.userId)) &&
                        <Button icon={<UserSwitchOutlined />} onClick={() => joinWebinar(record)} />
                    }
                </div>
            ),
        },
    ];

    const handleEdit = (record) => {
        navigate(`/edit-webinar/${record.webinarId}`);

    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = (list)?.filter((item) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            item.title?.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    const formatDate = (timestamp) => {
        let date = new Date(timestamp);
        let options = { weekday: "long", day: "2-digit", month: "long" };
        return date.toLocaleDateString("en-US", options);
    }
    const formatTime = (timeString) => {
        if(timeString) {
        let [hours, minutes] = timeString.split(":").map(Number);
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
        } else {
        return '';
        }
    }

    return (
        <AppBody
            heading={`Webinar's List`}
            title={`Manage Webinar`}
            extra={<Button type="primary" onClick={() => navigate("/webinar/add")}>Add Webinar</Button>}
        >
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button 
                            type="default" 
                            style={{ marginRight: '66px' }} 
                            onClick={() => downloadCSV(
                                ['ID', 'Title', 'Date', 'Time'], 
                                filteredData.map(item => [
                                    item.id, 
                                    item.title,
                                    item.date,
                                    item.time
                                ])
                            )}
                        >
                            Download CSV
                        </Button>
                    </div>
                    <Input placeholder="Search Webinars" style={{ width: '200px' }} value={searchTerm} onChange={handleSearch} />
                </div>
                <Table columns={columns} dataSource={filteredData} pagination={{ current: currentPage, onChange: (page) => setCurrentPage(page) }} />
            </div>
        </AppBody>
    );
};

const mapStateToProps = (state) => ({
    webinars: state.webinars.response,
    user: state.user.response,
});

const mapDispatchToProps = (dispatch) => ({
    getWebinars_: dispatch(getWebinars()),
    disableWebinar_: (id) => dispatch(disableWebinar(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterList);
