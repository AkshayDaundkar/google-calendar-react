import dayjs from 'dayjs'
import React,{useContext, useEffect, useState} from 'react'
import GlobalContext from '../context/GlobalContext';
import { getMonth } from '../util';

function SmallCalendar() {
    const [currentMonthIdx,setcurrentMonthIdx]=useState(dayjs().month());
    const [currentMonth,setcurrentMonth]=useState(getMonth());
    useEffect(()=>{
        setcurrentMonth(getMonth(currentMonthIdx));
    },[currentMonthIdx]);

    const {monthIndex,setsmallCalendarMonth,setdaySelected,daySelected} = useContext(GlobalContext)

    useEffect(()=>{
        setcurrentMonthIdx(monthIndex);
    },[monthIndex])

    function handlePrevMonth(){
        setcurrentMonthIdx(currentMonthIdx -1)
    }

    function handleNextMonth(){
        setcurrentMonthIdx(currentMonthIdx +1)
    }

    function getDayClass(day){
        const format="DD-MM-YY"
        const nowDay=dayjs().format(format)
        const currDay = day.format(format)
        const slcDay= daySelected && daySelected.format(format)

        if(nowDay===currDay){
            return 'bg-green-300 squared-full text-black font-bold'
        }
        else if(currDay === slcDay){
            return "bg-blue-100 rounded-full text-blue-600 font-bold"
        }
        else{
            return ""
        }
    }

    return (
        <div className='mt-5'>
            <header className='flex justify-between'>
                <p className='text-gray-500 font-bold uppercase'>
                    {dayjs(new Date(dayjs().year(),currentMonthIdx)).format("MMMM YYYY")}
                </p>
                <div>
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
                </div>
            </header>
            <div className='grid grid-cols-7 grid-rows-6'>
                {currentMonth[0].map((day,i)=>(
                    <span key={i} className='text-sm py-1 text-center border border-gray-250'>
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row,i)=>(
                    <React.Fragment key={i}>
                        {row.map((day,idx)=>(
                            <button key={idx} 
                            onClick={()=>{
                                setsmallCalendarMonth(currentMonthIdx);
                                setdaySelected(day)
                            }}
                            className={`py-1 w-full ${getDayClass(day)}`}> 
                                <span className='text-sm'>{day.format('D')}</span>
                            </button>
                        ))}

                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default SmallCalendar
