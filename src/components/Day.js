import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext';

function Day({day,rowIdx}) {

    const [dayEvents,setDayEvents]=useState([]);
    const {setdaySelected,setshowEventModal,filteredEvents,setselectedEvent} = useContext(GlobalContext);

    useEffect(()=>{
        const events = filteredEvents.filter(
            (evt)=>
             dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
             setDayEvents(events)
    },[filteredEvents,day]);

    function getCurrentDayClass(){
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
        ? "bg-blue-500 text-white rounded-lg w-7 p-2"
        : "";
    }

    return (
        <div className='border border-gray-250 flex flex-col'>
           <header className='flex flex-col items-center'>
                {rowIdx===0&&(
                    <p className='text-m text-bold mt-1 text-gray-600'>{day.format('ddd').toUpperCase()}</p>
                )}
                <p className={`text-sm p-1 my-1 text-center text-bold ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
           </header>
           
           <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                setdaySelected(day);
                setshowEventModal(true)
                }}
            >
                {dayEvents.map((evt,idx)=>(
                    <div key={idx} 
                    onClick={()=>setselectedEvent(evt)}
                    className={`bg-${evt.label}-200 p-1 m-0.5 mt-1 text-gray-800 text-sm squared mb-1 truncate shadow-md hover:shadow-2xl`}>
                        {evt.title}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Day
