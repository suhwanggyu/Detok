import React from "react";
import '../css/Header.css';
import AccountData from './account/AccountData';

const Header = ({ drizzle, drizzleState }) => {
    return (
        <div className = "Header">
            <div className="Title">
                <h1>Defender</h1>
                {/*}
                <div style={{float:'right', fontSize:'10px'}}>
                    <AccountData drizzle={drizzle} drizzleState={drizzleState}/>
                </div>*/}
            </div>
        </div>
    );

}

export default Header;
