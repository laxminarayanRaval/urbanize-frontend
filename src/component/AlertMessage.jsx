import React from "react";
import { useSelector } from "react-redux";
import { Alert, Collapse, IconButton, Stack } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const AlertMessage = () => {
  const [open, setOpen] = React.useState(true);
  const { message } = useSelector((state) => state.message);
    // console.log(message);

    React.useEffect(() => {
        setTimeout(()=>{
            setOpen(false)
        }, 10000);
      }, [message]);

  if (!message) return <></>;

  if (message)
    return (
      <Stack
        sx={{
          width: "100%",
          zIndex: "100",
          position: "fixed",
          m: "8%",
          maxWidth: "fit-content",
        }}
        spacing={2}
      >
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="error"
          >
            {message}
          </Alert>
        </Collapse>
      </Stack>
    );
};

export default AlertMessage;
