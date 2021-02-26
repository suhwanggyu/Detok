import React from "react";
import Copyright from 'components/Copyright';

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div>
      <Copyright drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  );
};
