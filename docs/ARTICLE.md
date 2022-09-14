# How to Build An App With Internationalization Using Gatsby and Strapi i18n Plugin

# Outline

- Goal
- What you will learn
- Prerequisites
- Introduction
---
- **Backend Setup**
- Step 1: Create Strapi App
- Step 2: Setup GraphQL plugin
- Step 3: Configure Strapi i18n plugin
- Step 4: Add A New Locale
- Step 5: Enable Content-Type Localization
- Step 6: Add Locale Content
- Step 7: Test API
---
- **Frontend Setup**
- Step 8: Install Gatsby
- Step 9: Add a Wrapper
- Step 10: Add Styling
- Step 11: Configure Gatsby dependencies
- Step 12: Test GraphQL
- Step 13: Fetch data from Strapi API
- Step 14: Add Products Page
- Step 15: Add Home Page
---
- Step 16: Test App
- Conclusion

With the vast number of languages spoken by users worldwide in different regions, an application's ability to serve content to users in their locales gradually becomes a needed functionality for better user engagement and retention.

Through the [i18n plugin](https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#installation), Strapi supports the development of this functionality by providing application admins the ability to store data in different locales and serve them to users within the respective locales.

Within this article, we will explore more about the i18n plugin.
If you are interested in trying out the result of this tutorial before going through the article, we have it here for you to try out.

# Goal

This article aims to help you understand what Internationalization is and how you can implement it in a Strapi application. This article is broken down into the two sections below;

- Understanding what Internationalization is at a broad level.
- Using the [i18n plugin](https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#installation) to implement Internationalization within your Strapi application.

To keep this article focused on its primary goal, we will not create a new Strapi application, but instead use this [Strapi eCommerce template](https://github.com/strapi/strapi-template-ecommerce).

The demo application would be an eCommerce store containing localized content for courses to be sold. Using the [i18n plugin](https://strapi.io/features/internationalization), the eCommerce application would serve localized content from two locales to a front-end application built with Gatsby.

The complete app should be similar to this:
![Complete app](https://www.dropbox.com/s/vfspezp4nis5xnm/placeholder.png?raw=1)

# What you will learn

This article will help you understand what Internationalization is and how you can implement it in a new or existing Strapi application.
If you are new to Strapi, Strapi is easy to learn and feature-rich headless content management system (CMS) with support for PostgreSQL, MongoDB, SQLite, MySQL, and MariaDB.

# Prerequisites

To run the two demo applications within this tutorial, you need to have node v12 installed on your local machine and understand React.js as we build out the front-end application.

# Introduction

So far, you have seen the word [**Internationalization**](https://en.wikipedia.org/wiki/Internationalization) reoccur all over this article. — Let's pause at this point to understand what this recurring word really means.

From the [W3C definition](https://www.w3.org/International/questions/qa-i18n.en#i18n), Internationalization is said to be "the design and development of a product, application or document content that enables easy localization for various target audiences that vary in culture, region, or language."

You would often find Internationalization shortened to i18n, with "i" and "n" representing the first and last letters. In contrast, the number 18 represents the total number of letters when "i" and "n" are subtracted.

While Internationalization refers to designing a product for various target audiences, localization can be narrowed to refer to the **adaptation** of a product, application, or document content to meet the language, cultural and other requirements of a specific target market (a *locale*).

One important thing to note is that the application of Internationalization and localization, as defined above, varies across different products as each product has its various target audience across other localities with differing cultural requirements.
You would find the word **locale** used in various parts of this article. A locale refers to the language with which the content is being created with.

For developers managing the content of their application using Strapi, the recently released i18n plugin provides admins with the means of localising the content served to their end-users.

# Backend Setup

# Step 1: Create Strapi Project

For this tutorial, we'll use the [Ecommerce template](https://github.com/strapi/strapi-template-ecommerce) developed by Remi and connect a Gatsby app to it for fetching the pre-stored data.

>**Note**: 
>
>*For this tutorial, we will use yarn as the package manager. You can, however, use npm if preferred.*

In your terminal, create an empty project directory to store your project. This folder would serve as the root folder. The frontend application and backend code will be stored in subdirectories. I will name my project directory `bluedolphin`.

```bash
$ mkdir bluedolphin
```

Change directory to the project directory `bluedolphin`.
```bash
$ cd bluedolphin
```

Initialize source control.
```bash
/bluedolphin $ git init
```

Create a strapi application with the Ecommerce template:
```bash
/bluedolphin $ yarn create strapi-app backend --quickstart --template https://github.com/strapi/strapi-template-ecommerce 
```

This command creates your Strapi app in the folder named `backend`. The `--quickstart` flag sets up your Strapi app with an SQLite database. The `--template` flag retrieves the specific template to install in your app. In this case, we retrieved the `strapi-template-ecommerce`, hosted by `strapi` on GitHub.

After a successful installation, the CLI would automatically start the Strapi application. Open the **Strapi Admin Registration** interface from your web browser at [http://localhost:1337/admin](http://localhost:1337/admin) to create the admin user for your Strapi application.

![Strapi Admin Registration](https://www.dropbox.com/s/vfspezp4nis5xnm/placeholder.png?raw=1)

The Ecommerce template you just cloned contains the following;

- Three prebuilt collection types:
    - Categories
    - Users
    - Products
- A project that has already populated data within the collection types above.

![Strapi Dashboard](https://www.dropbox.com/s/vfspezp4nis5xnm/placeholder.png?raw=1)

Feel free to modify the existing data. They provide a good starting point for building this project.

# Step 2: Set up GraphQL plugin

Next, install the [GraphQL plugin](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html) to add GraphQL support to this Strapi Application.

```bash
/bluedolphin $ cd backend
/bluedolphin/backend $ yarn strapi install graphql
```

After installing the plugin above, you can access your project's GraphiQL playground at [http://localhost:1337/graphql](http://localhost:1337/graphql) to write queries and mutations for working with the existing data.

# Step 3: Configure Strapi Internationalization (i18n) Plugin

The [Internationalization plugin](https://strapi.io/features/internationalization) gives Strapi application admins the feature to create, manage and distribute localized content across different languages, also known as locales.

Rather than automatically translate delivered content, the i18n plugin allows developers to fetch the right content based on the user's locale.

>**Note**:
> 
>*The i18n plugin ships by default with Strapi applications running on version 4.x.x. Please refer to the* [*installation*](https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#installation) *section of the plugin documentation*.

By default, the i18n plugin has `en` ( English ) as the default locale. However, more locales and their respective content can be added either using the Admin panel or the Strapi Content API.

We would add one more locale to the categories content-type en locale shipped with the cloned eCommerce template for this guide.


Using the [Admin panel](https://docs.strapi.io/developer-docs/latest/development/admin-customization.html), navigate to **the Settings** page of your Strapi application, then click on the **Internationalization** option within the **Global Settings**

![Internationalization Settings](https://paper-attachments.dropbox.com/s_E9465E6BF58AAED0BF9285C24F68A0129D259F28691705ADE2170BBEFA500B1A_1621048098879_locale-btn.png)

# Step 4: Add A New Locale

- Locate and click the **Add a Locale** button at the top right corner to open the locale modal. 
- Using the locales dropdown, select a new locale, select a display name, or leave the default locale name.

For this guide, use the `fr` locale with a default display name of French as shown below;

![Locale Configuration](https://paper-attachments.dropbox.com/s_E9465E6BF58AAED0BF9285C24F68A0129D259F28691705ADE2170BBEFA500B1A_1621048491412_locale-configuration.png)


# Step 5: Enable Content-Type Localization

By default, the content types within the cloned eCommerce template do not have localization enabled. 

- Click on **Content-Types Builder** in your Strapi dashboard.
- Select the content type to be localized.
- Click the edit pencil icon of the chosen content type to open the edit icon.
- From the edit modal, click the **Advanced Settings** tab, then enable localization using the checkbox at the bottom of the modal.

![Enable Localization](https://paper-attachments.dropbox.com/s_E9465E6BF58AAED0BF9285C24F68A0129D259F28691705ADE2170BBEFA500B1A_1621051131371_enable-localization.png)


# Step 6: Add Locale Content

As stated earlier, the i18n plugin does not automatically translate content stored with Strapi into different locales; instead, it gives admins the feature to store and deliver multiple locale entries.

We will only create one new product for this guide and link it to an existing category to work with the i18n plugin. This should be enough to give you a working idea when implementing Internationalization with the i18n plugin in your application.

- Navigate to the **Products** content-type page and click the **Add New Products** button to create a new product.
- Enter a localized **title**, **price**, **description**, and any **image** to represent this product. You can use a translation service like [Google Translate](https://paper.dropbox.com/ep/redirect/external-link?url=https%3A%2F%2Ftranslate.google.com%2F&hmac=MgEmKwxEZ8ok6K0i9io0Mwd7qwo370LwHr%2FDA8NNFHM%3D) to translate the content.
- Within the **Internationalization** section in the box positioned at the right, click the **locales** dropdown to select the newly created `fr` (French) locale.
- Click on **Save** to save this new category.

![Localized Products](https://paper-attachments.dropbox.com/s_E9465E6BF58AAED0BF9285C24F68A0129D259F28691705ADE2170BBEFA500B1A_1621055552167_localized-product.png)

Next link this product with the previously created category.

- Navigate to the **Categories** collection-type page to see a list of all categories created in the default English (en) locale.
- Click the **locale** dropdown at the right to switch from the default English (`en`) locale to the recently created French (`fr`) locale. 
- Select the **base de données** category in `fr` locale that was created.
- From the products list positioned at the bottom right of the category page, select the "**base de données relationnelle**" as a product to link the category.
- Click on **Save** to save the new category.

The Strapi application has been fully set up with the i18n plugin, as we have created a new French ( fr ) locale, added a new category in this locale, and linked a product to the category.

# Step 7: Test the API

You can now fetch localized content from your Strapi application using the Strapi GraphQL content API.

# Frontend Setup

# Step 8: Install Gatsby 

Now that the backend is set, open up a new terminal and navigate to the root of your project folder `bluedolphin`.

```bash
$ cd /bluedolphin
```

Launch the Gatsby installer to create a Gatsby application with the name `frontend` from your terminal using the command below;

```bash
/bluedolphin $ npm init gatsby
```

After the installation process is completed, you run the development server of the newly created Gatsby application to be sure the installation was successful.

```bash
/bluedolphin $ cd frontend
```

# Step 9: Add a Wrapper

Create a `components` folder within the `src` directory.
```bash
/bluedolphin/frontend $ mkdir src/components
```

Create a `layout.js` file in the components folder. 
```bash
/bluedolphin/frontend $ touch src/components/layout.js
```

Copy and paste the following code into the `layout.js` file.
```js
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
```
The code above creates a wrapper using React-helmet to wrap each page with styles from [Bootstrap](https://getbootstrap.com/docs/3.3/getting-started/) using a CDN link.

# Step 10: Add Styling

Create a `styles.js` file in the `src` directory. 

```bash
/bluedolphin/frontend $ touch src/styles.js
```

This stylesheet is where you would keep all CSS-in-js styles created using Styles-components.

Copy and paste the following code into `styles.js`.

```js
// ./src/styles.js

import styled from "styled-components";
    
export const Cards = styled.ul`
    display: grid;
    padding-top: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 2rem 1rem;
    place-items: center;
`;
    
export const Item = styled.div`
    height: 370px;
    width: 300px;
    border-radius: 7px;
    box-shadow: 0 2px 3px #c0c0c0;
    background: #fff;
    color: #1d1b84;
    text-align: center;
    div {
    padding: 0.1rem 0.5rem;
    h4 {
        text-align: center;
        font-weight: 600;
    }
    }
`;
    
export const Button = styled.button`
    background: #1d1b84;
    border: 1px solid #1d1b84;
    color: #fff;
    border-radius: 3px;
    padding: 0.3rem 1rem;
`;
    
export const Image = styled.img`
    height: 250px;
    width: 250px;
    object-fit: contain;
`;
    
export const Flex = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justify};
`;
    
export const Banner = styled.div`
    padding: 2rem 3rem;
    text-align: center;
    h4 {
    font-weight: 600;
    }
`;
    
export const CategoryCtn = styled.div`
    width: 20rem;
    padding: .5rem 1rem;
    background: #fff;
    margin: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 3px #c0c0c0;
`
    
export const Container = styled.div`
    background: #ebf4fd;
    height: calc(100vh - 110px);
`;
```

The styles exported in the file above would be used when creating other components.

# Step 11: Configure Gatsby dependencies

Install the following extra dependencies needed for this Gatsby application;

```bash
/bluedolphin/frontend $ yarn add gatsby-source-graphql moment react-icons styled-components babel-plugin-styled-components
``` 

Modify the `gatsby-config.js` file in the root of your `frontend` folder with the code below to register the plugins installed above.

```js
// ./gatsby-config.js

module.exports = {
    siteMetadata: {
    title: "i18n-frontend",
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
            url: `${process.env.GATSBY_STRAPI_GRAPHQL_ENDPOINT}/graphql`,
        },
    },
    ],
};
```

In the configuration file above, you have registered [styled components](https://www.gatsbyjs.com/docs/how-to/styling/styled-components/#gatsby-skip-here) for styling the application.

Also, using the [*gatsby-source-graphql*](https://www.gatsbyjs.com/plugins/gatsby-source-graphql) plugin, you configured the Gatsby application to connect with your Strapi Application using its GraphQL API endpoint stored in [environment variables](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables).

You probably don't have the `GATSBY_STRAPI_GRAPHQL_ENDPOINT` environment variable yet.

Create a `.env` file in the root folder of your Gatsby application.

```bash
/bluedolphin/frontend $ touch .env
```

Add the following code to `.env`.

```rb
# ./.env

GATSBY_STRAPI_GRAPHQL_ENDPOINT="http://localhost:1337/api"
```

Next, restart the Gatsby development server. Press `Ctrl` plus `C` on your keyboard to stop the server and then start it using `yarn start`.
```bash
^C
/bluedolphin/frontend $ yarn start
```

This ensures the remote Strapi schema will be merged into the Gatsby application schema.

# Step 12: Test GraphQL

Using GraphQL editor for your Gatsby application at [http://localhost:8000/___graphql](http://localhost:8000/___graphql), test the GraphQL Query in the image below that you would make from the gatsby application to retrieve data from your Strapi Application.

![Gatsby GraphQL Playground](https://paper-attachments.dropbox.com/s_E9465E6BF58AAED0BF9285C24F68A0129D259F28691705ADE2170BBEFA500B1A_1621109421026_strapi-gatsby-graphql.png)


In the GraphiQL playground above, you can observe the result of the `getData` query executed to retrieve data from your running Strapi application. Also, the GraphiQL playground shows the Strapi fields that have been merged in the Gatsby application schema.

Now that the Strapi Schema has been merged with your Gatsby application schema, you can perform GraphQL operations directly from the application.

# Step 13: Fetch data from Strapi API

Create a `gatsby-node.js` file in the root folder of the gatsby application. 

```bash
/bluedolphin/frontend $ touch gatsby-node.js
```

Copy and paste the code snippet below into `gatsby-node.js`:

```js
// ./gatsby-node.js

const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const productsQuery = await graphql(`
    query getData {
        strapi {
        categories(locale: "all") {
            locale
            id
            name
            slug
            localizations {
                locale
            }
            products {
            locale
            title
            description
            price
            slug
            image {
                provider
                width
            }
            }
        }
        }
    }
    `);

    // Template to create dynamic pages from.
    const productsTemplate = path.resolve(`src/pages/products.js`);

    productsQuery.data.strapi.categories.forEach(
    ({ title, id, products, price, slug, name, localizations, locale }) =>
    {
        if (localizations.length > 0) {
            localizations.forEach((data) => {
                data.locale
                    return createPage({
                        path: `product/${id}/${data.locale.toLowerCase()}`,
                        component: productsTemplate,
                        context: { 
                        slug, name, title,
                        id, price, products, locale : data.locale, 
                        localizations 
                        },
                    })
            })
        }

        return createPage({
            path: `product/${id}/${locale}`,
            component: productsTemplate,
            context: { slug, name, title, id, price, products, locale, localizations }
        })
    }
    );
};
```
                                                            
The code above is used to fetch data from the Strapi application and create dynamic pages with the fetched data.

You would observe the following operations below performed to retrieve data from the Strapi application from the file above:

1. The `getData` query is executed with a `locale` parameter to fetch `all` categories content-type in the Strapi application.
2. An iteration is made on each category contained in the returned array. 
3. Each time the iteration is made, a dynamic page is created using Gatsby's [create page](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs) API with the `product.js` component as a template, passing the `locale` and `id` of the category into the component as props.

>**Note:** 
>
>*The `path` option specifies the `URL` of each of the dynamic pages. In our use case, each dynamic page created is differentiated using the unique category `id` generated by Strapi.*

When an iteration is made, we also check if the category has localized content in it. The Strapi Content API would return an empty array if a collection type has localization enabled but has no localized content.

If a collection type has localized content in our use case, a new dynamic page is created to display content in that locale.

Before we restart the Gatsby development server for the new changes in the `gatsby-node.js` file to take effect we will create the `product` template and a `home` page to display all categories.

# Step 14: Add Products Page

Create a `products.js` file in the `src/pages` directory.

```bash
/bluedolphin/frontend $ touch src/pages/products.js
```

Copy and paste the following code into your `products.js` file:

```js
// ./src/pages/products.js

import React, { useState } from "react";
import { Cards, Item, Button, Image, Flex, Banner, Container } from "./styles";
import {graphql, Link, navigate} from 'gatsby'

import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "../components/layout";

const shrinkText = (text, length) => {
    let txt = text.split(" ");

    if (txt.length < 7) {
    return text;
    }

    return [ ...txt.splice(0, length), '...' ].join(" ")
};

const Index = ({ pageContext, data }) => {
    const { name, localizations, id } = pageContext;
    const { categories } = data.strapi

    return (
    <Layout>
        <Header />
        <Container>
        <Banner>
            <br />
            <h4 style={{ textAlign: "center" }}> {name} </h4>

            <p> Display products in:
            {categories[0].localizations.map(({ locale}) =>
                <Link to={`/product/${id}/${locale.toLowerCase()}`} >
                    <span style={{padding : "0 .5rem"}} > {locale} </span>
                </Link>
            )}
            </p>
        </Banner>
        <hr />

        <Cards>
            {categories.map(({products}) =>
                products.map(({ id, title, price, description }) => (
                    <Item key={id}>
                        <div>
                        <Image
                            src={
                                "https://res.cloudinary.com/dkfptto8m/image/upload/v1620468926/shirts.jpg"
                            }
                        />
                        <h5> {title} </h5>
                        <p style={{opacity : ".8"}} >{shrinkText(description, 4)} </p>

                        <Flex direction="row" justify="space-between">
                            <div>
                            <p style={{ textAlign: "left" }}> ${price} </p>
                            </div>

                            <div>
                            <Button>Buy Now</Button>
                            </div>
                        </Flex>
                        </div>
                    </Item>
                )))}
        </Cards>
        <Footer />
        </Container>
    </Layout>
    );
};

export const query = graphql`
        query fetchLocaleData($locale: String) {
            strapi {
            categories(locale: $locale) {
                localizations {
                    locale
                }
                products {
                title
                description
                price
                }
            }
            }
        }
`

export default Index;
```

Going through the code block above, which makes up the product component, you would observe the following:

- Although the page is created dynamically using the `createPages` API, the component makes an extra graphQL query to fetch localised content using the locale value passed in from the [createPages](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs) API when the page is created dynamically.
- All available locales are displayed at the top banner giving users the feature to click on the links to view the page content in another locale.

Restart your Gatsby development server for the changes to take effect:
```bash
^C
/bluedolphin/frontend $ yarn start
```

Navigate to the [http://localhost:8000/product/1/en](http://localhost:8000/product/1/en), it should display the product page with an `id` of *1*, having *back* as the category name as shown below;

![Products Page for Backend Category](https://paper-attachments.dropbox.com/s_E9465E6BF58AAED0BF9285C24F68A0129D259F28691705ADE2170BBEFA500B1A_1621171307816_category-products.png)


The image above shows all products within the **Backend** category served in the English (`en`) locale. The top banner contains links to other pages containing products for the same category but in a different locale.

For example, clicking the `fr` link would display products in the French locale as shown below:

![Products Page for Backend Category (French Locale)](https://paper-attachments.dropbox.com/s_E9465E6BF58AAED0BF9285C24F68A0129D259F28691705ADE2170BBEFA500B1A_1621171393979_fr-product.png)


Above, we can see the recently created product with the backend category displayed in the `fr` locale.

# Step 15: Add Home Page

Next, create a home page that loads all categories with links to their respective products.

Create a `home.js` file within the `src/pages` directory.

Copy and paste the following code into your `home.js` file:

```js
// src/pages/home.js

import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { FiCalendar, FiBook } from "react-icons/fi";
import moment from "moment";

import {
    Container,
    Flex,
    Banner,
    Cards,
    CategoryCtn,
} from "./styles";
import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "../components/layout";

const Index = ({ pageContext }) => {
    const {strapi} = useStaticQuery(graphql`
    query fetchAllCourses {
        strapi {
        categories {
            id
            name
            created_at
            slug
            locale
            products { id }
        }
        }
    }
    `);

    return (
    <Layout>
        <Header />
        <Container>
        <Banner>
            <h4> STRAPI COURSE STORE </h4>
            <p> A Course Store With Support For Internationalization </p>
        </Banner>
        <hr />

        <Cards >
            {strapi.categories.map(({ id, name, products, created_at, locale }) => (
            <CategoryCtn key={id}>
                <div>
                <Link to={`/product/${id}/${locale}`}>
                    <h5> {name} </h5>
                </Link>
                <Flex
                    direction="row"
                    style={{
                    opacity: ".8",
                    }}
                >
                    <div
                    style={{
                        marginRight: ".3rem",
                    }}
                    >
                    <FiCalendar size={19} />
                    </div>

                    <div>Added {moment(created_at).format("dddd mm yyyy")}</div>
                </Flex>
                <hr />
                <br />

                <Flex direction="row">
                    <div
                    style={{
                        marginRight: ".3rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >
                    <FiBook size={19} />
                    </div>

                    <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >
                    {products.length} Courses Available
                    </div>
                </Flex>
                </div>
            </CategoryCtn>
            ))}
        </Cards>
        <Footer />
        </Container>
    </Layout>
    );
};

export default Index;
```

Restart your server for the changes to take effect:

```bash
^C
/bluedolphin/frontend $ yarn start
```

# Step 16: Test App

Navigate to your Gatsby application's homepage, [http://localhost:8000](http://localhost:8000). If it is working correctly, you should see the categories fetched from your Strapi application.

![Gatsby App Home Page](https://paper-attachments.dropbox.com/s_E9465E6BF58AAED0BF9285C24F68A0129D259F28691705ADE2170BBEFA500B1A_1621171710203_strapi-categories.png)


At this point, clicking on any of the categories shown in the image above would navigate you to the product page showing the list of products within that category.

# Conclusion

Huge congrats to you. By going through this article, you have learned about Internationalization and localization and how the i18n plugin helps you achieve localization in your Strapi application regarding stored content.

First, we started by explaining what the terms localization and Internationalization meant.

Secondly, we cloned an existing Strapi application using the eCommerce template. Then, we created a new locale and enabled localization on the current content types from the admin panel, after which we inserted a new product in a French (`fr`) locale.

Lastly, we created a new Gatsby application to fetch localized data from the Strapi application.

The [source code](https://github.com/Marktawa/tags-strapi-bluedolphin) for this tutorial is available for you to test.

What next? 

Check out some deployment guides if you want to know how to deploy this app in production. Or add some more functionality to this app using plugins in the [Strapi Marketplace](https://market.strapi.io).

