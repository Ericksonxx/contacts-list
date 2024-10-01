import { useState, useEffect } from 'react';
import  SearchItem  from './search-item'

export default function SearchByText ({supabase}) {
  const [signageCompanies, setSignageCompanies] = useState([]);
  const [input, setInput] = useState();

  const MAPS_KEY = process.env.REACT_APP_MAPS_KEY

  const getTextSearch = async () => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${input}&key=${MAPS_KEY}`);
      const data = await response.json();
      setSignageCompanies(data.results);
    } catch (error) {
      console.error(error);
    }
  };


  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    getTextSearch();
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-900 text-white p-4">
        <div>
            <p>Search By Text</p>
        </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type here..."
        className="w-full p-2 mb-4 text-black"
      />
      <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Search
      </button>
      <div className="flex flex-col items-center bg-gray-900 text-white p-4 overflow-scroll w-full">
        {signageCompanies.map((company) => (
          <SearchItem key={company.id} company={company} MAPS_KEY={MAPS_KEY} supabase={supabase} />
        ))}
      </div>
    </div>
  );
};