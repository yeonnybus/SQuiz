// FileUpload.tsx
import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { uploadPdfFile } from "../api/axios";

const DropzoneArea = styled.div<{ isDragActive?: boolean }>`
  border: 2px dashed #eeeeee;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px; /* 원하는 높이로 조정 */
  background-color: ${(props) =>
    props.isDragActive ? "#e0e0e0" : "transparent"};
`;

interface FileUploadProps {
  token: string; // JWT 토큰을 props로 받습니다.
}

const FileUpload: React.FC<FileUploadProps> = ({ token }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = useCallback(async () => {
    if (selectedFiles.length === 0) return;

    try {
      const data = await uploadPdfFile(token, selectedFiles);
      console.log("File uploaded successfully", data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  }, [selectedFiles, token]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedFiles(acceptedFiles);
      handleSubmit(); // 파일이 드롭될 때 handleSubmit 호출
    },
    [handleSubmit]
  ); // 의존성 배열에 handleSubmit 추가

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { ref, ...rootProps } = getRootProps();

  return (
    <DropzoneArea ref={ref} {...rootProps} isDragActive={isDragActive}>
      <input {...getInputProps()} accept=".pdf" />
      {isDragActive ? (
        <p>파일을 여기에 놓으세요...</p>
      ) : (
        <p>파일을 드래그하거나 클릭하여 선택하세요.</p>
      )}
    </DropzoneArea>
  );
};

export default FileUpload;
