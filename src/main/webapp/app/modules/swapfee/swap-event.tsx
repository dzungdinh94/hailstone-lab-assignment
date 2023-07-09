import React from 'react';

function SwapEvent({ interval }) {
  return (
    <div>
      <h2>Last 5 swap events</h2>

      {interval.latestEvents.map((event, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
          }}
        >
          <p style={{ marginRight: 15 }}>{event.blockNumber}</p>
          <a href={`https://bscscan.com/block/${event.blockNumber}`}>Details</a>
        </div>
      ))}
    </div>
  );
}

export default SwapEvent;
