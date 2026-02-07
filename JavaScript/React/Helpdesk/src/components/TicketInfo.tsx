import React from 'react';

const TicketInfo = ({ result, image, children }) => {
  return (
    <div className={`ticket-info ${result}`}>
      <img src={image} width={50} />
      {children}
    </div>
  );
};

export default TicketInfo;
