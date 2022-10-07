// ./gatsby-node.js

const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const productsQuery = await graphql(`
    query getData {
        strapi {
            categories(locale: "all") {
                data {
                    id
                    attributes {
                        name
                        slug
                        locale
                        localizations {
                            data  {
                                attributes {
                                    locale
                                }
                            }
                        }
                        products {
                            data {
                                attributes {
                                    locale
                                    title
                                    description
                                    price
                                    slug
                                    image {
                                        data {
                                            attributes {
                                                provider
                                                width
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `);

    // Template to create dynamic pages from.
    const productsTemplate = path.resolve(`src/pages/products.js`);

   /* productsQuery.data.strapi.categories.forEach(
        ({ title, id, products, price, slug, name, localizations, locale }) => {
            if (localizations.length > 0) {
                localizations.forEach((data) => {
                    data.locale
                    return createPage({
                        path: `product/${id}/${data.locale.toLowerCase()}`,
                        component: productsTemplate,
                        context: {
                            slug, name, title,
                            id, price, products, locale: data.locale,
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
    );*/

    productsQuery.data.strapi.categories.data.forEach(
        ({ title, id, products, price, slug, name, localizations, locale  }) => {
            if (localizations.data.length > 0) {
                localizations.data.forEach((data) => {
                    data.attributes.locale
                    return createPage({
                        path: `product/${id}/${data.attributes.locale.toLowerCase()}`,
                        component: productsTemplate,
                        context: {
                            slug, name, title,
                            id, price, products, locale: data.attributes.locale,
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