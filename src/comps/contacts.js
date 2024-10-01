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
                    <div>
                        <button onClick={() => DeleteContact(contact)}>DELETE</button>
                    </div>
                    <div className="text-xl">{contact.name}</div>
                    <div>{contact.address}</div>
                    <div className="text-sm mt-4">{contact.phone}</div>
                    <div className="text-sm">{contact.website}</div>

                    <div>
                        {contact.worked_with ? 
                            <div className="text-lg">Worked with: YES</div> 
                        : <div>Worked with: NO</div>}
                    </div>
                </div>
            ))}
        </div>
    )
}