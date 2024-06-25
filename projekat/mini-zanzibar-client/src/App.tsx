
import { useState } from 'react';
import { menuOptions, navbarTitle, theme } from './utils/data';
import { ThemeProvider } from 'styled-components';
import { AppContainer, ContentContainer } from './App.styled';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { MantineProvider } from "@mantine/core";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faMapMarkerAlt, faBuilding, faArrowDown, faArrowUp, faMedal, faShieldAlt, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./utils/routes";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <MantineProvider>
          <Router>
            <AppContainer className="App">
              <Navbar
                title={navbarTitle}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                options={menuOptions}
              />
              <ContentContainer isMenuOpen={isMenuOpen}>
                <MyRoutes />
              </ContentContainer>
              <Footer/>
            </AppContainer>
          </Router>
        </MantineProvider>
      </ThemeProvider>
    </>
  )
}
library.add(faArrowRight, faMapMarkerAlt, faBuilding, faArrowDown, faArrowUp, faMedal, faShieldAlt, faHourglass);

export default App
