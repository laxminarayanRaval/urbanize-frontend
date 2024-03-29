import React from "react";
import { useSelector } from "react-redux";
import { Alert, Collapse, IconButton, Slide, Snackbar, Stack } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}
const AlertMessage = () => {
  const [open, setOpen] = React.useState(true);
  const [transition, setTransition] = React.useState(undefined);
  const { message } = useSelector((state) => state?.message);
  // console.log(message);

  // const handleClick = (Transition) => () => {
  //   setTransition(() => Transition);
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    // setTimeout(() => {
    // setOpen(false);
    // }, 10000);
    setTransition(() => TransitionUp);
    setOpen(true);
  }, [message]);

  if (!message) return <></>;

  if (message)
    return (
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message={message}
        key={transition ? transition.name : ""}
      />
    );
};
// {/* <Stack sx={{ width: "100%", zIndex: "100", position: "fixed", m: "8%", maxWidth: "fit-content", }} spacing={2} > */}
//   {/* <Collapse in={open}> */}
//     {/* <Alert
//       action={
//         <IconButton
//           aria-label="close"
//           color="inherit"
//           size="small"
//           onClick={() => {
//             setOpen(false);
//           }}
//         >
//           <CloseIcon fontSize="inherit" />
//         </IconButton>
//       }
//       severity="error"
//     >
//       {message}
//     </Alert> */}

//   {/* </Collapse> */}
// {/* </Stack> */}

export default AlertMessage;
