import React, { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Router from './Router';
import { GlobalStyle } from './styles/GlobalStyle';
import Price from './routes/Price';
import Chart from './routes/Chart';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Container>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <ReactQueryDevtools initialIsOpen={true} />
        <GlobalStyle />
        <HelmetProvider>
          <Routes>
            <Route path='/' element={<Router />}>
              <Route index element={<Coins />} />
              <Route path=':coinId' element={<Coin />}>
                <Route path='price' element={<Price />} />
                <Route path='chart' element={<Chart />} />
              </Route>
            </Route>
          </Routes>
        </HelmetProvider>
      </ThemeProvider>
    </Container>
  );
}

const Container = styled.div``;

export default App;
