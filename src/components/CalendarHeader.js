import dayjs from 'dayjs';
import React, { useContext } from 'react'
import logo from "../assets/logo.png"
import man from "../assets/man.png"
import GlobalContext from '../context/GlobalContext'
function CalendarHeader() {
    const {monthIndex,setMonthIndex}=useContext(GlobalContext);

    function handlePrevMonth(){
        setMonthIndex(monthIndex-1)
    }
    function handleNextMonth(){
        setMonthIndex(monthIndex+1)
    }
    function handleReset(){
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month() );
    }
    return (
       <header className='px-4 py-2 flex items-center'>
           <img src={logo} alt="calendar" className='mr-2 ml-1 w-12 h-12'></img>
           <h1 className='mr-5 ml-2 text-xl text-gray-600 fond-bold'> Memories Calendar</h1>
           <button onClick={handleReset} className="border rounded py-2 px-4 mr-5 text-bold bg-green-300 shadow-md hover:shadow-2xl">
               Today
           </button>
           <button onClick={handlePrevMonth}>
               <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_left
               </span>
            </button>
            <button onClick={handleNextMonth}>
               <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_right
               </span>
           </button>
           <h2 className='uppercase ml-4 text-xl text-gray-600 font-bold'>{dayjs(new Date(dayjs().year(),monthIndex)).format("MMMM YYYY")}</h2>
           <div className="fixed right-5 flex flex-box">
               <p className='mr-2'> Hi User !</p>
               <img alt="profile" className="rounded-full w-7 h-7" src={man}></img>
           </div>
       </header>
    )
}

export default CalendarHeader
