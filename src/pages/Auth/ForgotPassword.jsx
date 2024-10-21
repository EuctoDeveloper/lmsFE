import { connect } from "react-redux";
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { forgotPassword, resetPassword } from "../../store/action/common/authAction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ForgotPassword(props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const onFinish = (values) => {
    if(step === 1)
      props.forgotPassword_(values);
    else {
      props.resetPassword_({email: values.email, otp: values.otp, password: values.newPassword});
    }
  };

  useEffect(() => {
    if(props.forgotPassword && props.forgotPassword.message && props.forgotPassword.message.includes("Success")) {
      setStep(2);
    }
    if(props.resetPassword && props.resetPassword.message && props.resetPassword.message.includes("Success")) {
      navigate("/login");
    }
  }, [props.forgotPassword, props.resetPassword])
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FBF0E8' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ marginBottom: '20px' }} width="200" />
        <p>Reset Password</p>
        <Form layout="vertical" requiredMark={false} onFinish={onFinish} validateTrigger="onSubmit">
          <Form.Item
            label={<span>Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!' }
            ]}
          >
            <Input 
              style={{ width: '350px', padding: '0 0 0 5px', borderRadius: 0 }} 
              suffix={<span style={{ backgroundColor: '#F3661F', color: 'white', padding: '5px 8px', marginRight: "0px" }}><MailOutlined /></span>} 
              disabled={step > 1}
            />
          </Form.Item>
          {step === 2 && (
            <>
              <Form.Item
                label={<span>OTP</span>}
                name="otp"
                rules={[
                  { required: true, message: 'Please input the OTP!' },
                  { len: 6, message: 'OTP must be 6 digits!' }
                ]}
              >
                <Input 
                  style={{ width: '350px', padding: '0 0 0 5px', borderRadius: 0 }} 
                  suffix={<span style={{ backgroundColor: '#F3661F', color: 'white', padding: '5px 8px', marginRight: "0px" }}><SafetyCertificateOutlined /></span>} 
                />
              </Form.Item>
              <Form.Item
                label={<span>New Password</span>}
                name="newPassword"
                rules={[
                  { required: true, message: 'Please input your new password!' },
                  { min: 8, message: 'Password must be at least 8 characters!' },
                  { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter!' },
                  { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter!' },
                  { pattern: /[0-9]/, message: 'Password must contain at least one number!' },
                  { pattern: /[!@#$%^&*]/, message: 'Password must contain at least one special character!' }
                ]}
              >
                <Input
                  type="password"
                  style={{ width: '350px', padding: '0 0 0 5px', borderRadius: 0 }} 
                  suffix={<span style={{ backgroundColor: '#F3661F', color: 'white', padding: '5px 8px', marginRight: "0px" }}><LockOutlined /></span>} 
                />
              </Form.Item>
              <Form.Item
                label={<span>Confirm New Password</span>}
                name="confirmNewPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The passwords does not match!'));
                    },
                  }),
                ]}
              >
                <Input
                  type="password"
                  style={{ width: '350px', padding: '0 0 0 5px', borderRadius: 0 }} 
                  suffix={<span style={{ backgroundColor: '#F3661F', color: 'white', padding: '5px 8px', marginRight: "0px" }}><LockOutlined /></span>} 
                />
              </Form.Item>
              <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                <p>Password must contain:</p>
                <ul>
                  <li>At least 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character (!@#$%^&*)</li>
                </ul>
              </div>
            </>
          )}
          <p href="/forgot-password" style={{ display: 'block', marginBottom: '20px', textAlign: 'right', color: '#F3661F', cursor:"pointer" }} onClick={()=>navigate("/login")}>Looking to Login?</p>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ padding: '10px 20px', backgroundColor: '#F3661F', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' , width:"100%"}}>
              {step === 1 ? "Send Reset OTP" : "Verify & Reset Password"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  forgotPassword: state.forgotPassword?.response,
  resetPassword: state.resetPassword?.response
})
const mapDispatchToProps = (dispatch) => ({
  forgotPassword_:(data)=>{ dispatch(forgotPassword(data))},
  resetPassword_:(data)=>{ dispatch(resetPassword(data))},
        
})
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);