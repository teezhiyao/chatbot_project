"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ChangeEvent, MouseEvent, useState } from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import { EventEmitter } from "events";

export const drawerWidth = 240;
export const eventEmitter = new EventEmitter();

export default function PolicyInstanceForm() {
  const [policyId, setPolicyId] = useState<number | "">("");
  const [policyInfoId, setPolicyInfoId] = useState<number | "">("");
  const [userId, setUserId] = useState<number | "">("");
  // const [username, setUsername] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSend = async (
    event: MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>
  ): Promise<void> => {
    event.preventDefault();
    const policyInstanceData = {
      // policy_id: policyId,
      policy_info_id: policyInfoId,
      user_id: userId,
      // username: username,
      start_date: startDate,
      end_date: endDate,
      status: status,
    };

    // Perform any additional validation if needed

    async function sendPolicyInstance(
      info: typeof policyInstanceData
    ): Promise<void> {
      const res = await fetch("/api/policyInstance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const data = await res.json();
      console.log(data);
      // Handle response if needed
      eventEmitter.emit("dataInstanceUpdated", data);
    }

    await sendPolicyInstance(policyInstanceData);

    // Reset form after sending
    // setPolicyInfoId("");
    // setPolicyId("");
    setPolicyInfoId("");
    setUserId("");
    // setUsername("");
    setStartDate("");
    setEndDate("");
    setStatus("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    switch (id) {
      // case "policy-id":
      //   setPolicyId(value ? Number(value) : "");
      //   break;
      case "policy-info-id":
        setPolicyInfoId(value ? Number(value) : "");
        break;
      case "user-id":
        setUserId(value ? Number(value) : "");
        break;
      // case "username":
      //   setUsername(value);
      //   break;
      case "start-date":
        setStartDate(value);
        break;
      case "end-date":
        setEndDate(value);
        break;
      case "status":
        setStatus(value);
        break;
    }
  };

  return (
    <Container
      component="form"
      sx={{
        width: "100%", // Set the width to 1/4 of the screen width
        // maxWidth: "400px", // Optional: set a maximum width
        mx: "auto", // Center horizontally
        mt: 4, // Add some margin at the top
        padding: 4,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography>Add New Policy</Typography>
      {/* <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="policy-id">Policy ID</InputLabel>
        <OutlinedInput
          id="policy-id"
          value={policyId}
          onChange={handleChange}
          label="Policy ID"
          type="number"
        />
      </FormControl> */}
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="policy-info-id">Policy Info ID</InputLabel>
        <OutlinedInput
          id="policy-info-id"
          value={policyInfoId}
          onChange={handleChange}
          label="Policy Info ID"
          type="number"
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="user-id">User ID</InputLabel>
        <OutlinedInput
          id="user-id"
          value={userId}
          onChange={handleChange}
          label="User ID"
          type="number"
        />
      </FormControl>
      {/* <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput
          id="username"
          value={username}
          onChange={handleChange}
          label="Username"
        />
      </FormControl> */}
      <FormControl variant="outlined" fullWidth margin="normal">
        {/* <InputLabel htmlFor="start-date">Start Date</InputLabel> */}
        <OutlinedInput
          id="start-date"
          value={startDate}
          onChange={handleChange}
          label="Start Date"
          type="date"
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        {/* <InputLabel htmlFor="end-date">End Date</InputLabel> */}
        <OutlinedInput
          id="end-date"
          value={endDate}
          onChange={handleChange}
          label="End Date"
          type="date"
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="status">Status</InputLabel>
        <OutlinedInput
          id="status"
          value={status}
          onChange={handleChange}
          label="Status"
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Container>
  );
}
