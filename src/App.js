import React from 'react';
import styled from 'styled-components'
import Board from './components/Board'

const Container  = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return(
      <Container>
        <Board contributionsAmount />
      </Container>
    );
}

export default App;
