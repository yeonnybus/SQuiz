// styles.ts
import styled from "styled-components";

export const CenteredContainer = styled.div`
  display: flex;

  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Nanum Gothic", sans-serif;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  height: 500px;
  background-color: white;
  padding: 50px;
  border-radius: 24px;
`;
