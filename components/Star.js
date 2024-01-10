// components/Star.js

import PropTypes from 'prop-types';

const Star = ({ filled, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: 'pointer',
        color: filled ? '#FFD700' : '#172554', // Filled or transparent color based on the filled prop
        fontSize: '1.9em', // Adjust the font size for a larger star
        margin: '0 2px', // Add margin for better spacing between stars
      }}
    >
      &#9733;
    </span>
  );
};

Star.propTypes = {
  filled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default Star;
