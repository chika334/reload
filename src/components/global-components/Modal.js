// import React from "react";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogActions from "@material-ui/core/DialogActions";
// import Dialog from "@material-ui/core/Dialog";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
// import FormControlLabel from "@material-ui/core/FormControlLabel";

// const options = [
//   "None",
//   "Atria",
//   "Callisto",
//   "Dione",
//   "Ganymede",
//   "Hangouts Call",
//   "Luna",
//   "Oberon",
//   "Phobos",
//   "Pyxis",
//   "Sedna",
//   "Titania",
//   "Triton",
//   "Umbriel",
// ];

// function ConfirmationDialogRaw(props) {
//   const { onClose, value: valueProp, open, ...other } = props;
//   const [value, setValue] = React.useState(valueProp);
//   const radioGroupRef = React.useRef(null);

//   React.useEffect(() => {
//     if (!open) {
//       setValue(valueProp);
//     }
//   }, [valueProp, open]);

//   const handleEntering = () => {
//     if (radioGroupRef.current != null) {
//       radioGroupRef.current.focus();
//     }
//   };

//   const handleCancel = () => {
//     onClose();
//   };

//   const handleOk = () => {
//     onClose(value);
//   };

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   return (
//     <Dialog
//       disableBackdropClick
//       disableEscapeKeyDown
//       maxWidth="xs"
//       onEntering={handleEntering}
//       aria-labelledby="confirmation-dialog-title"
//       open={open}
//       {...other}
//     >
//       <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
//       <DialogContent dividers>
//         <RadioGroup
//           ref={radioGroupRef}
//           aria-label="ringtone"
//           name="ringtone"
//           value={value}
//           onChange={handleChange}
//         >
//           {options.map((option) => (
//             <FormControlLabel
//               value={option}
//               key={option}
//               control={<Radio />}
//               label={option}
//             />
//           ))}
//         </RadioGroup>
//       </DialogContent>
//       <DialogActions>
//         <Button autoFocus onClick={handleCancel} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleOk} color="primary">
//           Ok
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// ConfirmationDialogRaw.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   value: PropTypes.string.isRequired,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
//   paper: {
//     width: "80%",
//     maxHeight: 435,
//   },
// }));

// export default function ConfirmationDialog() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("Dione");

//   const handleClickListItem = () => {
//     setOpen(true);
//   };

//   const handleClose = (newValue) => {
//     setOpen(false);

//     if (newValue) {
//       setValue(newValue);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <List component="div" role="list">
//         <ListItem button divider disabled role="listitem">
//           <ListItemText primary="Interruptions" />
//         </ListItem>
//         <ListItem
//           button
//           divider
//           aria-haspopup="true"
//           aria-controls="ringtone-menu"
//           aria-label="phone ringtone"
//           onClick={handleClickListItem}
//           role="listitem"
//         >
//           <ListItemText primary="Phone ringtone" secondary={value} />
//         </ListItem>
//         <ListItem button divider disabled role="listitem">
//           <ListItemText
//             primary="Default notification ringtone"
//             secondary="Tethys"
//           />
//         </ListItem>
//         <ConfirmationDialogRaw
//           classes={{
//             paper: classes.paper,
//           }}
//           id="ringtone-menu"
//           keepMounted
//           open={open}
//           onClose={handleClose}
//           value={value}
//         />
//       </List>
//     </div>
//   );
// }

// import React, { Component } from "react";
// import AdSense from "react-adsense";
// // import { render } from "react-dom";
// // import {
// //   Advertisement,
// //   Container,
// //   Divider,
// //   Header,
// //   Icon,
// //   Message,
// // } from "semantic-ui-react";

// // class BasicAd extends Component {
// //   componentDidMount() {
// //     (window.adsbygoogle = window.adsbygoogle || []).push({});
// //   }

// //   render() {
// //     return (
// //       <ins
// //         className="adsbygoogle"
// //         data-ad-client="ca-pub-4591861188995436"
// //         data-ad-slot="4640466102"
// //         style={{ display: "inline-block", height: 250, width: 300 }}
// //       />
// //     );
// //   }
// // }

// export const Modals = () => (
//   <>
//     <AdSense.Google client="ca-pub-7292810486004926" slot="7806394673" />
//     {/* // ads with custom format */}
//     <AdSense.Google
//       client="ca-pub-7292810486004926"
//       slot="7806394673"
//       style={{ width: 500, height: 300, float: "left" }}
//       format=""
//     />
//     {/* // responsive and native ads */}
//     <AdSense.Google
//       client="ca-pub-7292810486004926"
//       slot="7806394673"
//       style={{ display: "block" }}
//       layout="in-article"
//       format="fluid"
//     />
//     {/* // auto full width responsive ads */}
//     <AdSense.Google
//       client="ca-pub-7292810486004926"
//       slot="7806394673"
//       style={{ display: "block" }}
//       format="auto"
//       responsive="true"
//       layoutKey="-gw-1+2a-9x+5c"
//     />
//   </>
// );

// export default Modals;

// // render(<App />, document.getElementById("root"));

// import React from "react";
// import AdSense from "react-adsense";

// export class Modals extends React.Component {
//   componentDidMount() {
//     const installGoogleAds = () => {
//       const elem = document.createElement("script");
//       elem.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
//       elem.async = true;
//       elem.defer = true;
//       document.body.insertBefore(elem, document.body.firstChild);
//     };
//     installGoogleAds();
//   }

//   render() {
//     return (
//       <AdSense.Google
//         client="ca-pub-3236992787867833"
//         slot="1686195266"
//         style={{ display: "block" }}
//         format="auto"
//         responsive="true"
//       />
//     );
//   }
// }

// export default Modals;
