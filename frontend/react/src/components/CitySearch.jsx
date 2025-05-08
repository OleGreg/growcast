import { useState, useEffect } from "react";
import { useCities } from "../hooks/useCities";

const CitySearch = ({onCitySelect}) => {
  const [search, setSearch] = useState("");
  const {cities, loading} = useCities();
  const [filteredCities, setFilteredCities] = useState([]);

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

  if(loading) {
    return "Loading Cities";
  }

  else {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full p-2 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredCities.length > 0 && (
          <ul className="mt-2 border border-gray-200 rounded shadow">
            {filteredCities.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={onCitySelect}
              >
                {item.city}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default CitySearch;
