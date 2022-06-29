/* eslint-disable react-hooks/exhaustive-deps */
import React,{useContext} from 'react'
import employeeContext from '../context/employeeContext'

const AddEmployee = () => {
    const a = useContext(employeeContext)
    // useEffect(()=>{
    //     a.update();
    // },[])
    
  return (
    <div>
        This is About {a.state.name} and he is in class {a.state.class}
        <button onClick={a.update} className="btn">update</button>
    </div>
  )
}

export default AddEmployee
