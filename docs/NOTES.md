# Gatsby Set up

```bash
markmunyaka@cloudshell:~$ npm init gatsby
Need to install the following packages:
  create-gatsby@2.24.0
Ok to proceed? (y) y
create-gatsby version 2.24.0



                                                                            Welcome to Gatsby!



This command will generate a new Gatsby site for you in /home/markmunyaka with the setup you select. Let's answer some questions:


                                                                            Welcome to Gatsby!



This command will generate a new Gatsby site for you in /home/markmunyaka with the setup you select. Let's answer some questions:
What would you like to call your site?
✔ · Strapi Ecom Site
What would you like to name the folder where your site will be created?
✔ markmunyaka/ frontend
✔ Will you be using JavaScript or TypeScript?
· JavaScript
✔ Will you be using a CMS?
· No (or I'll add it later)
✔ Would you like to install a styling system?
· No (or I'll add it later)
✔ Would you like to install additional features with other plugins?No items were selected


Thanks! Here's what we'll now do:

    🛠  Create a new Gatsby site in the folder frontend

✔ Shall we do this? (Y/n) · Yes
✔ Created site from template
```

# Gatsby GraphiQL Playground

```yml
# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#     Merge Query:  Shift-Ctrl-M (or press the merge button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#

```

## Get images GraphQL

```js
<Image
  src={
    `http://localhost:1337/${product.attributes.image.data.attributes.url}`
  }
/>

<Cards>
  {categories.data[id].attributes.products.data.map(( product ) => (
      <Item key={product.id}>
          <div>
            <Image
              src={
                  `http://localhost:1337/${product.attributes.image.data.attributes.url}`
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
```

### Localize price and "Buy Now"

```js
<div>
      {if (categories.data[0].attributes.locale === "fr")
        <p style={{ textAlign: "left" }}>€ {product.attributes.price}</p>
      else
        <p style={{ textAlign: "left" }}>$ {product.attributes.price}</p>
      }
</div>
```

Using ternary operator
```js
<div>
  <p style={{ textAlign: "left" }}>
    {categories.data[0].attributes.locale === "fr" ? `€ ${product.attributes.price}` : `$ ${product.attributes.price}`}    
  </p>
</div>
```

```js
<Button>{categories.data[0].attributes.locale === "fr" ? "Acheter Maintenant" : "Buy Now"}</Button>
```

```js
<p>{categories.data[0].attributes.locale === "fr" ? " Afficher les produits en:" : " Display products in:"}</p>
```

```js
<Header about={categories.data[0].attributes.locale === "fr" ? "À propos" : "About" } />
```

```js
<h4>({categories.data[0].attributes.locale === "fr" ? "Français" : "English"})</h4>
```

```js
<span>{localization.attributes.locale === "fr" ? "Français" : "English"}</span>
```

```js
<Footer info={categories.data[0].attributes.locale === "fr" ? "Conçu et Construit par" : "Designed and Built by" } />
```