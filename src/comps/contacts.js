import { useEffect, useState } from "react";


export default function Contacts({ supabase }) {
  const [contacts, setContacts] = useState([]);
  const [popupContactId, setPopupContactId] = useState(null); 

  useEffect(() => {
    getContacts();
  }, [supabase]);

  const getContacts = async () => {
    let { data: contacts, error } = await supabase.from('contacts').select('*');
    if (error) {
      console.error('Error fetching contacts:', error);
    } else {
      console.log(contacts);
      setContacts(contacts);
    }
  };

  async function DeleteContact(contactId) {
    const { error } = await supabase.from('contacts').delete().eq('id', contactId);
    if (error) {
      console.error('Error deleting contact:', error);
    } else {
      getContacts();
    }
    setPopupContactId(null); 
  }

  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="font-semibold text-2xl text-gray-300 mb-6 ">
        <h1>Contacts</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-gray-900 h-[80vh] overflow-scroll">
      {contacts.map((contact) => (
        <div key={contact.id} className="bg-gray-800 p-4 mb-4 w-full text-gray-200">
          <div className="flex justify-end">
            <div
              className={
                contact.worked_with
                  ? 'bg-green-600 px-2 rounded-full text-xs font-semibold mx-2'
                  : 'bg-yellow-600 px-2 rounded-full text-xs font-semibold mx-2'
              }
            >
              <button>{contact.worked_with ? 'HAVE' : 'NOT'} WORKED WITH</button>
            </div>
            <button
              onClick={() => setPopupContactId(contact.id)} 
              className="bg-red-600 px-2 rounded-full text-xs font-semibold"
            >
              DELETE
            </button>
          </div>
          <div className="text-xl font-semibold">{contact.name}</div>
          <div className="text-xs text-gray-300">{contact.address}</div>
          <div className="text-md font-semibold mt-4">
            <a href={contact.website} target="_blank">
              Website
            </a>{' '}
            | {contact.phone}
            <p>{contact.email}</p>
          </div>
          {popupContactId === contact.id ? ( 
            <div>
              <div className="fixed inset-0 bg-black bg-opacity-60 z-50"></div>
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-8 rounded-lg">
                  <p className="text-gray-300 text-lg">
                    Are you sure you want to delete {contact.name}?
                  </p>
                  <div className="flex justify-end">
                    <button onClick={() => setPopupContactId(null)}  className="bg-gray-600 px-2 rounded-full text-sm font-semibold mt-6 w-full w-fit px-6 py-2 shadow hover:bg-gray-700 mr-2">Cancel</button>
                    <button
                      onClick={() => DeleteContact(contact.id)}
                      className="bg-red-600 px-2 rounded-full text-sm font-semibold mt-6 w-full w-fit px-6 py-2 shadow hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
      </div>
      {!contacts || contacts.length === 0  ? (
            <div className="mt-4">
              <p>No contacts</p>
            </div>
      ) : null}
      
    </div>
  );
}
