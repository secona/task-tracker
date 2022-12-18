import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2.15rem;
  width: 22rem;
  background-color: ${p => p.theme.elevation[1]};
  padding: 2rem 4.25rem;
`;

export interface FormPageProps extends React.PropsWithChildren {}

export const FormPage = (props: FormPageProps) => {
  return (
    <Wrapper>
      <Panel>
        {props.children}
      </Panel>
    </Wrapper>
  );
};
