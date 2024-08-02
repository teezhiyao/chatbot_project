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
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const eventEmitter = new EventEmitter();

export default function PolicyForm() {
  const [policyName, setPolicyName] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSend = async (
    event: MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>
  ): Promise<void> => {
    event.preventDefault();
    const policyInfo = {
      // policy_info_id: policyInfoId,
      policy_name: policyName,
      product_type: productType,
      product_category: productCategory,
      description: description,
    };

    // Perform any additional validation if needed

    async function sendPolicyInfo(info: typeof policyInfo): Promise<void> {
      const res = await fetch("/api/policyInfo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const data = await res.json();
      // Handle response if needed
      eventEmitter.emit("dataUpdated", data);
    }

    await sendPolicyInfo(policyInfo);

    // Reset form after sending
    // setPolicyInfoId("");
    setPolicyName("");
    setProductType("");
    setProductCategory("");
    setDescription("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    switch (id) {
      // case "policy-info-id":
      //   setPolicyInfoId(value ? Number(value) : "");
      //   break;
      case "policy-name":
        setPolicyName(value);
        break;
      case "description":
        setDescription(value);
        break;
    }
  };

  const handleChangeSelect = (event: { target: { value: any; name: any } }) => {
    console.log(event.target);
    const { name, value } = event.target;

    switch (name) {
      // case "policy-info-id":
      //   setPolicyInfoId(value ? Number(value) : "");
      //   break;
      case "product-type":
        setProductType(value);
        break;
      case "product-category":
        setProductCategory(value);
        break;
    }
  };

  return (
    <Container
      sx={{
        width: "100%", // Set the width to 1/4 of the screen width
        // maxWidth: "400px", // Optional: set a maximum width
        mx: "auto", // Center horizontally
        padding: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New Policy
      </Typography>
      <FormControl variant="outlined" fullWidth margin="normal">
        <TextField
          required
          id="policy-name"
          label="Policy Name"
          value={policyName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel required>Product Type</InputLabel>
        <Select
          name="product-type"
          value={productType}
          onChange={handleChangeSelect}
          label="Product Type"
        >
          <MenuItem value={"health"}>Health</MenuItem>
          <MenuItem value={"travel insurance"}>Travel Insurance</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel required>Product Category</InputLabel>

        <Select
          name="product-category"
          label="Product Category"
          value={productCategory}
          onChange={handleChangeSelect}
        >
          {" "}
          <MenuItem value={"Individual"}>Individual</MenuItem>
          <MenuItem value={"Family"}>Family</MenuItem>
          <MenuItem value={"Corporate"}>Corporate</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth margin="normal">
        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={handleChange}
          multiline
          rows={4}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        fullWidth
      >
        Send
      </Button>
    </Container>

    // <Box
    //   component="form"
    //   sx={{
    //     width: "100%", // Set the width to 1/4 of the screen width
    //     // maxWidth: "400px", // Optional: set a maximum width
    //     mx: "auto", // Center horizontally
    //     mt: 4, // Add some margin at the top
    //     padding: 4,
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    //   <Typography>Add New Policy</Typography>
    //   <FormControl variant="outlined" fullWidth>
    //     {/* <InputLabel htmlFor="policy-name">Policy Name</InputLabel> */}
    //     {/* <OutlinedInput
    //       id="policy-name"
    //       value={policyName}
    //       onChange={handleChange}
    //       label="Policy Name"
    //     /> */}
    //     <TextField
    //       required
    //       id="policy-name"
    //       value={policyName}
    //       onChange={handleChange}
    //       label="Policy Name"
    //     />
    //   </FormControl>
    //   <FormControl variant="outlined" fullWidth>
    //     <InputLabel>Product Type</InputLabel>
    //     <Select
    //       required
    //       name="product-type"
    //       value={productType}
    //       onChange={handleChangeSelect}
    //       label="Product Type"
    //     >
    //       <MenuItem value={"health"}>Health</MenuItem>
    //       <MenuItem value={"travel insurance"}>Travel Insurance</MenuItem>
    //     </Select>
    //   </FormControl>
    //   <FormControl variant="outlined" fullWidth>
    //     {/* <InputLabel htmlFor="product-category">Product Category</InputLabel> */}
    //     <TextField
    //       required
    //       id="product-category"
    //       value={productCategory}
    //       onChange={handleChange}
    //       label="Product Category"
    //     />
    //   </FormControl>
    //   <FormControl variant="outlined" fullWidth>
    //     {/* <InputLabel htmlFor="description">Description</InputLabel> */}
    //     <TextField
    //       id="description"
    //       value={description}
    //       onChange={handleChange}
    //       label="Description"
    //       multiline
    //       rows={4}
    //     />
    //   </FormControl>
    //   <br></br>
    //   <Button variant="contained" color="primary" onClick={handleSend}>
    //     Send
    //   </Button>
    // </Box>
  );
}
