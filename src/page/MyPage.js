import React from 'react';
import { Link } from 'react-router-dom';

const MyPage = ({ user }) => {
    return (
        <div style={styles.container}>
            <h2>My Page</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p><strong>Major Interest:</strong> {user.majorInterest}</p>
            <p><strong>Current Position:</strong> {user.currentPosition}</p>
            {user.profileImg && (
                <div>
                    <strong>Profile Image:</strong>
                    <img src={`https://5822-14-50-224-247.ngrok-free.app/${user.profileImg}`} alt="Profile" style={styles.image} />
                </div>
            )}
            <Link to="/relationship">
                <button style={styles.button}>Go to Relationship Page</button>
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
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginTop: '10px',
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
        marginTop: '20px',
    },
};

export default MyPage;