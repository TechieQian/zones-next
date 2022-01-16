import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar } from "@mui/material";

export default function NavBar() {
  const { data } = useSession();
  console.log(data);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            For Mom
          </Typography>
          {data?.user?.image && <Avatar src={data.user.image} alt="user" />}
          <Button
            color="inherit"
            onClick={() =>
              data?.user ? signOut() : signIn("google", { callbackUrl: "/" })
            }
          >
            {data?.user ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
