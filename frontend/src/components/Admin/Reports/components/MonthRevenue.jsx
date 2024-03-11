/* eslint-disable no-unused-vars */
import { useState } from "react";
import Tab from "./Tab";
export default function MonthRevenue() {
  const [date, setDate] = useState(new Date());

  return <Tab title="Monthly Revenue" active={true} onClick={() => {}}></Tab>;
}
