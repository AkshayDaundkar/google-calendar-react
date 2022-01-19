import React from 'react'
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from './SmallCalendar';
import Labels from './Labels';
function Sidebar() {
    return (
        <aside className='border p-5 w-64'>
            <CreateEventButton/>
            <hr className='mt-7'></hr>
            <SmallCalendar/>
            <hr className='mt-5'></hr>
            <Labels/>
            <hr className='mt-5'/>
        </aside>
    );
}

export default Sidebar
