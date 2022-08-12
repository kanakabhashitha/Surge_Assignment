import styled from "styled-components";

const Wrapper = styled.section`
  text-align: center;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
  .loading {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;
export default Wrapper;
