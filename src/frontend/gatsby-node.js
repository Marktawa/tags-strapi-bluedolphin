// ./gatsby-node.js

const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const categoriesQuery = await graphql(`
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
    const categoryTemplate = path.resolve(`src/pages/categories.js`);

    categoriesQuery.data.strapi.categories.data.forEach(
        (category) => {
            if (category.attributes.localizations.data.length > 0) {
                category.attributes.localizations.data.forEach((localization) => {
                    localization.attributes.locale
                    return createPage({
                        path: `category/${category.id}/${localization.attributes.locale.toLowerCase()}`,
                        component: categoryTemplate,
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
                path: `category/${category.id}/${category.attributes.locale}`,
                component: categoryTemplate,
                context: { 
                    slug: category.attributes.slug, 
                    name: category.attributes.name, 
                    id: category.id, 
                    products: category.attributes.products, 
                    locale: category.attributes.locale,
                    localizations: category.attributes.localizations 
                },
            })
        }
    );
};