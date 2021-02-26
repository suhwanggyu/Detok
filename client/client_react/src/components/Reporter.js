import React from "react";
import ReportCardColumn from 'components/reportvtwo/ReportCardColumn';
import style from "css/report.module.css";



export default ({ drizzle, drizzleState }) => {
  return (
    <div className={style.reportContent}>
      <ReportCardColumn drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  );
};