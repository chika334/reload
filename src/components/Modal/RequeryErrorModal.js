import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { DialogTitle, Button } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { useSelector, useDispatch } from "react-redux";
import { requery } from "../../_action/requery";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RequeryErrorModal(props) {
  const { open, setRequeryErrorModal, errorMessage, setLoading } = props;
  const dispatch = useDispatch();
  const paymentDone = useSelector((state) =>
    state.paymentDone.detail === null ? "" : state.paymentDone.detail
  );
  const someData = useSelector((state) =>
    state.someData.detail === null ? "" : state.someData.detail.detail
  );
  const intent = useSelector((state) =>
    state.paymentIntent.success === true
      ? state.paymentIntent.detail.result
      : ""
  );
  const intentTransRef = useSelector((state) =>
    state.paymentIntent.success === true
      ? state.paymentIntent.detail.transRef
      : ""
  );

  const handleClose = () => {
    setRequeryErrorModal(false);
  };

  const handleQuery = (e) => {
    e.preventDefault();
    const value = {
      transRef: intentTransRef,
    };

    setLoading(true);

    dispatch(requery(value));
  };

  // console.log(paymentDone);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Transaction Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b style={{ color: "red" }}>
              {/* Sorry an error occurred while completing this transaction, please
              requery transaction */}
              {errorMessage}
            </b>
            <div>
              <table className="center">
                {/* <tr>
                <td>Email: </td>
                <td>{paymentDone.email}</td>
              </tr>
              <tr>
                <td>Phone Number: </td>
                <td>{paymentDone.customerId}</td>
              </tr> */}
                <tr>
                  <td className="pr-5">Transaction Reference: </td>
                  <td>{intentTransRef}</td>
                </tr>
                <tr>
                  <td>Amount: </td>
                  <td>{intent.totalAmount}</td>
                </tr>
                <tr>
                  <td>Product Name: </td>
                  <td>{someData.productId.productname}</td>
                </tr>
              </table>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleQuery} color="primary">
            Requery
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
