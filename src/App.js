import React, { Component } from "react";
import { MDBLightbox } from 'mdbreact';

import "./index.css";
import Menu from "./components/Menu/Menu";
import Hero from "./components/Hero/Hero";
import Content from "./components/Content/Content";
import FindTeacher from "./components/findTeacher/FindTeacher";

class App extends Component {
 

  render() {
    return (
      <>
        <Menu/>
        <Hero/>
        <Content/>
        <FindTeacher/>
     </>
    );
  }
}

export default App;
