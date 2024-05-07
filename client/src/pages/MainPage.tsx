// MainPage.tsx
import React from "react";
import { CenteredContainer, FormContainer } from "../widgets/styles";
import FileUpload from "../components/FileUpload";

const MainPage: React.FC = () => {
  const jwtToken = "여기에 JWT 토큰을 넣으세요."; // 실제 애플리케이션에서는 환경변수나 상태 관리를 통해 관리해야 합니다.

  return (
    <CenteredContainer>
      <FormContainer>
        <FileUpload token={jwtToken} />
      </FormContainer>
    </CenteredContainer>
  );
};

export default MainPage;
