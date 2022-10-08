// ./src/components/footer.js

import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  height: 55px;
  background-color: #1a124b;
  width: 100%;
  position: fixed;
  bottom: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  h5 {
      padding-top : 10px;
      font-size: 1.2rem;
  }
`;

const FooterComponent = (props) => (
  <Footer>
    <h5>
      {" "}
      Designed and built by{" "}
      <a href="https://github.com/Marktawa"> Mark Munyaka </a>{" "}
    </h5>
  </Footer>
);

export default FooterComponent;