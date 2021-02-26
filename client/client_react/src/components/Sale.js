import React from "react";
import style from "css/sale.module.css";
import CardColumns from 'components/sale/CardColumns';
export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div className={style.saleContent}>
      
      <div className={style.title}>
                <h1>Sale</h1><br/>
                <p style={{'color':'red'}}>Waring : This is just prototype. This service is not real.</p>
      </div>
        <CardColumns drizzle={drizzle} drizzleState={drizzleState}/>
    </div>
  );
};
