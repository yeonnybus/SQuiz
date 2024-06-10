import React, { useState } from "react";
import styled from "styled-components";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/squizlogo.png"; // 로고 이미지 경로를 지정하세요.

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 80px;
  background: transparent;
  margin-bottom: 1%;
`;

const Logo = styled.img`
  height: 70px;
`;

const HeaderButton = styled(Button)`
  && {
    color: #333;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 5px 20px;
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // 로그인 페이지로 리다이렉트
  };

  return (
    <HeaderContainer>
      <Logo
        src={logo}
        alt="Logo"
        onClick={() => {
          navigate("/main"); // 뒤로 가기
        }}
      />
      <HeaderButton variant="contained" onClick={handleProfileClick}>
        Menu
      </HeaderButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick("/lastquiz")}>
          지난 퀴즈 목록
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/fruitbasket")}>
          과일 바구니
        </MenuItem>
        <MenuItem onClick={logout}>로그아웃</MenuItem>
      </Menu>
    </HeaderContainer>
  );
};

export default Header;
