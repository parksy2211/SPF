import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetailPage = ({ user }) => {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [relationshipScore, setRelationshipScore] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/${id}`);
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        const fetchRelationshipScore = async () => {
            try {
                const response = await axios.post('http://localhost:3001/api/calculateRelationshipScore', {
                    userId: user._id,
                    followId: id,
                });
                setRelationshipScore(response.data.score);
            } catch (error) {
                console.error('Error calculating relationship score:', error);
            }
        };

        fetchUserInfo();
        fetchRelationshipScore();
    }, [id, user._id]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <h2>{userInfo.username}'s Profile</h2>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
            <p><strong>Major Interest:</strong> {userInfo.majorInterest}</p>
            <p><strong>Current Position:</strong> {userInfo.currentPosition}</p>
            {userInfo.profileImg && (
                <div>
                    <strong>Profile Image:</strong>
                    <img src={`http://localhost:3001/uploads/${userInfo.profileImg}`} alt="Profile" style={styles.image} />
                </div>
            )}
            {relationshipScore !== null && <p><strong>Relationship Score:</strong> {relationshipScore}</p>}
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

export default UserDetailPage;