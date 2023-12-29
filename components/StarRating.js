// components/StarRating.js
const StarRating = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    const stars = Array.from({ length: 5 }, (_, index) => {
      if (index < filledStars) {
        return <span key={index} style={{ color: "#172554" }}>&#9733;</span>;
      } else if (index === filledStars && hasHalfStar) {
        return <span key={index} style={{ color: "#172554" }}>&#9733;</span>;
      } else {
        return <span key={index} style={{ color: "white" }}>&#9733;</span>;
      }
    });
  
    return <div style={{ fontSize: "50px" }}>{stars}</div>;
  };
  
  export default StarRating;
  