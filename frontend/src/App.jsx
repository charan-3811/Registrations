import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {

    return (
        <div style={{width:'100vw'}}>
        
            <Router>
              
                <Routes>
                  
                  <Route path={"/"} element={<Login />} />
                  <Route path="/signup" element={<Signup /> } />
                  <Route path='/dashboard' element={<Dashboard />} />
                
                </Routes>
            </Router>
      
        </div>
    );
}

export default App;
