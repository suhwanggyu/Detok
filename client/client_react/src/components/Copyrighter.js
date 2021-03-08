import React from "react";
import Copyright from 'components/Copyright';

export default React.memo(({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div>
      <Copyright drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  );
}, (prev, next) => {console.log(prev, next); return prev.drizzleState.accounts[0] == next.drizzleState.accounts[0]});
