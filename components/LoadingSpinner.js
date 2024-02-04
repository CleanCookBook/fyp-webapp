const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <img 
        src="/loading.gif" 
        alt="Loading" 
        className="loading-spinner" 
        style={{
          position: 'relative',
          top: 0, // Move the loading spinner up
          left: 0,
          width: '100px', // Adjust the size of the loading spinner
          height: '100px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
};

export default LoadingSpinner;