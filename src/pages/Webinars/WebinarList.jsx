import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { downloadCSV } from '../../constants/helper';

const MasterList = (props) => {

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
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
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
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
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterList);
