import React from "react";
import MembershipPayment from "../../components/membership/MembershipPayment";
import "../../styles/membership/MembershipPage.css";

const MembershipPage = () => {
  return (
    <div className="membership-page">
      <h2>도서관 멤버십 가입</h2>
      <MembershipPayment />
    </div>
  );
};

export default MembershipPage;
