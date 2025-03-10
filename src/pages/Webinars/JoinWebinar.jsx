import React from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWebinarDetails } from "../../store/action/webinar/webinarAction";
import { connect } from "react-redux";
import { postApi } from "../../store/api/api";
import axios from "axios";


function JoinWebinar(props) {
  const {id} = useParams();
  const authEndpoint = "/stream/webinar/getJwtToken"; // http://localhost:4000
  const sdkKey = "VTzwGixZRaWzdSPdRiljfQ";
  const [meetingNumber, setMeetingNumber] = useState(null);
  const [passWord, setPassWord] = useState(null);
  const role = 1;
  const userName = "EnlightHer";
  const userEmail = "connect@EnlightHer.com";
  const registrantToken = "";
  const leaveUrl = window.location.origin + "/meetings";

  useEffect(()=>{
    console.log(id, "|sdfasd");
    if(id) {
      props.getWebinarDetails_(id);
    }
  },[])

  useEffect(() => {
    if (props.webinar) {
      console.log(props.webinar);
      setMeetingNumber(props.webinar.meetingId);
      setPassWord(props.webinar.meetingPassword);
    }
  }, [props.webinar]);

  useEffect(() => {
    console.log(meetingNumber, "meetingNumber");
    if (meetingNumber) {
      getSignature();
    }
  }, [meetingNumber]);
  
  const getSignature = async () => {
    try {

      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
      const res = await postApi(authEndpoint, {
        meetingNumber: meetingNumber,
        role: role,
      }); 

      console.log(res);
      // const signature = res.signature;
      startMeeting(res)
    } catch (e) {
      console.log(e);
    }
  };

  async function startMeeting({signature, zakToken}) {
    document.getElementById("zmmtg-root").style.display = "block";
    console.log("init")

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success, ) => {
        console.log(success, {
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken
        });
        // can this be async?
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div id="zmmtg-root"></div>
  );
}


const mapStateToProps = (state) => ({
  webinar: state.webinar?.response,
});

const mapDispatchToProps = (dispatch) => ({
  getWebinarDetails_: (id) => dispatch(getWebinarDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinWebinar);
