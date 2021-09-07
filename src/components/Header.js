import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Moon } from "../assets/icon-moon.svg";
import userImg from "../assets/image-avatar.jpg";

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <LogoDiv>
          <Logo />
        </LogoDiv>
      </Link>
      <SwitcherUserDiv>
        <Moon />
        <div>
          <img src={userImg} alt="user" />
        </div>
      </SwitcherUserDiv>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #373b53;
`;

const LogoDiv = styled.div`
  background: #7c5dfa;
  padding: 23px;
  border-radius: 0px 20px 20px 0px;
  position: relative;
  overflow: hidden;

  &::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsl(252, 100%, 73%);
    border-radius: 20px 0;
  }

  svg {
    position: relative;
    z-index: 10;
  }
`;

const SwitcherUserDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 24px;
  }

  img {
    width: 32px;
    border-radius: 50%;
    margin: 20px 20px 20px 24px;
    //border-left: 2px solid red;
  }

  & > div {
    border-left: 1px solid #494e6e;
  }
`;
