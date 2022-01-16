import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

export interface HistoryItem {
  zone: number;
  abac: string;
  abacValue: number;
  zipcode: string;
}

interface HistoryProps {
  history: HistoryItem[];
  deleteAmount: (val: any, idx: number) => void;
  onClose: () => void;
}

export default function History({
  history,
  deleteAmount,
  onClose,
}: HistoryProps) {
  const acs = [0, 0, 0];
  const abs = [0, 0, 0];
  return (
    <div className="history">
      {history.map(({ zone, abac, abacValue, zipcode }, idx: number) => {
        if (abac === "AC") {
          acs[zone - 1]++;
        } else abs[zone - 1]++;
        return (
          <div style={{ fontSize: "20px" }}>
            <IconButton>
              <CloseIcon onClick={() => deleteAmount(abacValue, idx)} />
            </IconButton>
            {`${zipcode} ${zone} ${abac} ${abacValue}`}
          </div>
        );
      })}
      <p />
      {acs.map((ac, i) => {
        if (!ac) return null;
        return (
          <div style={{ fontSize: "18px" }}>
            &emsp;Zone {i + 1} AC x{ac} = ${ac * (65 + i * 10)}
          </div>
        );
      })}
      {abs.map((ab, i) => {
        if (!ab) return null;
        return (
          <div style={{ fontSize: "18px" }}>
            &emsp;Zone {i + 1} AB x{ab} = ${ab * (85 + i * 10)}
          </div>
        );
      })}
      <p />
      <Button className="closeBtn" onClick={onClose}>
        关闭
      </Button>
    </div>
  );
}
