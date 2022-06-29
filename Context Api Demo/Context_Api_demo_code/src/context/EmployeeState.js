import { useState } from 'react'
import EmployeeContext from './employeeContext'

export const EmployeeState = (props) => {
    const s1 = {
        "name":"anuj",
        "class":"3rd year"
    }
    const [state,setState]=useState(s1);

    const update = () =>{
            setState({
                "name":"anand",
                "class":"final year"
            })
    }
  return (
    <div>
        <EmployeeContext.Provider value={{state,update,s1}}>
            {props.children}
        </EmployeeContext.Provider>
    </div>
  )
}
