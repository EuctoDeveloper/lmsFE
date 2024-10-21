import { connect } from "react-redux";
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { clearForgotPassword, clearResetPassword, loginAction } from "../../store/action/common/authAction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login(props) {
  const onFinish = (values) => {
    props.login_(values);
  };
  const navigate = useNavigate();

  useEffect(() => {
    props.clearForgotPassword_();
    props.clearResetPassword_();
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FBF0E8' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ marginBottom: '20px' }} width="200" />
        <h1 style={{fontWeight:"bold", margin: "2px"}}>Welcome Back</h1>
        <p>Please login to access dashboard</p>
        <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
          <Form.Item
            label={<span>Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' }
            ]}
          >
            <Input style={{ width: '350px', padding: '0 0 0 5px', borderRadius: 0 }} suffix={<span style={{ backgroundColor: '#F3661F', color: 'white', padding: '5px 8px', marginRight: "0px" }}><MailOutlined /></span>} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' }
            ]}
          >
            <Input type="password" style={{ width: '350px', padding: '0 0 0 5px', borderRadius: 0 }} suffix={<span style={{ backgroundColor: '#F3661F', color: 'white', padding: '5px 8px', marginRight: "0px" }}><LockOutlined /></span>} />
          </Form.Item>
          <div href="/forgot-password" style={{ display: 'block', marginBottom: '20px', textAlign: 'right', color: '#F3661F', cursor:"pointer" }} onClick={()=>navigate("/forgot-password")}>Forgot Password?</div>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ padding: '10px 20px', backgroundColor: '#F3661F', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' , width:"100%"}}>
              Login Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
        
})
const mapDispatchToProps = (dispatch) => ({
  login_:(data)=>{ dispatch(loginAction(data))},
  clearForgotPassword_: ()=>{ dispatch(clearForgotPassword())},
  clearResetPassword_: ()=>{ dispatch(clearResetPassword())}
        
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);