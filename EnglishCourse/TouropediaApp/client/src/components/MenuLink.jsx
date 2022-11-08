import { Link } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Icon, Menu, MenuItem, Typography } from "@mui/material";

const MenuLink = ({ linkList, customHandleClose, customHandleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    customHandleClose?.();
  };

  const handleLogout = () => {
    setAnchorEl(null);
    customHandleLogout?.();
  };

  return (
    <Box>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Icon baseClassName="fas" className="fa-bars" sx={{ color: "#fff" }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={handleClose}
      >
        {linkList.length &&
          linkList.map((item) => (
            <MenuItem
              key={item.link}
              onClick={item.logout ? handleLogout : handleClose}
            >
              <Typography>
                <Link to={item.link} style={{ color: "#000" }}>
                  {item.displayName}
                </Link>
              </Typography>
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};
export default MenuLink;
