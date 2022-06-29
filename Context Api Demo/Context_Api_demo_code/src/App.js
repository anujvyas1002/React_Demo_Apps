
import AddEmployee from './components/AddEmployee'
import { EmployeeState } from './context/EmployeeState';

function App() {
  return (
    <div >
      <EmployeeState>
         <AddEmployee/>
      </EmployeeState>
    
    </div>
  );
}

export default App;
