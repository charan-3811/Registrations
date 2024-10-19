import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', // New field added
        dateOfBirth: '',
        phoneNumber: '',
        address: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/signup', formData);
            if (response.status === 200) {
                navigate('/');
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed');
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Signup</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                <label style={labelStyle}>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                <label style={labelStyle}>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                <label style={labelStyle}>Date of Birth:</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                <label style={labelStyle}>Phone Number:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <label style={labelStyle}>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Register</button>
            </form>
        </div>
    );
}

export default Signup;

// Reused Styling from Login Component

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
   
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
    color: 'black',
    backgroundColor: 'white',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid',
    marginBottom: '1rem',
};

const labelStyle = {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '0.5rem',
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
    color: 'blue',
    marginBottom: '1.5rem',
};
