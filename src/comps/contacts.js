import { useEffect, useState } from "react"


export default function Contacts({supabase}) {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts();
      }, [supabase]); 

      const getContacts = async () => {
        let { data: contacts, error } = await supabase
          .from('contacts')
          .select('*');
        
        if (error) {
          console.error('Error fetching contacts:', error);
        } else {
          console.log(contacts);
          setContacts(contacts);
        }
      };


      async function DeleteContact(contact) {
        const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contact.id)
        getContacts()
      }


    return(
        <div>
            <h1>Contacts</h1>
            {contacts.map((contact) => (
                <div key={contact.id} className="bg-gray-800 p-4 mb-4 w-full text-gray-200">
                    <div className="flex justify-end">
                        <div className={contact.worked_with ? 'bg-green-600 px-2 rounded-full text-xs font-semibold mx-2' : 'bg-yellow-600 px-2 rounded-full text-xs font-semibold mx-2'}>
                          <p>{contact.worked_with ? 'HAVE' : 'NOT'} WORKED WITH</p>
                        </div>
                        <button onClick={() => DeleteContact(contact)} className="bg-red-600 px-2 rounded-full text-xs font-semibold">DELETE</button>
                    </div>
                    <div className="text-xl font-semibold">{contact.name}</div>
                    <div className="text-xs text-gray-300">{contact.address}</div>
                    <div className="text-md font-semibold mt-4">
                      <a href={contact.website} target="_blank">Website</a> | {contact.phone}
                      <p>{contact.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}