import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { TypographyLink } from "../components/muiStyled";
import { useDispatch, useSelector } from "react-redux";

import { MenuLink } from "../components";
import { authActions } from "../redux/features";

const Header = () => {
  const { setLogout } = authActions;

  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const customHandleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
  };

  const menuListConfigs = useMemo(() => {
    const init = [{ link: "/", displayName: "Home" }];

    if (user?.result?._id) {
      init.push(
        {
          link: "/add-tour",
          displayName: "Add Tour",
        },
        {
          link: "/dashboard",
          displayName: "Dashboard",
        },
        {
          link: "/login",
          displayName: "Logout",
          logout: true,
        }
      );
    } else {
      init.push({
        link: "/login",
        displayName: "Login",
      });
    }

    return init;
  }, [user?.result?._id]);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TypographyLink
              sx={{
                fontSize: "30px",
                fontFamily: "Raleway",
              }}
            >
              <Link to="/">Tour App</Link>
            </TypographyLink>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                {user?.result?._id && (
                  <Typography
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, .3)",
                      padding: "10px",
                      borderRadius: "4px",
                      marginRight: "20px",
                    }}
                  >
                    Welcome {user?.result?.name}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "flex", lg: "flex" },
                  gap: "20px",
                }}
              >
                {menuListConfigs.map((item) => (
                  <TypographyLink
                    onClick={item.logout ? customHandleLogout : undefined}
                    sx={{ padding: "10px" }}
                    key={item.link}
                  >
                    <Link to={item.link}>{item.displayName}</Link>
                  </TypographyLink>
                ))}
              </Box>
              <Box sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
                <MenuLink
                  linkList={menuListConfigs}
                  customHandleLogout={customHandleLogout}
                />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
