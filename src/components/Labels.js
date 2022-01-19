import React, { useContext,useState } from 'react'
import GlobalContext from '../context/GlobalContext'

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
  ];


function Labels() {
    const {labels,updateLabel,selectedEvent} = useContext(GlobalContext);
    const [setselectedlabel]=useState(
        selectedEvent ? labelsClasses.find((lbl)=>lbl === selectedEvent.label):labelsClasses[0] 
        );
    return (
      <React.Fragment>
          <p className='text-gray-500 font-bold mt-5'>
              Your Labels
          </p>
          {labels.map(({label:lbl,checked},idx)=>(
              <label key={idx} className='items-center mt-3 block'>
                  <input type="checkbox" checked={checked}
                  onChange={()=> updateLabel({label:lbl,checked: !checked})}
                  className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`} />
                  <span className={`ml-3 m-2 p-1 bg-${lbl}-200 w-5 h-5 squared-full text-black-400`}>{lbl}</span>
              </label>
          ))}
          <div>
              <p className='mt-10 text-gray-500 font-bold '> All Labels</p>

              <div className="flex gap-x-2 mt-5">
                                {labelsClasses.map((lblClass,i)=>(
                                    <span key={i}
                                    onClick={()=>setselectedlabel(lblClass)}
                                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                    >
                                    
                                    <span className='material-icons-outlined text-white text-sm'>
                                        check
                                    </span> 
                    
                                    </span>
                                ))}
                </div>

          </div>
      </React.Fragment>

    )
}

export default Labels
