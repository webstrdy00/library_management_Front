import React from "react";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-sm text-gray-600">
            서비스를 이용하시려면 로그인해주세요
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* 일반 로그인 폼이 있다면 여기에 구현 */}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <KakaoLoginButton />
            <NaverLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
