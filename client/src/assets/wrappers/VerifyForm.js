import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 2.5rem;
  }
  .form {
    max-width: 500px;
    height: auto !important;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  hr {
    background-color: var(--grey-100);
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  h5 {
    margin: 0;
    margin-top: 1.3rem;
    text-align: center;
    text-transform: initial;
  }

  article {
    margin: 0;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    text-align: justify;
    font-size: 0.98rem;
    color: var(--grey-600);
  }

  .input-fields {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.7rem;
  }

  .otp-form-input {
    width: 3.2rem !important;
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
