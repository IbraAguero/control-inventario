import {
  Box,
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
  useTheme,
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
import { AuthContext } from "../login/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import FormUser from "./FormUser";
import FormUpdatePassword from "./FormUpdatePassword";

const Topbar = () => {
  const [openUpdatePasswordDialog, setOpenUpdatePasswordDialog] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const userRole = localStorage.getItem("userRole");
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
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

  const handleCreateUser = () => {
    setOpenDialog(true); // Abrir el diálogo de alta de usuarios
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Cerrar el diálogo de alta de usuarios
    setErrorMessage("");
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleUpdatePassword = () => {
    setOpenUpdatePasswordDialog(true);
    handleClose(); // Cerrar el menú desplegable
  };

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
            <MuiMenuItem onClick={handleUpdatePassword}>
              Cambiar contraseña
            </MuiMenuItem>
            <MuiMenuItem onClick={handleLogout}>Cerrar sesión</MuiMenuItem>
            {userRole === "admin" && (
              <MuiMenuItem onClick={handleCreateUser}>
                Crear usuario
              </MuiMenuItem>
            )}
          </Menu>
        </div>
      </Box>
      <FormUser openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
      <FormUpdatePassword
        openDialog={openUpdatePasswordDialog}
        handleCloseDialog={setOpenUpdatePasswordDialog}
      />
    </Box>
  );
};

export default Topbar;
