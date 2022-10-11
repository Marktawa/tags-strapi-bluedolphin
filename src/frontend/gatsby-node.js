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
    const homeTemplate = path.resolve(`src/pages/home.js`)

    categoriesQuery.data.strapi.categories.data.forEach(
        (category) => {
            if (category.attributes.localizations.data.length > 0) {
                category.attributes.localizations.data.forEach((localization) => {
                    localization.attributes.locale
                    createPage({
                        path: `category/${category.id}/${localization.attributes.locale.toLowerCase()}`,
                        component: categoryTemplate,
                        context: {
                            slug: category.attributes.slug, 
                            name: category.attributes.name, 
                            id: category.id, 
                            products: category.attributes.products, 
                            locale: localization.attributes.locale,
                            localizations: category.attributes.localizations
                        },
                    });
                    createPage({
                        path: `home/${localization.attributes.locale.toLowerCase()}`,
                        component: homeTemplate,
                        context: {
                            locale: localization.attributes.locale,   
                        },
                    })
                })
            }

            createPage({
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
            });
            createPage({
                path: `home/${category.attributes.locale}`,
                component: homeTemplate,
                context: {
                    locale: category.attributes.locale,   
                },
            })
        }
    );
};