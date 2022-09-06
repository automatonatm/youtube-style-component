import styled, {ThemeProvider} from 'styled-components'
import {Menu, Navbar} from "components";
import {darkTheme, lightTheme} from "./utils/Theme";
import React, {useState} from "react";



import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import {Home, Video, SignIn} from "pages";

const Container = styled.div`
  display: flex;
  a {
     text-decoration: none; 
     color: inherit;
  }
`

const Main = styled.div`
  flex: 7;
  background-color: ${({theme}) => theme.bg};
`

const Wrapper = styled.div`
 padding: 15px
`


function App() {

    const [darkMode, setDarkMode] = useState(false)

    const switchMode = () => setDarkMode(!darkMode)

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Container>
                <BrowserRouter>
                <Menu switchMode={switchMode}/>
                <Main>
                    <Navbar/>
                    <Wrapper>
                          <Routes>
                              <Route  path="/">
                                  <Route path="sign-in" element={<SignIn />} />
                                  <Route index element={<Home type="random"/>}/>
                                  <Route path="explore" element={<Home type="trend"/>}/>
                                  <Route path="subscriptions" element={<Home type="sub"/>}/>
                                  <Route path="video">
                                      <Route  path=":id" element={<Video/>}/>
                                  </Route>
                              </Route>
                          </Routes>
                    </Wrapper>
                </Main>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    );
}

export default App;
