import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "@mui/material/Button";
import { IconButton, Input } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Modal from "@mui/material/Modal";

import getZone, { defaultZone } from "../utils/calculateZone";
import History, { HistoryItem } from "../components/History";
import { signIn, signOut, useSession } from "next-auth/react";

function App() {
  const [radioVal, setRadio] = useState("AC");
  const [totalAmount, setTotal] = useState(0);
  const [inputVal, setVal] = useState("");
  const [amountCount, setAmountCount] = useState(0);
  const [count, setCount] = useState(1);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [currentZone, setCurrentZone] = useState(defaultZone);

  const inputHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.length <= 5) {
      setVal(value);
    }
  };

  useEffect(() => {
    if (inputVal.length === 5) {
      const zone = getZone(inputVal);
      console.log("zone", zone);
      setCurrentZone(zone);
    }
  }, [inputVal]);

  const reset = function () {
    setCurrentZone(defaultZone);
    setVal("");
    setCount(1);
  };

  const buttonClick = function () {
    const { ab, ac } = currentZone;
    const val = radioVal === "AB" ? ab : ac;
    setTotal(totalAmount + count * val);
    setAmountCount(amountCount + 1);
    const additionalHistory = Array.from({ length: count }, () => ({
      zone: currentZone.zone,
      abac: radioVal,
      abacValue: val,
      zipcode: inputVal,
    }));

    console.log(additionalHistory);
    setHistory((history) => [...history, ...additionalHistory]);

    reset();
  };

  const submitNewZone = (zipcode: string, zone: number) => {
    fetch("api/zone", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: zipcode, zone }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeAmount = (val: number, idx: number) => {
    setTotal(totalAmount - val);
    setHistory(history.slice(0, idx).concat(history.slice(idx + 1)));
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClear = function () {
    setTotal(0);
    setAmountCount(0);
    setHistory([]);
  };

  return (
    <div
      className="App"
      style={{
        marginTop: "15vh",
      }}
    >
      <Input
        inputProps={{
          style: {
            textAlign: "center",
            fontSize: 60,
          },
        }}
        onChange={inputHandler}
        type="number"
        value={inputVal}
      />
      <div className="iconbar">
        <IconButton onClick={() => setCount((count) => count + 1)}>
          <Add />
        </IconButton>
        <IconButton
          onClick={() => setCount((count) => (count > 0 ? 0 : count - 1))}
        >
          <Remove />
        </IconButton>
        <span style={{ marginLeft: "15px" }}>{count}</span>
      </div>
      <Card
        currentZone={currentZone}
        radioValue={radioVal}
        onRadioChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRadio(e.target.value);
        }}
      />
      <Button
        style={{ marginRight: "5px" }}
        disabled={currentZone.zone === 0 || inputVal.length < 5}
        onClick={buttonClick}
        variant="contained"
        color="primary"
      >
        输入
      </Button>
      <Button onClick={onClear} variant="contained" color="error">
        清除
      </Button>
      <Button
        onClick={() => submitNewZone("111", 1)}
        variant="contained"
        color="error"
      >
        Test
      </Button>
      <section style={{ margin: "15px 0", fontSize: "40px" }}>
        <span>${totalAmount}</span>
        <Button
          style={{ marginLeft: "15px" }}
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          disabled={history.length < 1}
        >
          历史 ({history.length})
        </Button>
      </section>
      <Modal style={{ overflow: "scroll" }} open={open} onClose={handleClose}>
        <div>
          <History
            history={history}
            deleteAmount={removeAmount}
            onClose={handleClose}
          />
        </div>
      </Modal>
    </div>
  );
}

export default App;
