// ./src/components/header.js

import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Header = styled.header`
  height: 55px;
  background-color: #1a124b;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 3px white;
  nav {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    h5 {
      font-size: 1.1rem;
    }
  }
`;

const HeaderComponent = (props) => (
  <Header>
    <nav>
      <div>
        <Link to="/">
          <h5> STRAPI ECOM APP </h5>
        </Link>
      </div>

      <div>
        <p>{props.about}</p>
      </div>
    </nav>
  </Header>
);

export default HeaderComponent;