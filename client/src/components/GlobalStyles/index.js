import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.main} !important;
    color: ${({ theme }) => theme.text} !important;
    transition: 2s linear;
  }

  .title, .nav-link {
    color: ${({ theme }) => theme.text}!important;
    transition: all 2s linear;
  }

  .card-title, card-sub {
    color: ${({ theme }) => theme.main}!important;
  }

  .card-body {
    color: ${({ theme }) => theme.main}!important;
    background: ${({ theme }) => theme.text};
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  .card-contact {
    margin: 0 30% 1% 30%;
    border-bottom: 1px solid ${({ theme }) => theme.main};
  }
  

  button {
    background: ${({ theme }) => theme.main} !important;
    border: 1px solid ${({ theme }) => theme.accent}!important;
    color: ${({ theme }) => theme.text} !important;
    transition: all 2s ease-in;
  }

  .see-card-btn {
    background: ${({ theme }) => theme.main} !important;
    border: 1px solid ${({ theme }) => theme.accent}!important;
    color: ${({ theme }) => theme.text} !important;
    transition: all 2s ease-in;

  }
  
  .add-btn:hover {
    background: ${({ theme }) => theme.main} !important;
    color: ${({ theme }) => theme.text} !important;
  }

  .start-btn {
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

  .delete-btn, .edit-btn {
    background-color: ${({ theme }) => theme.text}!important;
    border: none !important;
    width: 15%;
    z-index: 9999; 
    margin-top: 37%;   
  }

  .single-card {
    height: 17rem;
    background-color: ${({ theme }) => theme.text}!important;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }

  .qr-body {
    box-shadow: none !important;
    position: absolute;
    width: 100% !important;
    margin-left: 0 auto;
  }

  .caro-single {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
  
  .remove-btn:hover {
    background-color: ${({ theme }) => theme.main} !important;
    border-color: 1px solid #d4af37 !important;
    transition: none !important;
  }

  .modal-header {
    background-color: ${({ theme }) => theme.main} !important;
    border-bottom: 1px solid #1b1b1b;
    box-shadow: inset -70px -55px 60px -70px var(--gold) !important;

  }
  
  


`