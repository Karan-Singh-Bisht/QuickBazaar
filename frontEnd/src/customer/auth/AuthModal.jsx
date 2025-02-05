import { Box, Modal } from "@mui/material";
import React from "react";
import RegisterForm from "./RegisterForm";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Responsive width
  maxWidth: 500, // Prevents being too large
  minWidth: 300, // Ensures usability on small screens
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: { xs: 2, sm: 4 }, // Smaller padding for small screens
};

const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {location.pathname === "/login" ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Modal>
  );
};

export default AuthModal;
