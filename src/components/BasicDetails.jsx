import React from 'react';

const BasicDetails = ({ details }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Basic Details</h4>
      <p>Owner: {details.owner}</p>
      <p>Address: {details.address}</p>
    </div>
  );
};

export default BasicDetails;
