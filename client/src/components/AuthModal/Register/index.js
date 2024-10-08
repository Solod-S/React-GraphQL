import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { FormattedMessage } from "react-intl";
import { AppContext } from "../../../providers/appContext";
import { useCustomNotification } from "../../../hooks/useCustomNotification";

import { SIGN_UP_MUTATION } from "../queries";
import logoSvg from "../../../assets/logo.webp";

const Card = styled(MuiCard)(({ theme }) => ({
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const Register = ({ setMode, setOpenAuthModal }) => {
  const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION);
  const { dispatch } = useContext(AppContext);
  const { showNotification, NotificationComponent } = useCustomNotification();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const password = data.get("password");
      const name = data.get("name");
      console.log({
        name: data.get("name"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      });

      try {
        const result = await signUp({
          variables: { email, password, name },
        });
        console.log("Registration successful:", result);

        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("name").value = "";
        showNotification("User was successfully created.", "success", 3000, {
          vertical: "top",
          horizontal: "left",
        });

        result.data.signUp &&
          dispatch({ type: "setUser", user: result.data.signUp });
        setOpenAuthModal(false);
      } catch (err) {
        console.error("Registration error:", err.message);
        showNotification(err.message, "error", 3000, {
          vertical: "top",
          horizontal: "left",
        });
      }
    }
  };

  return (
    <>
      {NotificationComponent}
      <Card variant="outlined">
        <Box
          component="img"
          sx={{
            width: "70%",
            margin: "auto",
          }}
          alt="No images."
          src={logoSvg}
        />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          <FormattedMessage id="auth.register" />
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">
              <FormattedMessage id="auth.fullName" />
            </FormLabel>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Jon Snow"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">
              {" "}
              <FormattedMessage id="auth.email" />
            </FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">
              <FormattedMessage id="auth.password" />
            </FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? "error" : "primary"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            sx={{
              backgroundColor: "#282F3D",
              "&:hover": {
                backgroundColor: "#3A4455",
              },
            }}
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            <FormattedMessage id="auth.registerFooterMessage" />{" "}
            <span
              style={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => setMode("SignIn")}
            >
              <FormattedMessage id="auth.login" />
            </span>
          </Typography>
        </Box>
      </Card>
    </>
  );
};

Register.propTypes = {
  setMode: PropTypes.func.isRequired,
  setOpenAuthModal: PropTypes.func.isRequired,
};

export default Register;
