import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Moon } from "../assets/icon-moon.svg";
import userImg from "../assets/image-avatar.jpg";

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <LogoDiv>
          <Logo />
        </LogoDiv>
      </StyledLink>
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

  @media only screen and (min-width: 900px) {
    //display: flex;
    flex-direction: column;
    border-radius: 0px 20px 20px 0px;
  }
`;

const LogoDiv = styled.div`
  background: #7c5dfa;
  padding: 23px;
  border-radius: 0px 20px 20px 0px;
  position: relative;
  overflow: hidden;

  @media only screen and (min-width: 900px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

    @media only screen and (min-width: 900px) {
      position: absolute;
      width: 40px;
      height: 40px;
    }
  }
`;

const SwitcherUserDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 900px) {
    flex-direction: column;
  }

  svg {
    margin-right: 24px;

    @media only screen and (min-width: 900px) {
      margin-right: 0px;
      margin-bottom: 32px;
    }
  }

  img {
    width: 32px;
    border-radius: 50%;
    margin: 20px 20px 20px 24px;
    //border-left: 2px solid red;

    @media only screen and (min-width: 900px) {
      margin: 24px 30px;
      width: 40px;
    }
  }

  & > div {
    border-left: 1px solid #494e6e;

    @media only screen and (min-width: 900px) {
      border-top: 1px solid #494e6e;
      border-left: none;
    }
  }
`;

const StyledLink = styled(Link)`
  @media only screen and (min-width: 900px) {
    width: 100px;
    height: 100px;
  }
`;
