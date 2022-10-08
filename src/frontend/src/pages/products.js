// ./src/pages/products.js

import React, { useState } from "react";
import { Cards, Item, Button, Image, Flex, Banner, Container } from "../styles";
import { graphql, Link, navigate } from 'gatsby'

import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "../components/layout";

const shrinkText = (text, length) => {
    let txt = text.split(" ");

    if (txt.length < 7) {
        return text;
    }

    return [...txt.splice(0, length), '...'].join(" ")
};

const Index = ({ pageContext, data }) => {
    const { name, localizations, id } = pageContext;
    const [currentLang, setCurrentLang] = useState("en")
    const { categories } = data.strapi

    return (
        <Layout>
            <Header />
            <Container>
                <Banner>
                    <br />
                    <h4 style={{ textAlign: "center" }}>{name}</h4>

                    <p> Display products in:
                        {categories.data[0].attributes.localizations.data.map((localization) =>
                            <Link to={`/product/${id}/${localization.attributes.locale.toLowerCase()}`} >
                                <span style={{ padding: "0.5rem" }} > {localization.attributes.locale} </span>
                            </Link>
                        )}
                    </p>
                </Banner>
                <hr />

                <Cards>
                {categories.data[id-1].attributes.products.data.map(( product ) => (
                            <Item key={product.id}>
                                <div>
                                    <Image
                                        src={
                                            `http://localhost:1337${product.attributes.image.data.attributes.url}`
                                        }
                                    />
                                    <h5> {product.attributes.title} </h5>
                                    <p style={{ opacity: ".8" }} >{shrinkText(product.attributes.description, 4)} </p>

                                    <Flex direction="row" justify="space-between">
                                        <div>
                                            <p style={{ textAlign: "left" }}> ${product.attributes.price} </p>
                                        </div>

                                        <div>
                                            <Button>Buy Now</Button>
                                        </div>
                                    </Flex>
                                </div>
                            </Item>
                        ))}
                </Cards>
                <Footer />
            </Container>
        </Layout>
    );
};

export const query = graphql`
    query fetchLocaleData($locale: STRAPI_I18NLocaleCode) {
        strapi {
            categories(locale: $locale) {
                data {
                    id
                    attributes {
                        name
                        slug
                        locale
                        localizations {
                            data {
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
`

export default Index;