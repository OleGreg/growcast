import pappy from "../assets/images/pappy.png";

function GardeningAdvice() {
  return (
    <div className="gardening-advice w-[400px] max-w-full">
      <div className="flex flex-row items-center justify-around">
        <img src={pappy} alt="Pappy, the garden guru." className="w-24" />
        <div>
          <h2>Gardening Advice</h2>
          <p>Coming soon!</p>
        </div>
      </div>
    </div>
  );
}

export default GardeningAdvice;