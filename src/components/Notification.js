import React from "react";

const Notification = ({ message, type }) => {
  if (message === null || message === undefined) {
    return null;
  } else {
    return <div className={type ? 'success' : 'error'}>{message}</div>;
  }
};

export default Notification;
