"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PolicyInstance, PolicyHolder } from "@/app/lib/definitions";
import { eventEmitter } from "./instance_create";

export default function PolicyInstanceTable() {
  const [policyInstanceData, setPolicyInstanceTable] =
    useState<PolicyInstance[]>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    async function fetchAllPolicyInstance() {
      const res = await fetch("/api/policyInstance");
      const data: PolicyInstance[] = await res.json();
      setPolicyInstanceTable(data);
    }
    fetchAllPolicyInstance();

    const handleDataUpdate = (newData: any) => {
      // setData(newData); // Update state with new data
      fetchAllPolicyInstance();

      // setPolicyInstanceTable((currentMessages) =>
      //   currentMessages ? [...currentMessages, newData] : [newData]
      // );
    };

    eventEmitter.on("dataInstanceUpdated", handleDataUpdate);

    return () => {
      eventEmitter.off("dataInstanceUpdated", handleDataUpdate); // Clean up the event listener
    };
  }, []);

  return (
    <div>
      {isLoaded ? (
        <TableContainer component={Paper}>
          {/* <TableContainer> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Policy ID</TableCell>
                <TableCell>Policy Info ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policyInstanceData ? (
                policyInstanceData.map((instance) => (
                  <TableRow key={instance.policy_id}>
                    <TableCell>{instance.policy_id}</TableCell>
                    <TableCell>{instance.policy_info_id}</TableCell>
                    <TableCell>{instance.user_id}</TableCell>
                    <TableCell>{instance.username}</TableCell>
                    <TableCell>{instance.start_date}</TableCell>
                    <TableCell>{instance.end_date}</TableCell>
                    <TableCell>{instance.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <br></br>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
