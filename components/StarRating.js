// components/StarRating.js
const StarRating = ({ rating, style }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index} style={{ color: index < filledStars ? "#172554" : "white" }}>
        &#9733;
      </span>
    );
  });

  return <div style={{ fontSize: style?.fontSize || "30px" }}>{stars}</div>;
};

export default StarRating;
