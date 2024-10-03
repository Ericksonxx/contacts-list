import { useEffect, useState } from "react";

export default function SearchItem ({company, MAPS_KEY, supabase, update, setUpdate}) {

    const [details, setDetails] = useState([]);
    const [contactList, setContactList] = useState([]);
    const [blacklisted, setBlacklisted] = useState(false);
    const [popblack, setPopblack] = useState(false);

    useEffect(() => {
      getDetails();
    },[])

   const getDetails = async () => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${company.place_id}&fields=formatted_phone_number,website&key=${MAPS_KEY}`);
    const data = await response.json();
    setDetails(data.result);
  } catch (error) {
    console.error(error);
  }
  filterContacts()
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
            setUpdate(update + 1)

            if(data != null) {
              setContactList(true)
            }
    }

    async function addBlacklist() {
      const { data, error } = await supabase
          .from('blacklist')
          .insert([{ 
              id: company.place_id,
              name: company.name, 
              address: company.formatted_address,
              phone: details.formatted_phone_number,
              website: details.website 
          },])
          .select()
  }

    async function filterContacts() {
      let { data: contacts } = await supabase
        .from('contacts')
        .select('id')
        .eq('id', company.place_id)
        contacts.find((contact) => contact.id == company.place_id) ? setContactList(true) : setContactList(false)

        let { data: blacklist } = await supabase
        .from('blacklist')
        .select('id')
        .eq('id', company.place_id)
        blacklist.find((contact) => contact.id == company.place_id) ? setBlacklisted(false) : setBlacklisted(true)
    }

    return(
      <div key={company.id} className="w-full">
        {blacklisted ? 
          <div key={company.id} className="bg-gray-800 border-2  border-gray-800 hover:border-gray-600 p-4 mb-4 w-full">
              <div className="flex justify-end">
                {contactList ? null : <button className="bg-blue-600 px-2 rounded-full text-sm font-semibold w-fit " onClick={() => addContact()}>+ ADD TO CONTACTS</button>}
              </div>
              <div className="text-xl font-semibold">{company.name}</div>
                <div className="text-xs text-gray-300">{company.formatted_address}</div>
                  <div className="mt-6">
                    <div className="text-sm text-gray-300">
                      {details.formatted_phone_number ? 
                        <p className="text-lg">{details.formatted_phone_number}</p> 
                      : null}
                      {details.website ? <div className="text-lg">
                          <a href={details.website} target="_blank">Website</a></div> 
                      : null}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => setPopblack(true)} className="text-xs text-gray-600"><u>Blacklist this contact</u></button>
                  </div>
                  {popblack ? (
                    <div>
                      <div className="fixed inset-0 bg-black bg-opacity-60 z-50"></div>
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                          <div className="bg-gray-800 p-8 rounded-lg">
                            <p className="text-gray-300 text-lg">
                                Are you sure you want to blacklist {company.name}?
                            </p>
                              <div className="flex justify-end">
                                <button onClick={() => setPopblack(null)}  className="bg-gray-600 px-2 rounded-full text-sm font-semibold mt-6 w-full w-fit px-6 py-2 shadow hover:bg-gray-700 mr-2">Cancel</button>
                                <button onClick={() => addBlacklist(company.place_id)} className="bg-red-600 px-2 rounded-full text-sm font-semibold mt-6 w-full w-fit px-6 py-2 shadow hover:bg-red-700">Add to Blacklist</button>
                              </div>
                          </div>
                        </div>
                      </div>
                  ) : null}
                </div>
        : null}
      </div>
    )
}