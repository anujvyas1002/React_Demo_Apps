import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { Navbar } from './components/Navbar';
import { EmployeeTable } from './pages/ManageEmployees/EmployeeTable';
import { SkillTable } from './pages/ManageSkills/SkillTable';
import { RolesTable } from './pages/ManageRoles/RolesTable';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route  path="/manageEmployees" element={<EmployeeTable />}></Route>
                        <Route  path="/manageRoles" element={<RolesTable />}></Route>
                        <Route  path="/manageSkills" element={<SkillTable />}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
