import { connect } from "react-redux"
import AppBody from "../../components/Layout/AppBody"
import { Button, Table, Progress } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCourseProgressListByUserId } from "../../store/action/users/usersAction"
import moment from "moment"


const TrackCourseList = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [courseList, setCourseList] = useState([])
    const query = new URLSearchParams(window.location.search);
    const name = query.get('user');

    useEffect(()=>{
        props.getCourseProgressListByUserId_(id)
    }, [])

    useEffect(()=>{
        if(props.courseProgressList && Array.isArray(props.courseProgressList)) {
            setCourseList(props.courseProgressList.map(course => {
                let status = 'Deactivated';
                    if(course.isActive) {
                        const today = new Date();
                        const startDate = new Date(course.startDate);
                        const endDate = new Date(course.endDate);

                        if (moment(today).isSameOrAfter(moment(startDate), 'day') &&  moment(today).isBefore(moment(endDate), 'day')) {
                            status = 'Active';
                        }
                        else {
                            status = 'Inactive';
                        }
                    }

                return {
                    key: course.courseId,
                    courseId: course.courseId,
                    courseTitle: course.title,
                    image: course.image,
                    uploadedDate: new Date(course.createdAt).toLocaleDateString(),
                    startDate: new Date(course.startDate).toLocaleDateString(),
                    endDate: new Date(course.endDate).toLocaleDateString(),
                    status: status,
                    progress: course.progress,
                    isActive: course.isActive
                };
            }))
        }
    }, [props.courseProgressList])
    
    const columns = [
        {
            title: 'Course Id',
            dataIndex: 'courseId',
            key: 'courseId',
        },
        {
            title: 'Course Title',
            dataIndex: 'courseTitle',
            key: 'courseTitle',
        },
        {
            title: 'Uploaded Date',
            dataIndex: 'uploadedDate',
            key: 'uploadedDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                let color = 'green';
                if (status === 'Inactive') {
                    color = '#CDB500';
                } else if (status === 'Deactivated') {
                    color = 'red';
                }
                return (
                    // <Tag color={color}>
                    <>
                        <span style={{ marginRight: 8, display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: color }}></span>
                        {status}
                    </>
                    // </Tag>
                );
            },
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
                    percent={record.progress[0].completedPercentage}
                    strokeColor={getColor(record.progress[0].completedPercentage)}
                    format={percent => `${percent}%`}
                    width={50}
                />
            }

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="default" onClick={()=>navigate(`/progress/course/${id}/${record.courseId}?user=${name}`)}>View Progress</Button>
            ),
        },
    ]

    return (
        <AppBody heading="Progress" title={`${decodeURIComponent(name)}'s Progress`} extra={<Button onClick={()=>{navigate(-1)}}>Back</Button>}>
            <Table columns={columns} dataSource={courseList} />
        </AppBody>
    )
}

const mapStateToProps = (state) => ({
    courseProgressList: state.courseProgressList?.response
})
const mapDispatchToProps = (dispatch) => ({
    getCourseProgressListByUserId_: (userId)=> dispatch(getCourseProgressListByUserId(userId)),

})

export default connect(mapStateToProps, mapDispatchToProps)(TrackCourseList)