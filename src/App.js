import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import { connect } from "react-redux";
import '@fontsource/lato';
import { useEffect } from 'react';
import { setUser } from './store/action/common/authAction';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import CourseList from './pages/Courses/CourseList';
import AddCourse from './pages/Courses/AddCourse';
import ManageModule from './pages/Courses/ManageModule';
import AddLesson from './pages/Courses/AddLesson';
import AddAssessment from './pages/Courses/AddAssesment';
import UsersList from './pages/Users/UsersList';
import ManageUser from './pages/Users/ManageUser';
import CourseMap from './pages/Courses/CourseMap';
import SetCourseMap from './pages/Courses/SetCourseMap';
import ManageMaster from './pages/Master/ManageMaster';
import MasterList from './pages/Master/MasterList';
import LearnerProgress from './pages/Progress/LearnerProgress';
import WebinarList from './pages/Webinars/WebinarList';
import ManageWebinar from './pages/Webinars/ManageWebinar';
import ForgotPassword from './pages/Auth/ForgotPassword';
import { NO_TOKEN_URL } from './constants/helper';
function App(props) {  
  useEffect(() => {
    if(!props.user){
      const user = {
        email: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        role: localStorage.getItem('role'),
      };
      if (!user.role || !user.email || !user.name) {
        localStorage.clear();
        props.setUser_(null);
        props.clearLoginResponse_();
        if (!NO_TOKEN_URL.map(item => "/"+item).includes(window.location.pathname)) {
          window.location.href = '/login';
        }
      }
      else {
        props.setUser_(user)
      }
    }
  })
  return (
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/add-assessment/:moduleId/:courseId" element={<AddAssessment />} />
            <Route path="/edit-assessment/:id" element={<AddAssessment />} />
            <Route path="/edit-assessment/:id/:readOnly" element={<AddAssessment />} />
            <Route path="/add-module" element={<ManageModule />} />
            <Route path="/add-module/:id" element={<ManageModule />} />
            <Route path="/add-module/:id/:readOnly" element={<ManageModule />} />
            <Route path="/add-lesson/:moduleId/:courseId" element={<AddLesson />} />
            <Route path="/edit-lesson/:id" element={<AddLesson />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/manage-course/:id" element={<AddCourse />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/manage-user" element={<ManageUser />} />
            <Route path="/edit-user/:id" element={<ManageUser />} />
            <Route path="/course-map" element={<CourseMap />} />
            <Route path="/set-map/:id" element={<SetCourseMap />} />
            <Route path="/master">
              <Route path=":master" element={<MasterList />} />
              <Route path=":master/add" element={<ManageMaster />} />
              <Route path=":master/:id" element={<ManageMaster />} />
            </Route>
            <Route path="/learner-progress" element={<LearnerProgress />} />
            <Route path="/meetings" element={<WebinarList />} />
            <Route path="/webinar/add" element={<ManageWebinar />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/sign-up" element={<RegistrationPage />} />
          <Route path="/redirect-mail" element={<RedirectMail />} />
          <Route path="/password" element={<Password />} /> */}

        </Routes>
        <Routes>
        </Routes>
      </Router>
  );
}


const mapStateToProps = state => ({
  user: state.user.resposne
})

const mapDispatchToProps = dispatch => ({
  setUser_: (data)=>{
      dispatch(setUser(data));
  },
  clearLoginResponse_: ()=>{
      dispatch({type: 'FETCH_LOGIN_CLEAR'});
  }
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);