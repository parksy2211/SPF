import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/login', formData);
            alert('로그인 성공!');
            // 메인 페이지로 리디렉션
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
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
            <button type="submit" style={styles.button}>
                Login
            </button>
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

export default LoginPage;
