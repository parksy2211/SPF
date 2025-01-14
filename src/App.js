import { useState } from 'react';
import './App.css';
import LoginPage from './page/SignInPage'; // 로그인 컴포넌트 임포트
import SignupPage from './page/SignUpPage'; // 회원가입 컴포넌트 임포트

function App() {
  const [showLogin, setShowLogin] = useState(true); // 로그인 화면을 기본으로 보이게 설정

  const toggleForm = () => {
    setShowLogin(!showLogin); // 버튼 클릭 시 화면을 전환
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SocialPlatform</h1>
        {showLogin ? (
          <div>
            <LoginPage />
            <p>회원가입이 필요하신가요? <button onClick={toggleForm}>회원가입</button></p>
          </div>
        ) : (
          <div>
            <SignupPage />
            <p>이미 계정이 있으신가요? <button onClick={toggleForm}>로그인</button></p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
