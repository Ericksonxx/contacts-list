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
  const [current, setCurrent] = useState(0);


  return(
    <div>
      <div className='h-full flex text-gray-300'>
        <div className='w-[15%] bg-gray-800 h-screen fixed'>
          <div className='mt-12 '>
            <div>
              <button onClick={() => {setBoard('contacts'); setCurrent(0)}} className={`hover:bg-gray-700  w-full text-left p-6 font-semibold text-lg ${current == 0 ? 'bg-gray-700' : ''}`}>Contacts</button>
            </div>
            <div>
              <button onClick={() => {setBoard('search'); setCurrent(1)}} className={`hover:bg-gray-700  w-full text-left p-6 font-semibold text-lg ${current == 1 ? 'bg-gray-700' : ''}`}>Search by City</button>
            </div>
            <div>
              <button onClick={() => {setBoard('search-text'); setCurrent(2)}} className={`hover:bg-gray-700  w-full text-left p-6 font-semibold text-lg ${current == 2 ? 'bg-gray-700' : ''}`}>Search by Text</button>
            </div>
            <div>
              <button onClick={() => {setBoard('blacklist'); setCurrent(3)}} className={`hover:bg-gray-700  w-full text-left p-6 font-semibold text-lg ${current == 3 ? 'bg-gray-700' : ''}`}>Black List</button>
            </div>
          </div>
        </div>
        <div className='ml-[15%] w-[85%] bg-gray-900 h-screen p-12'>
          {board == 'search' && <Search supabase={supabase} />}
          {board == 'search-text' && <SearchByText supabase={supabase} />}
          {board == 'contacts' && <Contacts supabase={supabase} />}
          {board == 'blacklist' && <BlackList supabase={supabase} />}
        </div>
      </div>
    </div>
  )
}