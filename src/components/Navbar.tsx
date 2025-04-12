'use client'


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Toolbar, IconButton, Select, MenuItem, Box, Badge, Typography, useMediaQuery, Drawer, List, ListItem, ListItemText, Menu, MenuItem as MuiMenuItem } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../assets/Bordo.png"; // Import the logo
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // User icon
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Logout icon

interface NavbarProps {
  logoText: string;
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { t, i18n } = useTranslation();
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Link to="/" style={{ flexGrow: 1 }}>
          <img src={logo} alt="Bordo Logo" style={{ width: isMobile ? "80px" : "120px" }} />
        </Link>

        {isMobile ? (
          <>
            {/* Mobile Menu Icon */}
            <IconButton edge="end" color="inherit" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            {/* Drawer for Mobile */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
              <Box sx={{ width: 250 }} role="presentation">
                {/* Close Icon */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                  <IconButton onClick={() => toggleDrawer(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <List>
                  <ListItem component={Link} to="/" onClick={() => toggleDrawer(false)}>
                    <ListItemText primary={t("navbar.home")} />
                  </ListItem>
                  <ListItem component={Link} to="/products" onClick={() => toggleDrawer(false)}>
                    <ListItemText primary={t("navbar.products")} />
                  </ListItem>
                  {
                    !isLoggedIn && (
                      <>
                        <ListItem component={Link} to="/register" onClick={() => toggleDrawer(false)}>
                          <ListItemText primary={t("navbar.register")} />
                        </ListItem>
                        <ListItem component={Link} to="/login" onClick={() => toggleDrawer(false)}>
                          <ListItemText primary={t("navbar.login")} />
                        </ListItem>
                      </>
                    )
                  }
                  <ListItem component={Link} to="/cart" onClick={() => toggleDrawer(false)}>
                    <ListItemText
                      primary={`${t("navbar.cart")} (${cartItemCount})`}
                    />
                  </ListItem>
                  <ListItem>
                    <Select
                      value={i18n.language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ bgcolor: "white", borderRadius: 1, width: "100%" }}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="ru">Русский</MenuItem>
                      <MenuItem value="uz">O'zbek</MenuItem>
                    </Select>
                  </ListItem>
                  <ListItem>
                    {isLoggedIn && (
                      <MuiMenuItem onClick={handleLogout}>
                        <ExitToAppIcon sx={{ mr: 1 }} />
                        {t("navbar.logout")}
                      </MuiMenuItem>
                    )}
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            {/* Navigation Links for Desktop */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton component={Link} to="/" color="inherit">
                  <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.875rem" }}>
                    {t("navbar.home")}
                  </Typography>
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton component={Link} to="/products" color="inherit">
                  <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.875rem" }}>
                    {t("navbar.products")}
                  </Typography>
                </IconButton>
              </motion.div>
              {!isLoggedIn && (
                <>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <IconButton component={Link} to="/register" color="inherit">
                      <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.875rem" }}>
                        {t("navbar.register")}
                      </Typography>
                    </IconButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <IconButton component={Link} to="/login" color="inherit">
                      <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.875rem" }}>
                        {t("navbar.login")}
                      </Typography>
                    </IconButton>
                  </motion.div>
                </>
              )}

            </Box>

            {/* Cart */}
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Language Switcher */}
            <Select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ ml: 2, bgcolor: "white", borderRadius: 1 }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ru">Русский</MenuItem>
              <MenuItem value="uz">O'zbek</MenuItem>
            </Select>

            {/* Profile Dropdown */}
            {isLoggedIn && (
              <Box sx={{ ml: 2 }}>
                <IconButton onClick={handleMenuClick} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MuiMenuItem onClick={handleLogout}>
                    <ExitToAppIcon sx={{ mr: 1 }} />
                    {t("navbar.logout")}
                  </MuiMenuItem>
                </Menu>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
