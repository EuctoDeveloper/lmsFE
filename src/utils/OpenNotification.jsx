import { notification } from 'antd';

const OpenNotification = (type, title, content) => {
  
  const key = content;
  
  notification.open({
    key,
    type,
    message: title,
    description: content,
    duration: 3, // Notification will disappear after 3 seconds
  });
  // notification[type]({
  //   message: title,
  //   description: content,
  // });
};

export default OpenNotification;