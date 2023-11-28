import React from 'react';
import styled from 'styled-components';

export default function MiniModal(props) {
  const { children } = props;
  return <MiniModalWrap>{children}</MiniModalWrap>;
}

const MiniModalWrap = styled.div`
  min-width: 98px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  padding: 11px;
  border-radius: 10px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);

  button,
  a {
    padding: 10px;
    font-size: var(--font-sm);
  }
`;
