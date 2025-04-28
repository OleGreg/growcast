import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

// utils/getWeather.js

export async function getWeather() {
const cachedWeather = JSON.parse(localStorage.getItem("weatherData"));
const now = Date.now();

if (cachedWeather && now - cachedWeather.timestamp < 30 * 60 * 1000) {
  console.log("Using cached weather data");
  return cachedWeather.data;
}

const response = await fetch("/weather");
if (!response.ok) {
  throw new Error("Failed to fetch weather");
}

const data = await response.json();
localStorage.setItem(
  "weatherData",
  JSON.stringify({ data: data, timestamp: now })
);

console.log("Fetched new weather data");
return data;
}