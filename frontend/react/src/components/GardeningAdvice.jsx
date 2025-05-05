import { useEffect, useState } from "react";
import pappy from "../assets/images/pappy.png";
const API_URL = import.meta.env.VITE_API_URL;

function GardeningAdvice({zipCode}) {
  const [zone, setZone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGardeningZone = async () => {
      try {
        const response = await fetch(`${API_URL}/gardening-tips?zip_code=${zipCode}`);
        if (!response.ok) {
          throw new Error("Failed to fetch gardening tips");
        }
        const data = await response.json();
        setZone(data.zone);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGardeningZone();
  }, [zipCode]);

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
          {error && <p className="text-red-600">{error}</p>}
          {zone && <p>Your gardening zone is: <strong>{zone}</strong></p>}
        </div>
    </div>
  );
}

export default GardeningAdvice;