import api from "./api";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

export const paymentService = {
  // 결제 요청 생성
  requestPayment: async () => {
    try {
      const { data } = await api.post(
        `${API_BASE_URL}/library/payments/request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("결제 요청 생성 실패:", error);
      throw error;
    }
  },

  confirmPayment: async (paymentKey, orderId, amount, signal) => {
    try {
      const response = await api.post("/library/payments/confirm", null, {
        params: { paymentKey, orderId, amount },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal, // AbortController의 signal 전달
      });
      return response;
    } catch (error) {
      if (error.name === "AbortError") {
        // 요청이 취소된 경우 조용히 처리
        console.log("Payment confirmation request aborted");
        return;
      }
      throw error;
    }
  },

  // 결제 실패 처리
  handlePaymentFailure: async (code, message, orderId) => {
    try {
      const { data } = await api.get(`${API_BASE_URL}/library/payments/fail`, {
        params: { code, message, orderId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return data;
    } catch (error) {
      console.error("결제 실패 처리 중 오류:", error);
      throw error;
    }
  },
};
