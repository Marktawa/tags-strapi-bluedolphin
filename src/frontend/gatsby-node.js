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
                                id
                                attributes {
                                    locale
                                    title
                                    description
                                    price
                                    slug
                                    image {
                                        data {
                                            attributes {
                                                url
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
        (category) => {
            if (category.attributes.localizations.data.length > 0) {
                category.attributes.localizations.data.forEach((localization) => {
                    localization.attributes.locale
                    return createPage({
                        path: `product/${category.id}/${localization.attributes.locale.toLowerCase()}`,
                        component: productsTemplate,
                        context: {
                            slug: category.attributes.slug, 
                            name: category.attributes.name, 
                            title: category.attributes.title,
                            id: category.id, 
                            price: category.attributes.price, 
                            products: category.attributes.products, 
                            locale: localization.attributes.locale,
                            localizations: category.attributes.localizations
                        },
                    })
                })
            }

            return createPage({
                path: `product/${category.id}/${category.attributes.locale}`,
                component: productsTemplate,
                context: { 
                    slug: category.attributes.slug, 
                    name: category.attributes.name, 
                    title: category.attributes.title,
                    id: category.id, 
                    price: category.attributes.price, 
                    products: category.attributes.products, 
                    locale: category.attributes.locale,
                    localizations: category.attributes.localizations 
                },
            })
        }
    );
};