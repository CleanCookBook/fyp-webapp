
const FunFact = ({ facts }) => {
  // Ensure that facts is an array
  const factsArray = facts || [];

  return (
    <div name="content" className="p-4 pl-20">
      <ul className="list-disc text-[#1D5198] ml-4">
        {factsArray.map((fact, index) => {
          // Split each fact at the ":" delimiter
          const [beforeColon, afterColon] = fact.split(':');

          return (
            <li key={index}>
              {/* Check if the ":" delimiter is present in the fact */}
              {beforeColon && afterColon ? (
                <>
                  <span className="font-bold">{beforeColon.trim()}</span>: {afterColon.trim()}
                </>
              ) : (
                fact // If no ":", render the entire fact as is
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FunFact;
