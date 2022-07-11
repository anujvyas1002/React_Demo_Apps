import React,{useState} from "react";
import MuiAppBar from "@mui/material/AppBar";
import { Box, Grid,Toolbar,IconButton,Typography ,Menu,Container,Button,MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Admin Portal
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages?.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
              {!!user && (
                <MenuItem key={"logout"} onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Employees
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages?.map((page) => (
              <Grid key={page.label}>
                <Button
                  onClick={() => handleCloseNavMenu(page.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              </Grid>
            ))}
            {!!user && (
              <Grid container justifyContent="flex-end" alignItems="center">
                <Button
                  key={"logout"}
                  onClick={logout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {"logout"}
                </Button>
              </Grid>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
