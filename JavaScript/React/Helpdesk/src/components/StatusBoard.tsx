import React from 'react';
import TicketInfo from './TicketInfo';
import completedImage from '../images/green-check-mark-icon-symbol-logo-in-little-circle-tick-symbol-green-checkmark-approve-transparent-free-png-3511535077.png';
import inProgressImage from '../images/8091509-3860925099.png';
import failedImage from '../images/9724298-2760143856.png';



const StatusBoard = ({ children }) => {
  return (
    <div className="status-board">
    <div className="status-section completed">
      <TicketInfo result="completed" image={completedImage}>
        <h3>Completed ({children.completed.count})</h3>
        <ul>{children.completed.tickets}</ul>
      </TicketInfo>
      </div>
      <div className="status-section in-progress">
      <TicketInfo result="in-progress" image={inProgressImage}>
        <h3>In Progress ({children.inProgress.count})</h3>
        <ul>{children.inProgress.tickets}</ul>
      </TicketInfo>
      </div>
      <div className="status-section failed">
      <TicketInfo result="failed" image={failedImage}>
        <h3>Failed ({children.failed.count})</h3>
        <ul>{children.failed.tickets}</ul>
      </TicketInfo>
      </div>
    </div>
  );
};

export default StatusBoard;

