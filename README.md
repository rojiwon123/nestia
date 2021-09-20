# Nestia
Automatic SDK generator for the NestJS.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/samchon/nestia/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/nestia.svg)](https://www.npmjs.com/package/nestia)
[![Downloads](https://img.shields.io/npm/dm/nestia.svg)](https://www.npmjs.com/package/nestia)
[![Build Status](https://github.com/samchon/nestia/workflows/build/badge.svg)](https://github.com/samchon/nestia/actions?query=workflow%3Abuild)

```bash
npm install --save-dev nestia
npx nestia sdk "src/controller" --out "src/api"
```

Don't write any `swagger` comment. Just deliver the SDK.

When you're developing a backend server using the `NestJS`, you don't need any extra dedication, for delivering the Rest API to the client developers, like writing the `swagger` comments. You just run this **Nestia** up, then **Nestia** would generate the SDK automatically, by analyzing your controller classes in the compliation and runtime level.

With the automatically generated SDK through this **Nestia**, client developer also does not need any extra work, like reading `swagger` and writing the duplicated interaction code. Client developer only needs to import the SDK and calls matched function with the `await` symbol.

```typescript
import api from "@samchon/bbs-api";
import { IBbsArticle } from "@samchon/bbs-api/lib/structures/bbs/IBbsArticle";
import { IPage } from "@samchon/bbs-api/lib/structures/common/IPage";

export async function test_article_read(connection: api.IConnection): Promise<void>
{
    // LIST UP ARTICLE SUMMARIES
    const index: IPage<IBbsArticle.ISummary> = await api.functional.bbs.articles.index
    (
        connection,
        "free",
        { limit: 100, page: 1 }
    );

    // READ AN ARTICLE DETAILY
    const article: IBbsArticle = await api.functional.bbs.articles.at
    (
        connection,
        "free",
        index.data[0].id
    );
    console.log(article.title, aritlce.body, article.files);
}
```




## Usage
### Installation
```bash
npm install --save-dev nestia
```

Installing the **Nestia** is very easy.

Just type the `npm install --save-dev nestia` command in your NestJS backend project.

### CLI options
```bash
npx nestia sdk <source_controller_directory> --out <output_sdk_directory>

npx nestia sdk "src/controllers" --out "src/api"
npx nestia sdk "src/consumers/controllers" "src/sellers/controllers" --out "src/api
```

To generate a SDK library through the **Nestia** is very easy. Just type the `nestia sdk <input> --out <output>` command in the console. If there're multiple source directories containing the NestJS controller classes, type all of them separating by a `space` word.


```bash
npx nestia install
```

Also, SDK library generated by the **Nestia** has some dependencies like below. When you type the `nestia install` command in the console, those dependencies would be automatically install and would be enrolled to the `dependencies` field in the `package.json`

  - [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)
  - [node-fetch](https://github.com/node-fetch/node-fetch)




## Demonstration
  - [Controllers of the NestJS](https://github.surf/samchon/nestia/blob/HEAD/src/test/controllers/base/SaleCommentsController.ts)
  - [Structures used in the RestAPI](https://github.surf/samchon/nestia/blob/HEAD/api/structures/sales/articles/ISaleArticle.ts)
  - [SDK generated by this **Nestia**](https://github.surf/samchon/nestia/blob/HEAD/api/functional/consumers/sales/reviews/index.ts)

### Controller
If you've decided to adapt this **Nestia** and you want to generate the SDK directly, you don't need any extra work. Just keep you controller class down and do noting. The only one exceptional case that you need an extra dedication is, when you want to explain about the API function to the client developers through the comments.

```typescript
@nest.Controller("consumers/:section/sales/:saleId/questions")
export class ConsumerSaleQuestionsController
{
    /**
     * Store a new question.
     * 
     * @param request Instance of the Express.Request
     * @param section Code of the target section
     * @param saleId ID of the target sale
     * @param input Content to archive
     * 
     * @return Newly archived question
     * @throw 400 bad request error when type of the input data is not valid
     * @throw 401 unauthorized error when you've not logged in yet
     */
    @nest.Post()
    public store
        (
            @nest.Request() request: express.Request,
            @nest.Param("section") section: string, 
            @nest.Param("saleId") saleId: number, 
            @nest.Body() input: ISaleQuestion.IStore
        ): Promise<ISaleQuestion>;
}
```

### SDK
When you run the **Nestia** up using the upper controller class `ConsumerSaleQuestionsController`, the **Nestia** would generate below function for the client developers, by analyzing the `ConsumerSaleQuestionsController` class in the compilation and runtime level.

As you can see, the comments from the `ConsumerSaleQuestionsController.store()` are fully copied to the SDK function. Therefore, if you want to deliver detailed description about the API function, writing the detailed comment would be tne best choice.

```typescript
/**
 * Store a new question.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param request Instance of the Express.Request
 * @param section Code of the target section
 * @param saleId ID of the target sale
 * @param input Content to archive
 * @return Newly archived question
 * @throw 400 bad request error when type of the input data is not valid
 * @throw 401 unauthorized error when you've not logged in yet
 * 
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 * @controller ConsumerSaleQuestionsController.store()
 * @path POST /consumers/:section/sales/:saleId/questions/
 */
export function store
    (
        connection: IConnection,
        section: string,
        saleId: number,
        input: store.Input
    ): Promise<store.Output>
{
    return Fetcher.fetch
    (
        connection,
        {
            input_encrypted: false,
            output_encrypted: false
        },
        "POST",
        `/consumers/${section}/sales/${saleId}/questions/`,
        input
    );
}
export namespace store
{
    export type Input = Primitive<ISaleInquiry.IStore>;
    export type Output = Primitive<ISaleInquiry<ISaleArticle.IContent>>;
}
```