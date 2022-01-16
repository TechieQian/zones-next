import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ZoneDetail } from "../utils/calculateZone";

interface AnswerCardProps {
  currentZone: ZoneDetail;
  onRadioChange: any;
  radioValue: any;
}
export default function AnswerCard({
  currentZone,
  onRadioChange,
  radioValue,
}: AnswerCardProps) {
  const { zone, ab, ac } = currentZone;
  return (
    <div style={{ margin: "15px 0" }}>
      <div style={{ fontSize: "40px" }}>
        {zone ? `Zone ${zone}` : "Not Found"}
      </div>
      <RadioGroup
        name="position"
        value={radioValue}
        onChange={onRadioChange}
        row
      >
        <FormControlLabel
          value={"AC"}
          control={<Radio color="primary" />}
          label={`AC $${ac || 0}`}
          labelPlacement="start"
        />
        <FormControlLabel
          value={"AB"}
          control={<Radio color="primary" />}
          label={`AB $${ab || 0}`}
          labelPlacement="start"
        />
      </RadioGroup>
    </div>
  );
}
