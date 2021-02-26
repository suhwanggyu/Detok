import React from "react";
import { newContextComponents } from "@drizzle/react-components";
const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
    

    return (
        <div>
            <AccountData
            drizzle={drizzle}
            drizzleState={drizzleState}
            accountIndex={0}
            units="ether"
            precision={3}
            />
        </div>
    );
}