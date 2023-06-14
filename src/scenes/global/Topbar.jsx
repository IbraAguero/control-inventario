import {
  Box,
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
/* import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'; */
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem as ProSidebarMenuItem } from "react-pro-sidebar";
import { AuthContext } from "../login/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const userRole = localStorage.getItem('userRole');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const { isAuthenticated, setAuthentication } = useContext(AuthContext);
  const handleLogout = () => {
    handleClose(); // Cerramos el menú
    localStorage.removeItem("isAuthenticated");
    setAuthentication(false);
    navigate("/");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar la solicitud POST para crear un nuevo usuario
    fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setUsername("");
          setPassword("");
          setErrorMessage("");
          alert("Usuario creado exitosamente");
          handleCloseDialog();
        }
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
      })
  };

  const handleCreateUser = () => {
    setOpenDialog(true); // Abrir el diálogo de alta de usuarios
    console.log(username);
    console.log("handleCreateUser");
    if (username === "admin") {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Cerrar el diálogo de alta de usuarios
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Buscar" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <div>
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <PersonOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MuiMenuItem onClick={handleLogout}>Cerrar sesión</MuiMenuItem>
            {userRole === "admin" && (
              <MuiMenuItem onClick={handleCreateUser}>
                Crear usuario
              </MuiMenuItem>
            )}
          </Menu>
        </div>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullScreen={isSmallScreen}
        fullWidth
      >
        <DialogTitle>Alta de usuario</DialogTitle>
        <DialogContent>
          {errorMessage && <p>{errorMessage}</p>}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Nombre de usuario"
              value={username}
              onChange={handleUsernameChange}
              fullWidth
            />
          </Box>
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Topbar;
