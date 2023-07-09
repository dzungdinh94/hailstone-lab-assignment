import React from 'react';
import './styles.scss';
function GranularitySelect({ onGranularityChange }) {
  const handleSelectChange = event => {
    onGranularityChange(event.target.value);
  };

  return (
    <select onChange={handleSelectChange}>
      <option value="last_15_minutes">1 minute interval over the last 15 minutes</option>
      <option value="last_1_hour">5 minute interval over the last 1 hour</option>
      <option value="last_4_hours">15 minute interval over the last 4 hours</option>
      <option value="last_12_hours">1 hour interval over the last 12 hours</option>
    </select>
  );
}

export default GranularitySelect;
