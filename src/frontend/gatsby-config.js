module.exports = {
  siteMetadata: {
    title: `Strapi Ecom App`,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
        resolve: "gatsby-plugin-manifest",
        options: {
        icon: "src/images/icon.png",
        },
    },
    { resolve: `gatsby-plugin-styled-components`},
    {
        resolve: "gatsby-source-graphql",
        options: {
            // Arbitrary name for the remote schema Query type
            typeName: "STRAPI",
            // Field for remote schema. You'll use this in your Gatsby query
            fieldName: "strapi",
            url: `http://localhost:1337/graphql`,
        },
    },
  ],
}
