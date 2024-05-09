// MainPage.tsx
import React from "react";
import { CenteredContainer, FormContainer } from "../widgets/styles";
import FileUpload from "../components/FileUpload";

const MainPage: React.FC = () => {
  const jwtToken = localStorage.getItem("authToken") || "";

  return (
    { jwtToken } && (
      <CenteredContainer>
        <FormContainer>
          <FileUpload token={jwtToken} />
        </FormContainer>
      </CenteredContainer>
    )
  );
};

export default MainPage;
