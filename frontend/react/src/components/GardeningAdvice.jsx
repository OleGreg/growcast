import pappy from "../assets/images/pappy.png";
import { useGardeningTips } from "../hooks/useGardeningTips";

function GardeningAdvice({ zipCode }) {
  const { gardeningTipsData, loading } = useGardeningTips(zipCode);

  return (
    <div className="gardening-advice w-[400px] max-w-full space-y-4">
      <div className="flex flex-row items-center justify-between">
        <img src={pappy} alt="Pappy, the garden guru." className="w-24" />
        <div className="px-2">
          <h2 className="text-center">Gardening Advice</h2>
          {gardeningTipsData && (
            <p>Its <strong>{gardeningTipsData.season}</strong> in gardening zone <strong>{gardeningTipsData.zone}</strong></p>
          )}
        </div>
      </div>
      <div>
        <p className="mb-5">Here are Pappy's helpful tips:</p>
        {loading && <p>Loading...</p>}
        {!loading && gardeningTipsData?.suggested_crops?.length > 0 && (
          <ul className="list-disc list-inside space-y-1 text-left mx-auto">
            {gardeningTipsData.suggested_crops.map((crop, index) => (
              <li key={index}>{crop}</li>
            ))}
          </ul>
        )}
        {!loading && gardeningTipsData?.suggested_crops?.length === 0 && (
          <p>No crop suggestions available for this time.</p>
        )}
      </div>
    </div>
  );
}

export default GardeningAdvice;