import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allUsers');
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/deleteUser/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            console.log(`User with ID ${id} deleted`);
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
        }
    };

    return (
        <div style={dashboardStyle}>
            <h1>Users</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} style={trStyle}>
                            <td style={tdStyle}>{user.Name}</td>
                            <td style={tdStyle}>{user.Email}</td>
                            <td style={tdStyle}>
                                <button style={buttonStyle} onClick={() => handleDelete(user.ID)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;

const dashboardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
    backgroundColor: '#f5f5f5',
    height: '100vh',
    padding: '20px',
};

const tableStyle = {
    width: '80%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
};

const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
};

const trStyle = {
    '&:nth-child(even)': { backgroundColor: '#f2f2f2' }, // Alternating row colors
};

const tdStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

const buttonStyle = {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
    backgroundColor: '#e60000',
};
