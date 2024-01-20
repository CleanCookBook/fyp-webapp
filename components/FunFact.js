const FunFact = ({ facts }) => {
  // Ensure that facts is an array
  const factsArray = facts || [];

  return (
    <div name="content" className="p-4 pl-20">
      <ul className="list-disc text-[#1D5198] ml-4">
        {factsArray.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
    </div>
  );
};

export default FunFact;
