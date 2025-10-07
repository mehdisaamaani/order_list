import moment from "jalali-moment";

export const logHistory = (
  user: { email: string; phone: string },
  type: "login" | "logout"
) => {
  const exitUser = localStorage.getItem("last_action_user");
  const historyState = exitUser ? JSON.parse(exitUser) : [];
  const newUserLog = {
    ...user,
    type,
    time: moment().format("YYYY/MM/DD HH:mm"),
  };
  const updateDataTime = [...historyState, newUserLog];
  console.log("newUserLog", updateDataTime);
  localStorage.setItem("last_action_user", JSON.stringify(updateDataTime));
};
