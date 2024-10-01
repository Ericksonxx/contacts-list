import {useState, useEffect} from 'react'
import  Search from './comps/search'
import  Contacts from './comps/contacts'
import { createClient } from '@supabase/supabase-js'
import SearchByText from './comps/search-text'
import BlackList from './comps/black-list'
export default function App() {


const supabaseUrl = process.env.REACT_APP_SUPA_URL
const supabaseKey = process.env.REACT_APP_SUPA_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

  const [board, setBoard] = useState('contacts');


  return(
    <div>
      {/* <Search supabase={supabase} />
      <Contacts supabase={supabase} />
      <SearchByText supabase={supabase} /> */}
      <div className='h-full flex text-gray-300'>
        <div className='w-[20%] bg-gray-800 h-screen fixed'>
          <div className='mt-12 mx-4'>
            <div><button onClick={() => setBoard('search')} className='h-12'>Search by city</button></div>
            <div><button onClick={() => setBoard('search-text')} className='h-12'>Search by text</button></div>
            <div><button onClick={() => setBoard('contacts')} className='h-12'>Contacts</button></div>
            <div><button onClick={() => setBoard('blacklist')} className='h-12'>Black List</button></div>
          </div>
        </div>
        <div className='ml-[20%] w-[80%] bg-gray-900 h-screen p-12'>
          {board == 'search' && <Search supabase={supabase} />}
          {board == 'search-text' && <SearchByText supabase={supabase} />}
          {board == 'contacts' && <Contacts supabase={supabase} />}
          {board == 'blacklist' && <BlackList supabase={supabase} />}

        </div>
      </div>
    </div>
  )
}