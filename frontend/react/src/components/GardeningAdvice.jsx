import pappy from "../assets/images/pappy.png";
import { useGardeningTips } from "../hooks/useGardeningTips";

function GardeningAdvice({zipCode}) {
  const { gardeningTipsData, loading } = useGardeningTips(zipCode);

  return (
    <div className="gardening-advice w-[400px] max-w-full space-y-4">
      <h2 className="text-center">Gardening Advice</h2>
      <div className="flex flex-row items-center justify-between">
        <img src={pappy} alt="Pappy, the garden guru." className="w-24" />
        <div className="px-2">
          {gardeningTipsData && <p>Your gardening zone is: <strong>{gardeningTipsData.zone}</strong></p>}
        </div>
      </div>
      <div>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default GardeningAdvice;