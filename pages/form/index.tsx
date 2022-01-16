import React, { useState } from "react";
import { getSession } from "next-auth/react";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

interface FormProps {
  permissioned: boolean;
}
function Form({ permissioned }: FormProps) {
  const [zipCode, setZipCode] = useState("");
  const [zone, setZone] = useState(1);

  const submitForm = async () => {
    await fetch("api/zone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: zipCode,
        zone,
      }),
    });
    alert("搞定！");
  };
  return (
    <div>
      {permissioned ? (
        <div>
          <FormControl>
            <Input
              placeholder="zipcode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel id="zone">Zone</InputLabel>
            <Select
              value={zone}
              id="zone"
              label="Zone"
              onChange={(e) => setZone(+e.target.value)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              disabled={zipCode.length !== 5}
              onClick={submitForm}
            >
              确认
            </Button>
          </FormControl>
        </div>
      ) : (
        <div>You do not have permissions to view this page</div>
      )}
    </div>
  );
}

export default Form;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const permissioned =
    (session?.user?.email &&
      process.env.ADMIN_USERS &&
      process.env.ADMIN_USERS.split(",").includes(session.user.email)) === true;
  return {
    props: {
      permissioned,
    },
  };
}
