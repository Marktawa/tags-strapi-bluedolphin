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
} from "../styles";
import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "../components/layout";

const Index = ({ pageContext }) => {
    const {strapi} = useStaticQuery(graphql`
    query fetchAllCourses($locale: STRAPI_I18NLocaleCode) {
        strapi {
            categories(locale: $locale) {
                data {
                    id
                    attributes {
                        name
                        createdAt
                        slug
                        locale
                        products(sort: "id", pagination: {pageSize: 20}) {
                            data {
                                id
                            }
                        }
                    }
                }
            }
        }
    }
    `);

    return (
    <Layout>
        <Header about={strapi.categories.data[0].attributes.locale === "fr" ? "À propos" : "About" } />
        <Container>
        <Banner>
            <h4> STRAPI COURSE STORE </h4>
            <p> A Course Store With Support For Internationalization </p>
        </Banner>
        <hr />

        <Cards >
            {strapi.categories.data.map((category) => (
            <CategoryCtn key={category.id}>
                <div>
                <Link to={`/category/${category.id}/${category.attributes.locale}`}>
                    <h5> {category.attributes.name} </h5>
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

                    <div>Added {moment(category.attributes.createdAt).format("dddd MMMM do, YYYY")}</div>
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
                    {category.attributes.products.data.length} Courses Available
                    </div>
                </Flex>
                </div>
            </CategoryCtn>
            ))}
        </Cards>
        <Footer info={strapi.categories.data[0].attributes.locale === "fr" ? "Conçu et Construit par" : "Designed and Built by" } />
        </Container>
    </Layout>
    );
};

export default Index;