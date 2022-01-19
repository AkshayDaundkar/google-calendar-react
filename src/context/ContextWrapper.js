import dayjs from 'dayjs'
import React, {useState,useEffect, useReducer, useMemo}from 'react'
import GlobalContext from './GlobalContext'

function savedEventsReducer(state,{type,payload}){
    switch(type){
        case 'push':
            return [...state,payload];
        case "update":
            return state.map((evt) => 
            evt.id === payload.id ? payload : evt
            );
        case "delete":
            return state.filter((evt) => 
            evt.id !== payload.id
            );
        default:
            throw new Error();
    }
}
function initEvents(){
    const stoargeEvents = localStorage.getItem('savedEvents');
    const parsedEvents = stoargeEvents ? JSON.parse(stoargeEvents) : []
    return parsedEvents
}


function ContextWrapper(props) {
    const [monthIndex,setMonthIndex]=useState(dayjs().month());
    const [smallCalendarMonth,setsmallCalendarMonth]=useState(null);
    const [daySelected,setdaySelected]=useState(dayjs());
    const [showEventModal,setshowEventModal]=useState(false);
    const [selectedEvent,setselectedEvent]=useState(null);
    const [labels,setlabels]=useState([]);

    const [savedEvents,dispatchCalEvent] = useReducer(savedEventsReducer,[], initEvents);

    const filteredEvents = useMemo(()=>{
        return savedEvents.filter((evt) =>
         labels.filter(lbl => lbl.checked)
         .map(lbl => lbl.label)
         .includes(evt.label)
         );
    }, [savedEvents,labels])
    
    useEffect(()=>{
        localStorage.setItem('savedEvents',JSON.stringify(savedEvents));
    },[savedEvents]);

    useEffect(()=>{
        setlabels((prevLabels)=>{
            return [...new Set(savedEvents.map((evt)=> evt.label))].map(label=>{
                const currentLabel = prevLabels.find((lbl)=>lbl.label === label)
                return {
                    label,
                    checked : currentLabel ? currentLabel.checked : true,
                }
            })
        })
    },[savedEvents]);

    useEffect(()=>{
        if(smallCalendarMonth !==null){
            setMonthIndex(smallCalendarMonth)
        }
    },[smallCalendarMonth]);

    useEffect(()=>{
        if(!showEventModal){
            setselectedEvent(null);
        }
    },[showEventModal]);

    function updateLabel(label){
        setlabels(labels.map((lbl)=>lbl.label===label.label ? label : lbl))
    }

    return (
       <GlobalContext.Provider 
       value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setsmallCalendarMonth,
            daySelected,
            setdaySelected,
            showEventModal,
            setshowEventModal,
            dispatchCalEvent,
            savedEvents,
            selectedEvent,
            setselectedEvent,
            setlabels,
            labels,
            updateLabel,
            filteredEvents,
       
       }}>
           {props.children}
       </GlobalContext.Provider>
    )
}

export default ContextWrapper
