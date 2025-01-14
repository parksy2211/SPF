import { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        profileImg: null,
        majorInterest: '',
        currentPosition: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImg') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            await axios.post('/api/register', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('회원가입 성공!');
        } catch (error) {
            console.error('회원가입 실패:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="text"
                name="majorInterest"
                placeholder="Major Interest"
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="text"
                name="currentPosition"
                placeholder="Current Position"
                onChange={handleChange}
                style={styles.input}
            />
            <input
                type="file"
                name="profileImg"
                placeholder="Profile Image"
                onChange={handleChange}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Sign Up</button>
        </form>
    );
};

// CSS 스타일
const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column', // 세로 배치
        alignItems: 'center',
        gap: '10px', // 입력 필드 간격
        maxWidth: '400px', // 폼 너비 제한
        margin: '0 auto', // 가운데 정렬
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
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
    },
};

export default SignupPage;
