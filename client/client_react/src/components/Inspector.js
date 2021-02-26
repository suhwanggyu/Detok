import React from "react";
import InspectContainer from 'components/inspect/InspectContainer';
import style from 'css/Inspect.module.css';
export default ({ drizzle, drizzleState }) => {

  // destructure drizzle and drizzleState from props
  return (
    <div className={style.App}>
      <InspectContainer drizzle={drizzle} drizzleState={drizzleState}/>
    </div>
  );
};
