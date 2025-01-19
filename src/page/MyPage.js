import React from 'react';

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
                    <img src={`http://localhost:3000/uploads/${user.profileImg}`} alt="Profile" style={styles.image} />
                </div>
            )}
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
};

export default MyPage;