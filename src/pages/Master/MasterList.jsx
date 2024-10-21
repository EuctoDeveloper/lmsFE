import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import AppBody from '../../components/Layout/AppBody';
import { Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { downloadCSV } from '../../constants/helper';
import { getBranchesAction, getCentersAction, getDepartmentsAction, getDesignationsAction, getGroupsAction, getLocationsAction } from '../../store/action/masters/masterAction';

const MasterList = (props) => {

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const {master} = useParams();
    
    useEffect(() => {
        props["get" + master.charAt(0).toUpperCase() + master.slice(1) + "s_"]();
    }, [master]);

    

    useEffect(() => {
        if (props[master+"s"] && Array.isArray(props[master+"s"])) {
            setList(props[master + "s"].map((item) => {
                return {
                    key: item[master + "Id"],
                    id: item[master + "Id"],
                    name: item.name,
                };
            }));
        }
    }, [props[master + "s"]]);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true
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
        navigate(`/master/${master}/${record.id}`);

    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = (list)?.filter((item) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            item.name?.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    return (
        <AppBody
            heading={`${master.charAt(0).toUpperCase() + master.slice(1)} List`}
            title={`Manage ${master.charAt(0).toUpperCase() + master.slice(1)}`}
            extra={<Button type="primary" onClick={() => navigate("/master/" + master +"/add")}>Add {master.charAt(0).toUpperCase() + master.slice(1)}</Button>}
        >
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button 
                            type="default" 
                            style={{ marginRight: '66px' }} 
                            onClick={() => downloadCSV(
                                ['ID', 'Name'], 
                                filteredData.map(item => [
                                    item.id, 
                                    item.name
                                ])
                            )}
                        >
                            Download CSV
                        </Button>
                    </div>
                    <Input placeholder={`Search ${master.charAt(0).toUpperCase() + master.slice(1)}`} style={{ width: '200px' }} value={searchTerm} onChange={handleSearch} />
                </div>
                <Table columns={columns} dataSource={filteredData} pagination={{ current: currentPage, onChange: (page) => setCurrentPage(page) }} />
            </div>
        </AppBody>
    );
};

const mapStateToProps = (state) => ({
    locations: state.locations?.response,
    departments: state.departments?.response,
    designations: state.designations?.response,
    branchs: state.branches?.response,
    centres: state.centres?.response,
    groups: state.groups?.response,
});

const mapDispatchToProps = (dispatch) => ({
    getLocations_: () => dispatch(getLocationsAction()),
    getDepartments_: () => dispatch(getDepartmentsAction()),
    getDesignations_: () => dispatch(getDesignationsAction()),
    getBranchs_: () => dispatch(getBranchesAction()),
    getCentres_: () => dispatch(getCentersAction()),
    getGroups_: () => dispatch(getGroupsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterList);
