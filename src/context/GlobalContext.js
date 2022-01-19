import React from "react"

const GlobalContext= React.createContext({
    monthIndex:0,
    setMonthIndex:(index)=>{},
    smallCalendarMonth:0,
    setsmallCalendarMonth : (index)=>{},
    daySelected:null,
    setdaySelected:(day)=>{},
    showEventModal:false,
    setshowEventModal:()=>{},
    dispatchCalEvent:({type,payload})=>{},
    savedEvents:[],
    selectedEvent:null,
    setselectedEvent:()=>{},
    setlabels:()=>{},
    labels :[],
    updateLabel:()=>{},
    filteredEvents:[],
});

export default GlobalContext