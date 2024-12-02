import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰 파라미터 추출
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", token);

      // Authorization 헤더에 토큰 설정
      if (token) {
        localStorage.setItem("accessToken", `Bearer ${token}`);
      }

      // 메인 페이지로 리다이렉트
      navigate("/");
    } else {
      // 토큰이 없는 경우 로그인 페이지로 리다이렉트
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default OAuthCallback;
