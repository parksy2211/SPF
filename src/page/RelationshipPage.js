import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RelationshipPage = ({ user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/searchUsers', { params: { query: searchQuery } });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Search Users</h2>
            <input
                type="text"
                placeholder="Search Users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSearchUsers} style={styles.button}>Search</button>
            <ul>
                {searchResults.map((result) => (
                    <li key={result._id}>
                        <Link to={`/user/${result._id}`}>{result.username}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/">
                <button style={styles.button}>Go to My Page</button>
            </Link>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
        marginBottom: '10px',
    },
};

export default RelationshipPage;