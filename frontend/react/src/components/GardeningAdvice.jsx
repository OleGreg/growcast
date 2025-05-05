import pappy from "../assets/images/pappy.png";
import { useGardeningTips } from "../hooks/useGardeningTips";

function GardeningAdvice({zipCode}) {
  const { gardeningTipsData, loading } = useGardeningTips(zipCode);

  return (
    <div className="gardening-advice w-[400px] max-w-full space-y-4">
      <div className="flex flex-row items-center justify-around">
        <img src={pappy} alt="Pappy, the garden guru." className="w-24" />
        <div>
          <h2>Gardening Advice</h2>
          <p>Coming Soon!</p>
        </div>
      </div>
      <div>
          {loading && <p>Loading...</p>}
          {gardeningTipsData && <p>Your gardening zone is: <strong>{gardeningTipsData.zone}</strong></p>}
        </div>
    </div>
  );
}

export default GardeningAdvice;