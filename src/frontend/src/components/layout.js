// ./src/components/layout.js
    
import React from "react";
import { Helmet } from "react-helmet";
    
const Layout = ({ children }) => (
    <div>
    <Helmet defer={false}>
        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
        />
    </Helmet>
    {children}
    </div>
);
    
export default Layout;