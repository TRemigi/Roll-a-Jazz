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

  .card-title, card-sub {
    color: ${({ theme }) => theme.main}!important;
  }

  .card-body {
    background: ${({ theme }) => theme.text};
    box-shadow: ${({ theme }) => theme.boxShadow
  };
  }

  button {
    background: ${({ theme }) => theme.main} !important;
    border: 1px solid ${({ theme }) => theme.accent}!important;
    color: ${({ theme }) => theme.text} !important;
    transition: all 2s ease-in;
  }

  btn-border:focus {
    border: 1px solid ${({ theme }) => theme.accent} !important;

  }

  .btn:hover {
    color: ${({ theme }) => theme.text};
  }

  .btn:focus {
    background-color: ${({ theme }) => theme.main} !important;
    border-color: 1px solid #d4af37 !important;
  }

  .carousel-control-next, .carousel-control-prev {
    background-color: ${({ theme }) => theme.main}!important;
    opacity: 1 !important;
    color: var(--gold) !important;
    transition: all 2s linear;

  }
  


`