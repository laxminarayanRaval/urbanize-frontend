import React, { useEffect, useState } from "react";
import { FileUploadOutlined } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  useTheme,
} from "@mui/material";

const FileUpload = ({ getImageData, folderName, ...props }) => {
  const initialValue = {
    name: "",
    secure_url: "",
  };

  const [imgData, setImgData] = useState(initialValue);

  useEffect(() => {
    if (JSON.stringify(imgData) !== JSON.stringify(initialValue)) {
      console.log(
        "--------------------------------\n",
        " Image Name: " + imgData.name,
        "\n Secure URL: " + imgData.secure_url,
        "\n--------------------------------"
      );
      getImageData(imgData);
    }
  }, [imgData]);

  const theme = useTheme();

  const customPalette = {
    action: theme.palette.secondary.main,
    complete: theme.palette.success.main,
    error: theme.palette.error.main,
    inProgress: theme.palette.primary.main,
    inactiveTabIcon: theme.palette.primary.dark,
    link: theme.palette.primary.dark,
    menuIcons: theme.palette.primary.light,
    sourceBg: theme.palette.background.default,
    tabIcon: theme.palette.primary.light,
    textDark: theme.palette.text.primary,
    textLight: theme.palette.text.primary,
    window: theme.palette.background.paper,
    windowBorder: theme.palette.primary.main,
  };

  const makeCloudinaryWidget = () => window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      sources: ["local", "url", "camera"],
      showAdvancedOptions: false,
      cropping: false,
      multiple: false,
      defaultSource: "local",
      resourceType: "image",
      folder: `/id-${folderName}/`,
      styles: {
        palette: { ...customPalette },
        frame: {
          background: theme.palette.mode == "dark" ? "#EEE5" : "#3335",
        },
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

        setImgData({
          name: `${result.info.original_filename}.${result.info.format}`,
          secure_url: `${result.info.secure_url}`,
        });
      }
    }
  );

  const cloudinaryUploadHandler = () => {
    const cloudinaryWidget = makeCloudinaryWidget();
    // cloudinaryWidget.close({ quite: true });
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
        {imgData?.name ? imgData?.name : "No File Chosen"}
        <FileUploadOutlined />
      </IconButton>
      <FormHelperText>
        An Image you would like to show to for your service.
      </FormHelperText>
    </FormControl>
  );
};

export default FileUpload;
