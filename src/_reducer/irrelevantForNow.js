import React, { useState, useEffect } from "react";
import FormPay from "../reg/Pay/FormPay";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { showLoader, hideLoader } from "../../_action/loading";
import NewForm from "../Form/NewForm";
import { verifySmartcardNumber } from "../../_action/verifyNumber";

const formSchema = {
  smartCard: {
    type: "number",
    label: "SmartCard Number",
    placeholder: "Enter SmartCard Number",
    required: true,
  },
};

function Cable(props) {
  const [verified, setVerified] = useState(false);
  var verify = false;
  const [verifiedResponse, setVerifiedResponse] = useState(null);
  const [smartCard, setSmartCard] = useState("");
  const [smartBillerCode, setSmartBilerCode] = useState("");
  const user = useSelector((state) =>
    state.authUser.token === null ? "" : state.authUser.token
  );
  let result = {};
  const [detailValues, setDetailValues] = useState({
    values: {},
    mainValues: {
      description: "",
      amount: "",
      price: 0,
    },
  });
  const [selectDetails, setSelectDetails] = useState({
    id: "",
    amount: "",
    name: "",
  });

  // console.log(smartCard, smartBillerCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      props.location.state.productName === "Data" &&
      localStorage.token !== undefined
    ) {
      const data = {};
      // console.log(detailValues.datas, selectDetails);
      data.Email = detailValues.datas.Email;
      data.amount = selectDetails.amount;
      data.productId = props.location.state.productId;
      data.paymentMethod = "billpayflutter";
      data.description = "Data";
      data.channelRef = "web";

      const references = ["Phone Number", "Email", "Product type"];

      const referenceValues = {
        "Phone Number": detailValues.datas["Phone Number"],
        Email: detailValues.datas.Email,
        "Product type": selectDetails.name,
      };

      let newValuesObj = { ...data, references, referenceValues };

      props.Buydata(newValuesObj);
      props.pay(true, "Data");
    } else {
      if (!localStorage.token) {
        props.history.push("/reloadng/registration");
      }
    }
  };

  const handleProps = (datas) => {
    console.log(datas);
    setDetailValues({ ...detailValues, datas });
    // setVerified(datas.verified);
    setSmartCard(datas.smartCards);
    setSmartBilerCode(datas.billerCode);
    setVerified(datas.verifiedClicked);
    // if (datas.verifiedClicked === true) {
    //   setTimeout(() => {
    //     handleSubmitVerify();
    //   }, 300);
    // }
  };

  const handleSelect = (selectDetails) => {
    setSelectDetails({
      ...selectDetails,
      id: selectDetails.ItemType,
      amount: selectDetails.Amount,
      name: selectDetails.ItemName,
    });
  };

  const verifySmartNumber = async () => {
    const value = {
      billerCode: smartBillerCode,
      customerAccountNumber: smartCard,
    };

    // console.log(value);

    return await verifySmartcardNumber(value);
  };

  const handleSubmitVerify = async (e) => {
    let r = {};
    props.showLoader();
    await verifySmartNumber().then((res) => {
      r = res;
      // const details = Object.assign(result, res);
      result.response = res;
      // result = { res };
      console.log(res, r, result);
      // setVerify(true);
      // setTimeout(() => {
      //   Detailsverified();
      // }, 300);
    });
    // setVerifiedResponse(325453);
    console.log(verifiedResponse);
    props.hideLoader();
    // if (verify) {
    //   Detailsverified();
    // }
    /*  
    const result = await verifySmartNumber();
    console.log(result)
    if(result){
      console.log(setVerifiedResponse(325453))
      
      console.log(verifiedResponse)
    } */
    /*  try {
      setVerifiedResponse(result);

      setTimeout(() => {
        console.log(verify, result);
      }, 3000);
      // if (responseMessage === "Successful") {
      if (result.responseCode === "0") {
        setVerify(true);
        
        console.log(verify, verifiedResponse);
      } else {
        console.log("bad");
      }
    } catch (err) {
      // this.setState({ msg: err.response.data.msg });
      console.log(err);
    } */
  };

  const Detailsverified = () => {
    // console.log("fine by me");
    // setVerify(true);
    // verify = true;
    // console.log(verify);
  };

  if (verified) {
    // setVerified(false)
    setTimeout(() => {
      handleSubmitVerify();
    }, 300);
  }

  if (Object.keys(result).length !== 0) {
    // console.log(Object.keys(result).length !== 0);
    // verify = false;
    // return false
    verify = true;
  }

  const objectValue = Object.keys(result).length;
  console.log(objectValue);

  return (
    <div className="property-details-area">
      <form onSubmit={handleSubmit}>
        <NewForm
          onProp={(e) => handleProps(e)}
          verified={objectValue}
          handleSelect={handleSelect}
        />
        {objectValue !== 0 ? (
          <div className="d-flex align-item-center justify-content-center">
            <Button
              onSubmit={handleSubmit}
              type="submit"
              style={{
                backgroundColor: "#fda94f",
                color: "#000",
                fontSize: "12px",
                padding: "11px",
              }}
            >
              Proceed to payment
            </Button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default withRouter(
  connect(null, { verifySmartcardNumber, showLoader, hideLoader })(Cable)
);
