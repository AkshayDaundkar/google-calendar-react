import React, { useContext } from 'react'
import plusImg from '../assets/plus.svg'
import GlobalContext from '../context/GlobalContext'
function CreateEventButton() {
    const {setshowEventModal} = useContext(GlobalContext)
    return <button onClick={()=>setshowEventModal(true)} className='border ml-8 mt-2 p-2 rounded-full flex items-center shadow-md hover:shadow-2xl'>
            <img src={plusImg} alt="create_event" className='w-7 h-7'></img>
            <span className='pl-3 pr-7'>CREATE</span>
        </button>
     }

export default CreateEventButton
