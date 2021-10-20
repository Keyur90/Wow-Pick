import React from 'react';

import { Container } from '../Container';

export default {
  title: 'Components/Container',
  component: Container,
};

export const ContainerComponent = () => {
  return (
    <Container>
      <div
        style={{
          background: '#f3f3f3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
        }}
      >
        Container content
      </div>
    </Container>
  );
};
