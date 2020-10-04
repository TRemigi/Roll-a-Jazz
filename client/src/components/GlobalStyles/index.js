import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.main};
    color: ${({ theme }) => theme.text};
    transition: 2s linear;
  }

  .title, .nav-link {
    color: ${({ theme }) => theme.text}!important;
    transition: all 2s linear;
  }

  .card-body {
    color: ${({ theme }) => theme.main}!important;
  }

  .btn {
    background: ${({ theme }) => theme.main};
    border: 1px solid ${({ theme }) => theme.accent}!important;
    color: ${({ theme }) => theme.text};
    transition: all 2s linear;
  }

  .btn:hover {
    color: ${({ theme }) => theme.text};
  }


`