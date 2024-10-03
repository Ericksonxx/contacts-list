
import { useState, useEffect } from "react";

export default function BlackList({supabase}) {

    const [blackcontact, setBlackcontact] = useState([]);

    useEffect(() => {
        getBlacklist();
    }, []);

    async function getBlacklist() {
        let { data: blacklist, error } = await supabase
        .from('blacklist')
        .select('*')
        setBlackcontact(blacklist)
    }

    async function whitelist(contact) {
        const { error } = await supabase
        .from('blacklist')
        .delete()
        .eq('id', contact.id)
        getBlacklist()
    }

    return(
        <div>
            <p>BLACKLIST</p>
            <div>
                {blackcontact.map((contact) => (
                    <div className="bg-gray-800 p-4 mb-4 w-full">
                        <p className="text-xl font-semibold">{contact.name}</p>
                        <p className="text-xs text-gray-300">{contact.address}</p>
                        <p className="text-xs">{contact.phone}</p>
                        <div className="mt-4">
                            <button onClick={() => whitelist(contact)} className="bg-gray-200 px-2 rounded-full text-xs font-semibold text-gray-800">WHITELIST THIS CONTACT</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}