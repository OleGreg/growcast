import { useWeather } from './hooks/useWeather';
import './App.css'

function App() {
  const { weatherData, loading } = useWeather();

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h1>GrowCast</h1>
      <h2>Weather Data for {weatherData.city}, {weatherData.region}</h2>
      {weatherData ? (
        <div>
          <pre><strong>All Data:</strong> {JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}

export default App;