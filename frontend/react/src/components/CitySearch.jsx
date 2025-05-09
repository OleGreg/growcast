import { useState, useEffect, useRef } from "react";
import { useCities } from "../hooks/useCities";

const CitySearch = ({ onCitySelect }) => {
  const [search, setSearch] = useState("");
  const { cities, loading } = useCities();
  const [filteredCities, setFilteredCities] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Filter cities based on search input
    if (search.length === 0) {
      setFilteredCities([]);
      return;
    }
    const lowerSearch = search.toLowerCase();
    const results = cities.filter((item) =>
      item.city.toLowerCase().includes(lowerSearch)
    );
    setFilteredCities(results.slice(0, 5));
  }, [search, cities]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the container (input + list)
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setFilteredCities([]); // Close dropdown
        setSearch(""); // Clear input
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="weather-card city-search w-[400px] max-w-full" ref={containerRef}>
      {loading ? (
        <input
          type="text"
          placeholder="Loading Cities"
          className="w-full p-2 border border-white placeholder:text-white rounded"
          disabled
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search for a city..."
            className="w-full p-2 border-2 border-white placeholder:text-white rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredCities.length > 0 && (
            <ul className="mt-2 border border-white rounded">
              {filteredCities.map((item, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onCitySelect(item.lat, item.lon, item.city, item.zip);
                    setSearch("");
                    setFilteredCities([]);
                  }}
                >
                  {item.city}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default CitySearch;