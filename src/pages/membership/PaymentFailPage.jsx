import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paymentService } from "../../services/paymentService";

const PaymentFailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleFailure = async () => {
      const code = searchParams.get("code");
      const message = searchParams.get("message");
      const orderId = searchParams.get("orderId");

      try {
        await paymentService.handlePaymentFailure(code, message, orderId);
      } catch (error) {
        console.error("결제 실패 처리 중 오류:", error);
      }
    };

    handleFailure();
  }, [searchParams]);

  return (
    <div className="payment-result fail">
      <h2>결제에 실패했습니다</h2>
      <p>다시 시도해주세요.</p>
      <button onClick={() => navigate("/membership")}>
        멤버십 페이지로 돌아가기
      </button>
    </div>
  );
};

export default PaymentFailPage;
