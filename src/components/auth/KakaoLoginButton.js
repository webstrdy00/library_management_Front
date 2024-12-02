import React from "react";

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full bg-yellow-300 text-slate-800 hover:bg-yellow-400 py-2 px-4 rounded-lg flex items-center justify-center gap-2"
    >
      <img src="/kakao-logo.png" alt="Kakao" className="w-6 h-6" />
      카카오로 시작하기
    </button>
  );
};

export default KakaoLoginButton;
