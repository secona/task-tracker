import { createGlobalStyle } from 'styled-components';

const font = 'Sora';

export default createGlobalStyle`
  body {
    font-family: ${font};
    background-color: ${p => p.theme.elevation[0]};
    margin: 0;
  }

  input[type=text]::placeholder {
    font-family: ${font};
  }
`;
