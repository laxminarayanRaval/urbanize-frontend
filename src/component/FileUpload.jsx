import React, { useEffect, useState } from "react";
import { FileUploadOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton } from "@mui/material";

const FileUpload = () => {
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState("");

  const cloudinaryWidget = cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      sources: ["local", "url", "camera"],
      showAdvancedOptions: false,
      cropping: true,
      multiple: false,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#0078FF",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#0078FF",
          action: "#FF620C",
          inactiveTabIcon: "#0E2F5A",
          error: "#F44235",
          inProgress: "#0078FF",
          complete: "#20B832",
          sourceBg: "#E4EBF1",
        },
        width: '50vw',
        fonts: {
          default: null,
          "'DM Sans', sans-serif": {
            url: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700",
            active: true,
          },
        },
      },
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
      }
    }
  );

  const cloudinaryUploadHandler = () => {
    cloudinaryWidget.close({ quiet: true });
    cloudinaryWidget.open();
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <IconButton
        title="upload"
        onClick={cloudinaryUploadHandler}
        sx={(theme) => ({
          borderRadius: 1,
          justifyContent: "space-between",
          fontSize: "1rem",
          color: theme.palette.primary.main,
        })}
      >
        {false ? "File_Name.whatever" : "No File Chosen"}
        <FileUploadOutlined />
      </IconButton>
      <FormHelperText>
        An Image you would like to show to for your service.
      </FormHelperText>
    </FormControl>
  );
};

export default FileUpload;
