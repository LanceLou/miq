import React from 'react';

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationList: [],
    };
  }
  render() {
    return (
      <div className="m-notifContainer">
        <span className="notice-icon" />
        <div className="m-notiContent">
          <div className="m-notiHeader">
            <h3>通知</h3>
          </div>
          <ul className="m-motiList">
            <li>test</li>
          </ul>
          <div className="notiFooter">查看全部</div>
        </div>
      </div>
    );
  }
}

export default NotificationComponent;
