import { Avatar, Box, Grid, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import logoIcon from "../assets/logo.svg";
import searchIcon from "../assets/search.svg";
import notificationIcon from "../assets/notification.svg";
import { useState } from "react";
import useAuth from "./../hooks/useAuth";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const { userName } = useAuth();
  const dispatch = useDispatch();
  const settings = [
    {
      label: "Logout",
      func: () => dispatch(logOut()),
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
      }}
    >
      <Grid gap={3} container alignItems={"center"}>
        <img src={logoIcon} alt="logo" />
        <TextField
          size="small"
          style={{ color: "white" }}
          variant="standard"
          placeholder="Search for any training you want "
          sx={{ width: "300px", input: { color: "white" } }}
          InputProps={{
            disableUnderline: true,
            startAdornment: <img src={searchIcon} alt="search" style={{ marginRight: "12px" }} />,
          }}
        />
      </Grid>

      <Grid gap={3} container alignItems={"center"} justifyContent={"flex-end"}>
        <IconButton>
          <img src={notificationIcon} alt="logo" />
        </IconButton>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userName} src="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={setting.func}>
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Grid>
    </Box>
  );
};
export default Navbar;
