import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

function EventModal() {
    
    const labelsClasses = [
        "indigo",
        "gray",
        "green",
        "blue",
        "red",
        "purple",
      ];

    const {setshowEventModal,daySelected,dispatchCalEvent,selectedEvent} = useContext(GlobalContext);
    const [title,setTitle]=useState(selectedEvent ? selectedEvent.title : "");
    const [description,setdescription]=useState(selectedEvent ? selectedEvent.description : "");
    const [selectedlabel,setselectedlabel]=useState(
        selectedEvent ? labelsClasses.find((lbl)=>lbl === selectedEvent.label):labelsClasses[0] 
        );
    
    function handleSubmit(e){
        e.preventDefault()
        const calenderEvent ={
            title,
            description,
            label:selectedlabel,
            day:daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if(selectedEvent){
            dispatchCalEvent({type:'update', payload: calenderEvent});
        }
        else{
            dispatchCalEvent({type:'push', payload: calenderEvent});
        }
        setshowEventModal(false);
    }

    return (
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <span className='material-icons-outlined text-gray-400'>
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                             <span 
                             onClick={() => {
                                 dispatchCalEvent({type:"delete",payload:selectedEvent})
                                 setshowEventModal(false)
                             }}
                             className='material-icons-outlined text-gray-400 cursor-pointer'>
                             delete
                             </span>
                        )}
                        <button onClick={()=> setshowEventModal(false)}>
                        <span className='material-icons-outlined text-gray-400'>
                        close
                        </span>
                        </button>
                    </div>
                </header>
                <div className='p-3'>
                    <div className='grid grid-cols-1/5 items-end gap-y-7'>
                        <div></div>
                        <input typr="text" 
                            name="title" 
                            placeholder="Add a Title" 
                            value={title} 
                            required
                            className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                            onChange={(e)=>setTitle(e.target.value)}></input>
                             <span className='material-icons-outlined text-gray-500'>
                                schedule
                            </span>
                            <p>{daySelected.format("ddd , MMMM DD")}</p>
                            <span className='material-icons-outlined text-gray-500'>
                                segment
                            </span>
                            <input typr="text" 
                            name="description" 
                            placeholder="Add a Description" 
                            value={description} 
                            required
                            className='pt-3 border-0 text-gray-600  pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                            onChange={(e)=>setdescription(e.target.value)}></input>
                             <span className='material-icons-outlined text-gray-500'>
                                bookmark_border
                            </span>
                            <div className="flex gap-x-2">
                                {labelsClasses.map((lblClass,i)=>(
                                    <span key={i}
                                    onClick={()=>setselectedlabel(lblClass)}
                                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                    >
                                    {selectedlabel === lblClass && (
                                    <span className='material-icons-outlined text-white text-sm'>
                                        check
                                    </span> 
                                    )}
                                    </span>
                                ))}
                            </div>
                    </div>
                </div>
                <footer className='flex justify-end border-t p-3 mt-5'>
                    <button type="submit"
                     onClick={handleSubmit}
                     className='bg-blue-500 hover:bg-blue-800 px-6 py-2 rounded text-white'>
                        Save 
                    </button>

                </footer>
            </form>
        </div>
    )
}

export default EventModal
