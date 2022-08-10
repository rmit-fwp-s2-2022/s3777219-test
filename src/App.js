import "./App.css";
import Header from "./Components/Header";
import Services from "./Components/Services";
import Signin from "./Components/Signin";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import React, { useState } from "react";

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

function App() {
  const [headerImage] = useState("home-page");
  const [headerTextTitle] = useState("ENTERPRISE SOFTWARE DEVELOPMENT");
  const [headerTextContent] = useState(
    " Use the expertise and deep tech background of the best minds at Intellectsoft to create a comprehensive IT strategy for a digital and technological transformation of your organization that goes in line with your business objectives. Our strategic IT consulting will help you automate and digitalise operations, optimise the software portfolio, and implement the latest technologies."
  );

  const [headerImage2] = useState("signin-page");
  const [headerTextTitle2] = useState("JOIN OUR TEAM");
  const [headerTextContent2] = useState(
    " At LOOP AGILE NOW, the world’s most talented engineers, designers, and thought leaders are shaping the future of IT Industry. Many LOOP AGILE NOW employees are working from home at this time. As we closely continue to monitor the status of COVID‑19, we have opened some of our offices to employees who have chosen to return and provided proof of vaccination. In preparation for our broader return to office plans, we have rolled out our Flexible Work Philosophy to ensure a safe return and flexibility for our LOOP AGILE NOW employees."
  );

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header
                  img={headerImage}
                  title={headerTextTitle}
                  text={headerTextContent}
                />
                <Services />
              </>
            }
          ></Route>
          <Route
            exact
            path="/signin"
            element={
              <>
                <Header
                  img={headerImage2}
                  title={headerTextTitle2}
                  text={headerTextContent2}
                />
                <Signin />
              </>
            }
          ></Route>

          <Route
            exact
            path="/signup"
            element={
              <>
                <Header
                  img={headerImage2}
                  title={headerTextTitle2}
                  text={headerTextContent2}
                />
                <Signup />
              </>
            }
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
