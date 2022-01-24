import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Department } from './pages/Department'
import { Employee } from './pages/Employee'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">React js</h3>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/department"
              >
                Department
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/employee"
              >
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
