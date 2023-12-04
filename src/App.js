import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';

import { Router } from './routes/Router';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/common/Layout/Layout';

function App() {
  const queryClient = new QueryClient();
  return (
    <Wrap>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RecoilRoot>
            <Layout>
              <Router />
            </Layout>
          </RecoilRoot>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  position: relative;
  width: 360px;
  height: 100vh;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
  background-color: #fff;
`;
