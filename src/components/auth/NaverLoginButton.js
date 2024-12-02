import React from "react";

const NaverLoginButton = () => {
  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  return (
    <button
      onClick={handleNaverLogin}
      className="w-full bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2"
    >
      <img src="/naver-logo.png" alt="Naver" className="w-6 h-6" />
      네이버로 시작하기
    </button>
  );
};

export default NaverLoginButton;
