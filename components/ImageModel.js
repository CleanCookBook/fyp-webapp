// ImageModel.js

const ImageModel = ({ imageURL, onClose }) => {
  const fixedImageHeight = 700; // Adjust this value based on your preference

  const image = new Image();
  image.src = `data:image/jpeg;base64,${imageURL}`;

  // Check if the original height is smaller than the fixed height
  const finalImageHeight = image.height < fixedImageHeight ? image.height : fixedImageHeight;

  const imageStyle = {
    maxWidth: '100%',
    height: `${finalImageHeight}px`, // Set the final height
    width: 'auto',
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    position: 'relative',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'auto', // Add overflow property
  };

  const closeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    cursor: 'pointer',
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span style={closeStyle} onClick={onClose}>&times;</span>
        <img src={`data:image/jpeg;base64,${imageURL}`} alt="Selected" style={imageStyle} />
      </div>
    </div>
  );
};

export default ImageModel;
