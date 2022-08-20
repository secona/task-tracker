import { createGlobalStyle } from 'styled-components';

const font = 'Sora';

export default createGlobalStyle`
  body {
    font-family: ${font};
  }

  input[type=text]::placeholder {
    font-family: ${font};
  }
`;
