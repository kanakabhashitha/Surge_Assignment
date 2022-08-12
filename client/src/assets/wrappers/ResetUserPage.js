import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;

  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 65%;
    border-top: 5px solid var(--primary-500);
  }
  .row-container {
    display: grid;
    column-gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }

  hr {
    background-color: var(--grey-100);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  h5 {
    margin: 0;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    text-align: center;
    text-transform: initial;
  }

  .btn {
    margin-top: 1rem;
  }

  .otp-field {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.7rem;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    button {
      height: 35px;
    }
  }

  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  .otp-form-input {
    width: 3.5rem !important;
    height: 60px;
    color: black !important;
    margin: 0 1rem;
    text-align: center;
    padding: 0.375rem 0.75rem;
    font-weight: 600;
    font-size: 35px;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }
`;
export default Wrapper;
