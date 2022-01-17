import React from "react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import ComponentFromApp2 from "./Components/ComponentFromApp2";
import { Provider } from "react-redux";
import { rtkStore } from "./store";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={rtkStore}>
        <ChakraProvider>
          <Flex>
            <Menu />
            <Box>
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="app2" element={<ComponentFromApp2 />} />
              </Routes>
            </Box>
          </Flex>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}
