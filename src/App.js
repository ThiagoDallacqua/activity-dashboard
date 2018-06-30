import React from 'react';
import styled from 'styled-components'

const Container  = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return(
      <Container> Hello there!</Container>
    );
}

export default App;
