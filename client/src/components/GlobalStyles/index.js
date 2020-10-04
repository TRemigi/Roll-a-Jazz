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

  .btn-border {
    background: ${({ theme }) => theme.main};
    border: 1px solid ${({ theme }) => theme.accent}!important;
    color: ${({ theme }) => theme.text};
    transition: all 2s linear;
  }

  .btn:hover {
    color: ${({ theme }) => theme.text};
  }

  .carousel-control-next, .carousel-control-prev {
    background-color: ${({ theme }) => theme.main}!important;
    opacity: 1 !important;
    color: var(--gold) !important;
    transition: all 2s linear;

  }
  


`