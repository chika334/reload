import React from "react";

export default function LoanStatus(props) {
  return (
    <div className="pd-bottom-100 footer-area">
      <h3 className="text-center">Want to get a Loan?</h3>
      <div className="d-flex justify-content-center">
        <div className="container mt-2 text-left">
            <p>Step 1: if your a registered customer then you can login else please register.</p>
            <p>Step 2: After registering you will be redirected to the home page, at the navigation bar of the website, you will see “OUR PRODUCTS”, click on it</p>
            <p>Step 3: when the page loads you will see six(6) buttons just below a header labeled Products, the last button is for our loan product.</p>
            <p>Step 4: The loan page will load and a form will be presented to you, you are to input the requested amount and the phone number connected to your bank.</p>
            <p>Step 5: Once submitted a popup shows displaying all offers from different lenders and details of the offers. Then select an offer by clicking “ACCEPT OFFER” button</p>
            <p>Step 6: you are then redirected to a new page that shows the amount you have been offered, amount to be paid back and the lenders name, then a form below to input your account number and a drop down to select your bank</p>
            <p>Step 7: After inputting that, you will be redirected to a different page where your card details will be collected and otp confirmation will be done before the money is sent to your account.</p>
        </div>
      </div>
    </div>
  );
}
