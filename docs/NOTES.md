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

```js
{locale === "fr" ?
<p> 
" Afficher les catégories en:"
<Link to={`/home/en`}>Anglais</Link>
</p>
 :
 <p> 
 " Display categories in:"
 <Link to={`/home/fr`}>Anglais</Link>
 </p>
 }
 ```

 # Suggestions

 - Add References section to article
 - Host article images on another image hosting platform besides dropbox
 - Improve README sections for all key folders `docs`, `src` , root folder, and `tests`
 - Improve test data
 - Add individual product page with pagination
 - Handle content data from Strapi side
 - Fix GraphQL queries
 - Add vale to repo for document editing and proofreading
 - Implement markdown emmet
 - Learn Google Documentation Style Guide
 - Create auto gh repo for strapi projects (folders, gitignore, license, readme) 
 - Create auto codespace or gitpod with (ffmpeg, tree, glixcer, vale)
 - Create auto vscode config with (md, vale, word wrap, no minimap)
 
# References

- [Strapi - REST API: Filtering, Locale, and Publication State](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html)
- [Strapi - Internationalization (i18n)](https://docs.strapi.io/developer-docs/latest/plugins/i18n.html)
- [Strapi - GraphQL API](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/graphql-api.html)
- [Strapi - GraphQL](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html)
- [Stackoverflow - How can I embed a YouTube video on GitHub wiki pages?](https://stackoverflow.com/questions/11804820/how-can-i-embed-a-youtube-video-on-github-wiki-pages)
- [TinyPNG - Best Image Compression](https://tinypng.com/)
- [Promotion Template for Writers](https://strapi.notion.site/Promotion-Template-for-Writers-1645b77a97a640d2a32047297b6bc3f0)
- [**Original Article**](https://strapi.io/blog/building-applications-for-an-international-audience-using-strapi-i18n-plugin)
- [**Original Repo**](https://github.com/vickywane/strapi-i18n)
- [Github - Forwarding ports in your codespace](https://docs.github.com/en/codespaces/developing-in-codespaces/forwarding-ports-in-your-codespace)
- [Section - Getting Started With React, Strapi, and GraphQL](https://www.section.io/engineering-education/getting-started-with-react-strapi-graphql/)
- [Geeks for Geeks - Difference between forEach() and map() loop in JavaScript](https://www.geeksforgeeks.org/difference-between-foreach-and-map-loop-in-javascript/)
- [Mozilla - Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Mozilla - Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Stackoverflow - Access array inside an object](https://stackoverflow.com/questions/29140301/access-array-inside-an-object)
- [Gatsby - Environment Variables](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/)
- [Momentjs](https://momentjs.com/)
- [Gatsby - Creating and Modifying Pages](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/)
- [Gatsby - GraphiQL](http://localhost:8000/__graphql)
- [Strapi - GraphQL Playground](http://localhost:1337/graphql)
- [Gatsby - Actions](https://www.gatsbyjs.com/docs/reference/config-files/actions/)
- [Bannerbear - How to Make a GIF from a Video Using FFmpeg](https://www.bannerbear.com/blog/how-to-make-a-gif-from-a-video-using-ffmpeg/)
- [Visual Studio Code - Github Codespaces](https://code.visualstudio.com/docs/remote/codespaces)
- [Shotstack - How to trim a video using FFmpeg](https://shotstack.io/learn/use-ffmpeg-to-trim-video/)
- [Stack Exchange - How do I convert a video to GIF using ffmpeg, with reasonable quality?](https://superuser.com/questions/556029/how-do-i-convert-a-video-to-gif-using-ffmpeg-with-reasonable-quality)
- [Reactjs - Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [Reactjs - Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [Reactjs - Components and Props](https://reactjs.org/docs/components-and-props.html)
- [Mozilla - Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [**Project Repo**](https://github.com/Marktawa/tags-strapi-bluedolphin)