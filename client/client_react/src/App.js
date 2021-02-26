import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import Content from "./Content";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from 'load/Loading';
const drizzle = new Drizzle(drizzleOptions);

const App = () => {

  
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext

          if (!initialized) {
            return(
              <Loading />
            );
          }
          return(
            
            <Content drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
