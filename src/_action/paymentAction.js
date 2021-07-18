import { PAYBUTTON } from "./types";

export const paymentButton = () => {
  return {
    type: PAYBUTTON,
  };
};

// export const payment = () => {

//   const body = {
//     "publicKey": "publicKey",
//     "logoURL": "https://api.elasticemail.com/userfile/5d028e25-bd86-4559-b7c2-31e5870bbbf9/accessnew.jpg",
//     "transactionId": "transactionId",
//     "amount": 100,
//     "currency": "NGN",
//     "country": "NG",
//     "email": "abdussamad.olaiya@xpresspayments.com",
//     "phoneNumber": "07063762229",
//     "firstName": "Aminu",
//     "lastName": "Cincin",
//     "hash": "",
//     "meta": [{
//   "metaName": "DSTV NUMBER",
//    "metaValue": "075632148963"
// }],
//  "callbackUrl":"https://www.sample.xpresspayments.com/resp"
// } 
//xpressPayonlineSetup(body)
// }