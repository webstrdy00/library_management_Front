import React, { useState } from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { TOSS_CLIENT_KEY, MEMBERSHIP_CONFIG } from "../../constants/payment";
import { paymentService } from "../../services/paymentService";
import "../../styles/membership/MembershipPayment.css";

const MembershipPayment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // 1. 결제 요청 정보 생성
      const response = await paymentService.requestPayment();
      const paymentInfo = response.data;

      // 2. 토스페이먼츠 SDK 초기화
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);

      // 3. 결제창 호출
      await tossPayments.requestPayment("카드", {
        amount: paymentInfo.amount,
        orderId: paymentInfo.orderId,
        orderName: paymentInfo.orderName,
        successUrl: `${window.location.origin}/membership/success`,
        failUrl: `${window.location.origin}/membership/fail`,
      });
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
      alert("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="membership-payment">
      <div className="membership-info">
        <h3>멤버십 혜택</h3>
        <ul>
          <li>최대 대여 가능 도서: {MEMBERSHIP_CONFIG.MAX_RENTAL_BOOKS}권</li>
          <li>
            최대 예약 가능 기간: {MEMBERSHIP_CONFIG.MAX_RESERVATION_DAYS}일
          </li>
          <li>월 구독료: {MEMBERSHIP_CONFIG.MONTHLY_FEE.toLocaleString()}원</li>
        </ul>
      </div>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="payment-button"
      >
        {isLoading ? "처리중..." : "멤버십 가입하기"}
      </button>
    </div>
  );
};

export default MembershipPayment;
