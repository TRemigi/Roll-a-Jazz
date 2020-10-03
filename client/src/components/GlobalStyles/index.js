import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 2s linear;
  }

  .title, .nav-link {
    color: ${({ theme }) => theme.text}!important;
  }
`