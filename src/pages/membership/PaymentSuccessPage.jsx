import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paymentService } from "../../services/paymentService";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentResult, setPaymentResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // AbortController 인스턴스 생성
    const abortController = new AbortController();

    const confirmPayment = async () => {
      try {
        const paymentKey = searchParams.get("paymentKey");
        const orderId = searchParams.get("orderId");
        const amount = searchParams.get("amount");

        console.log("Payment confirmation started:", {
          paymentKey,
          orderId,
          amount,
        });

        // signal을 요청에 전달
        const response = await paymentService.confirmPayment(
          paymentKey,
          orderId,
          parseInt(amount),
          abortController.signal
        );

        // 요청이 취소되지 않았을 때만 상태 업데이트
        if (!abortController.signal.aborted) {
          console.log("Payment confirmation completed:", response);
          setPaymentResult(response.data);
        }
      } catch (error) {
        // 요청이 취소되지 않았을 때만 에러 처리
        if (!abortController.signal.aborted) {
          console.error("Payment confirmation failed:", error);
          setError(
            error.response?.data?.message || "결제 처리 중 오류가 발생했습니다."
          );
        }
      } finally {
        // 요청이 취소되지 않았을 때만 로딩 상태 업데이트
        if (!abortController.signal.aborted) {
          setIsProcessing(false);
        }
      }
    };

    confirmPayment();

    // cleanup 함수
    return () => {
      abortController.abort();
    };
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="payment-processing">
        <h2>결제 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-error">
        <h2>결제 처리 중 오류가 발생했습니다</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate("/membership")}
          className="error-button"
        >
          멤버십 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="payment-success">
      <h2>결제가 완료되었습니다!</h2>
      {paymentResult && (
        <div className="payment-details">
          <p>결제금액: {paymentResult.amount?.toLocaleString()}원</p>
          <p>주문번호: {paymentResult.orderId}</p>
          <p>결제상태: {paymentResult.status}</p>
        </div>
      )}
      <button onClick={() => navigate("/mypage")} className="success-button">
        마이페이지로 이동
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
