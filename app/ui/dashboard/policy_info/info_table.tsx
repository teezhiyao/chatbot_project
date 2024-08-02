"use client";
import { eventEmitter } from "./info_create";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { PolicyInfo } from "@/app/lib/definitions";

export default function PolicyInfoTable() {
  const [policyInfoData, setPolicyInfoTable] = useState<PolicyInfo[]>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    async function fetchPolicies() {
      const res = await fetch("/api/policyInfo");
      const data: PolicyInfo[] = await res.json();
      setPolicyInfoTable(data);
    }
    fetchPolicies();

    const handleDataUpdate = (newData: any) => {
      // setData(newData); // Update state with new data
      setPolicyInfoTable((currentMessages) =>
        currentMessages ? [...currentMessages, newData] : [newData]
      );
    };

    eventEmitter.on("dataUpdated", handleDataUpdate);

    return () => {
      eventEmitter.off("dataUpdated", handleDataUpdate); // Clean up the event listener
    };
  }, []);

  return (
    <div>
      {isLoaded ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Policy Name</TableCell>
                <TableCell>Product Type</TableCell>
                <TableCell>Product Category</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policyInfoData ? (
                policyInfoData.map((policy) => (
                  <TableRow key={policy.policy_info_id}>
                    <TableCell>{policy.policy_info_id}</TableCell>
                    <TableCell>{policy.policy_name}</TableCell>
                    <TableCell>{policy.product_type}</TableCell>
                    <TableCell>{policy.product_category}</TableCell>
                    <TableCell>{policy.description}</TableCell>
                  </TableRow>
                ))
              ) : (
                <div></div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Loading...</div>
      )}
      ;
    </div>
  );
}
