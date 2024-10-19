import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'; 

function Login() {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const [incorrect, setIncorrect] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User Details:", userDetails);
        try {
            const response = await axios.post(`http://localhost:4000/userLogin`, userDetails);
            if (response.status === 200) {
                navigate('/dashboard');
            } else if (response.data === 'wrong details') {
                setIncorrect(true);
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <div style={loginContainer}>
            <h1 style={headingStyle}>Login</h1>
            {incorrect && <p style={errorMessageStyle}>Wrong credentials</p>}
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={userDetails.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    style={inputStyle}
                />
                <label style={labelStyle}>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={userDetails.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Login</button>
                <p>New user? <Link to={'/signup'}>Register</Link> </p>
            </form>
        </div>
    );
}

export default Login;

// Styling Objects

const loginContainer = {
    display: 'flex',
    flexDirection:'column',
   
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #444',
    borderRadius: '16px',
    padding: '2rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
};

const inputStyle = {
    marginBottom: '1rem',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    transition: 'border 0.2s ease-in-out',
};



const labelStyle = {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#444',
};

const buttonStyle = {
    padding: '0.8rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#646cff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

const headingStyle = {
    color: '#333',
    marginBottom: '1.5rem',
};

const errorMessageStyle = {
    color: 'red',
    marginBottom: '1rem',
    fontWeight: 'bold',
};
