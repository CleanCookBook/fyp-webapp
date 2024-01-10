// components/SmallStarRating.js
const SmallStarRating = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    const stars = Array.from({ length: 5 }, (_, index) => {
      return (
        <span key={index} style={{ color: index < filledStars ? "#fdc500" : "#00296B", fontSize: "20px" }}>
          &#9733;
        </span>
      );
    });
  
    return <div>{stars}</div>;
  };
  
  export default SmallStarRating;
  