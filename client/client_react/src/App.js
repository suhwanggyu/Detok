import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import Content from "./Content";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Blog from 'load/Blog';
import Loading from 'load/Loading';
import {useSelector} from 'react-redux';



const App = () => {
  const menu = useSelector(state => state.index.menu);
  switch(menu){
    case 0 :
      return (
        <Blog />
      );
    case 1 :
      const drizzle = new Drizzle(drizzleOptions);
      return (
        <DrizzleContext.Provider drizzle={drizzle}>
          <DrizzleContext.Consumer>
            {drizzleContext => {
              if (typeof window.ethereum === 'undefined') {
                return(
                  <Loading drizzle={drizzle} drizzleState={drizzleState}/>
                );
              }
              const { drizzle, drizzleState, initialized } = drizzleContext

              if (!initialized) {
                return(
                  <Loading drizzle={drizzle} drizzleState={drizzleState}/>
                );
              }
              
              return(
                
                <Content drizzle={drizzle} drizzleState={drizzleState} />
              )
            }}
          </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
      );
      default :
      return (
        <Blog />
      );
  }
}

export default App;
