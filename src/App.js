import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './page/SignInPage';
import SignupPage from './page/SignUpPage';
import MyPage from './page/MyPage';
import RelationshipPage from './page/RelationshipPage';
import UserDetailPage from './page/UserDetailPage';
import axios from 'axios';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>SocialPlatform</h1>
          {user ? (
            <div>
              <Routes>
                <Route exact path="/" element={<MyPage user={user} />} />
                <Route path="/relationship" element={<RelationshipPage user={user} />} />
                <Route path="/user/:id" element={<UserDetailPage user={user} />} />
              </Routes>
            </div>
          ) : (
            showLogin ? (
              <div>
                <LoginPage onLoginSuccess={handleLoginSuccess} />
                <p>회원가입이 필요하신가요? <button onClick={toggleForm}>회원가입</button></p>
              </div>
            ) : (
              <div>
                <SignupPage />
                <p>이미 계정이 있으신가요? <button onClick={toggleForm}>로그인</button></p>
              </div>
            )
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;