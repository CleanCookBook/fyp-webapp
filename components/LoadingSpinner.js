const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F9D548]">
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
          zIndex: 2, // Set a lower z-index to place it behind other elements
        }}
      />
    </div>
  );
};

export default LoadingSpinner;