import { useEffect, useState } from "react";

export default function SearchItem ({company, MAPS_KEY, supabase}) {

    const [details, setDetails] = useState([]);
    console.log(supabase)

    useEffect(() => {
      getDetails();
    },[])

   const getDetails = async () => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${company.place_id}&fields=formatted_phone_number,website&key=${MAPS_KEY}`);
    const data = await response.json();
    console.log(data.result); 
    setDetails(data.result);
  } catch (error) {
    console.error(error);
  }
};

    async function addContact() {
        const { data, error } = await supabase
            .from('contacts')
            .insert([{ 
                id: company.place_id,
                name: company.name, 
                address: company.formatted_address,
                phone: details.formatted_phone_number,
                website: details.website 
            },])
            .select()
    }


    return(
        <div key={company.id} className="bg-gray-800 p-4 mb-4 w-full">
            <div className="text-xl font-semibold">{company.name}</div>
            <div className="text-xs text-gray-300">{company.formatted_address}</div>
            <div className="mt-6">
              <div className="text-sm text-gray-300">
              {details.formatted_phone_number ? 
                    <p className="text-lg">{details.formatted_phone_number}</p> 
                : null}
                {details.website ? <div className="text-lg">
                    <a href={details.website} target="_blank">Website</a></div> : null}
              </div>

          </div>
          <button className="bg-blue-600 px-2 rounded-full text-sm font-semibold mt-6 w-full" onClick={() => addContact()}>+ ADD TO CONTACTS</button>
    </div>
    )
}