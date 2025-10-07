import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const TimeTable = () => {
  const [loginHistory, setLoginHistory] = useState<any[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem("last_action_user");
      const dataUserLoginLocal = localStorage.getItem("user_login");

      if (dataUserLoginLocal && data) {
        const dataUserLogin = JSON.parse(dataUserLoginLocal);
        const dataUserAction = JSON.parse(data);
        const userFilter = dataUserAction.filter(
          (value: any) => value.phone === dataUserLogin.phone
        );
        if (data) {
          try {
            setLoginHistory(userFilter);
          } catch {
            setLoginHistory([]);
          }
        }
      }
    } catch {
      setLoginHistory([]);
    }
  }, []);
  return (
    <Table
      striped
      bordered
      hover
      style={{ maxHeight: "400px", overflowY: "auto" }}
      dir="rtl"
    >
      <thead>
        <tr>
          <th>کاربر</th>
          <th>شماره</th>
          <th>نوع</th>
          <th>زمان</th>
        </tr>
      </thead>
      <tbody>
        {loginHistory.map((record, index) => (
          <tr
            key={index}
            style={{ color: record.type === "login" ? "green" : "red" }}
          >
            <td>{record.email}</td>
            <td>{record.phone}</td>
            <td style={{ color: record.type === "login" ? "green" : "red" }}>
              {record.type === "login" ? "ورود" : "خروج"}
            </td>
            <td>{record.time}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TimeTable;
