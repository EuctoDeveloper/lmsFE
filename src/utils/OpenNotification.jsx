import { notification } from 'antd';

const OpenNotification = (type, title, content) => {
  notification[type]({
    message: title,
    description: content,
  });
};

export default OpenNotification;