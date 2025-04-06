import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Toolbar, IconButton, Select, MenuItem, Box, Badge, Typography } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../assets/Bordo.png"; // Import the logo

interface NavbarProps {
  logoText: string;
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { t, i18n } = useTranslation();
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Link to="/" style={{ flexGrow: 1 }}>
          <img src={logo} alt="Bordo Logo" style={{ width: "120px" }} />
        </Link>

        {/* Navigation Links */}
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
