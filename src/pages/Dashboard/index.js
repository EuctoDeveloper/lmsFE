import React from "react";
import { connect } from "react-redux";
import PageHeading from "../../components/PageHeading";
import { UserOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';
import { getAnalytics } from "../../store/action/common/authAction";


function Dashboard(props) {
  const [analytics, setAnalytics] = React.useState([0, 0, 0]);
  React.useEffect(() => {
    props.getAnalytics_();
  }, []);
  React.useEffect(() => {
    if (props.analytics) {
      setAnalytics([props.analytics.employeeCount, props.analytics.customerCount, props.analytics.courseCount]);
    }
  }, [props.analytics]);
  const analyticsData = [
    {
      icon: <TeamOutlined style={{ color: "#FCAC20", backgroundColor: "#FFF6E8", padding: "10px", borderRadius: "50%" }} />,
      text: "Total Staffs",
      count: analytics[0]
    },
    {
      icon: <UserOutlined style={{ color: "#4859FF", backgroundColor: "#ECECEC", padding: "10px", borderRadius: "50%" }} />,
      text: "Total Clients",
      count: analytics[1] 
    },
    {
      icon: <BookOutlined style={{ color: "#FF9800", backgroundColor: "#FFF3E0", padding: "10px", borderRadius: "50%" }} />,
      text: "Total Courses",
      count: analytics[2]
    }
  ];
  const AnalyticsCard = ({ icon, text, count }) => {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        padding: "20px", 
        margin: "10px", 
        border: "1px solid #ddd", 
        borderRadius: "8px", 
        width: "30%",
        backgroundColor: "#fff" }}
      >
        <div style={{ fontSize: "24px", marginRight: "20px" }}>{icon}</div>
        <div>
          <div style={{ fontSize: "18px"}}>{text}</div>
          <div style={{ fontSize: "24px", fontWeight: "bold"  }}>{count}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeading heading="Dashboard" />
    
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {analyticsData.map((data, index) => (
            <AnalyticsCard key={index} icon={data.icon} text={data.text} count={data.count} />
          ))}
        </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
    analytics: state.analytics?.response,
})
const mapDispatchToProps = (dispatch) => ({
  getAnalytics_: () => dispatch(getAnalytics())
        
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);