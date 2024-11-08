import { connect } from "react-redux"
import AppBody from "../../components/Layout/AppBody"
import { Button, Table, Progress } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { getUserProgressListByCourseId } from "../../store/action/users/usersAction"
import { useEffect, useState } from "react"


const TrackUserList = (props) => {

    const navigate = useNavigate();
    const {id} = useParams();
    const query = new URLSearchParams(window.location.search);
    const name = query.get('course');
    const [userList, setUserList] = useState([])

    useEffect(()=>{
        props.getUserProgressListByCourseId_(id)
    }, [])

    useEffect(()=>{
        if(props.userProgressList && Array.isArray(props.userProgressList)) {
            setUserList(props.userProgressList.map(user => {
                return {
                    key: user.userId,
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    progress: user.enrollment.completedPercentage,
                    enrollId: user.enrollment.id,
                };
            }))
        }
    }, [props.userProgressList])

    const columns = [{
        title: 'Id',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Progress',
        dataIndex: 'completedPercentage',
        key: 'completedPercentage',
        render: (text, record) => {

            const getColor = (percentage) => {
                if (percentage === 100) return 'green';
                if (percentage <= 10) return 'red';
                return 'orange';
            };

            return <Progress
                type="circle"
                percent={record.progress}
                strokeColor={getColor(record.progress)}
                format={percent => `${percent}%`}
                width={50}
            />
        }

    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Button type="default" onClick={()=>navigate(`/progress/course/${record.userId}/${id}?user=${record.firstName} ${record.lastName}`)}>View Progress</Button>
        ),
    },
    ]

    return (
        <AppBody heading="Progress" title={`${decodeURIComponent(name)}`} extra={<Button onClick={()=>{navigate(-1)}}>Back</Button>}>
            <Table columns={columns} dataSource={userList} />
        </AppBody>
    )
}

const mapStateToProps = (state) => ({
    userProgressList: state.userProgressList?.response
})
const mapDispatchToProps = (dispatch) => ({
    getUserProgressListByCourseId_: (courseId)=> dispatch(getUserProgressListByCourseId(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TrackUserList)