import React from "react";
import ReportCardColumn from 'components/reportvtwo/ReportCardColumn';
import style from "css/report.module.css";

export default React.memo(({ drizzle, drizzleState }) => {
  return (
    <div className={style.reportContent}>
      <ReportCardColumn drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  );
}, (prev, next) => {console.log(prev, next); return prev.drizzleState.accounts[0] == next.drizzleState.accounts[0]});