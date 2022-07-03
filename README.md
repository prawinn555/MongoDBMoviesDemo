# Service with MangoDB 🐩

## An interesting article

https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database



## configuration 🐩

see `.env` file.


```
DB_URI=mongodb+srv://<user>:<password>@<mangoDBHost>
```


* Free server @ https://www.mongodb.com/cloud/atlas.🥳🥳🥳
* Don't forget to configure the allowed client IP adresses (you can allow all IP adresses). 😇
* You can load sample data (such as movies Mflix).


## How to run 🐩

classic way 🎄

```
npm start
```

## Service URL : find movies 🐩

🎞️   📽️  🎬   🎥   🎦 

```
http://<host>/api/movies?filter=<filter>&limit=<limit>&order=<order>
```

Parameters 
* filter : search criteria in JSON, optional (by default everything)
* limit : optional (by default only 3)
* order : optional (by default, by year descending `{ year : -1}`)

The search criteria is written in MongoDB query syntax.

see https://docs.mongodb.com/manual/tutorial/query-documents/

<img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" width="150" alt="LogoMongoDB" >


We have simplified JSON syntax. For example `{"year":2005}` can be written `{ year :2005}` 
(JSON attributes can be written without `"`).

For REGEX (equivalent to LIKE in SQL), we can write, for example, `{cast:/tom cruise/}`.  This will be translated to `/tom cruise/i` (find ignore case).

Technically 🤓 , first the attribute value is recognized as String, then the service transform all strings written between `/.../` to RegExp objects in Javascript (`new RegExp(string, 'i')`).



## How to deploy on VERCEL 🐩



VERCEL (https://vercel.com/) is a [serviceless (= stateless) service platform](https://vercel.com/docs/concepts/functions).

We can deploy a free application in their cloud (no cost) 🐤.

The VERCEL environment is configured to do auto deploy : GIT push => deploy automatically. 😎 😎 😎

The deployment is fast, because of the serverless architecture (stateless) : no application code is executed on start up.

<img src="https://ahmadawais.com/wp-content/uploads/2020/04/vercel.jpg" alt="VercelLogo" width=200 />

## commun architecture

There is a main function per fichier JS.
*   Example1 `/api/movies.js` => `http://<host:port>/api/movies`
*   Example2 `/api/index.js`  => `http://<host:port>/api/index`
* This is the example of the main function (input => http request, output => http response).

```
let test = async () => {
	let res = await findMovies({
		filter : `{title:/devil/}`,
		limit : "1"
	});
	console.log( 'test res', res);
};
if(process.env.RUN_TEST) {
  test();
}

```


## Difference between running locally and running on the VERCEL

### On local

* The `server.js` script is executed.
* Then, the file `.env`` is loaded. (URI of MongoDB)
* The `routes/router.js` script is executed.
* The routes are constructed ( The file `/api/<X>.js` is mapped to the exposed URL `http://<host:port>/api/<X>` )
* Lets' remind the previously explained examples.
*   Example1 `/api/movies.js` => `http://<host:port>/api/movies`
*   Example2 `/api/index.js`  => `http://<host:port>/api/index`

* Tests are executed at the start time, for instance, @movies.js



### On VERCEL

* The `server.js` script is NOT executed.
* Then, the file `.env` is NOT loaded. The URI MangoDB must be specified on the Web console (or by other means).
* The routes are constructed by the VERCEL framework, NOT bt `routes/router.js` : Same rule, the file `/api/<X>.js` is mapped to the exposed URL `http://<host:port>/api/<X>` )

* No test execution at start time (`process.env.RUN_TEST` is undefined).

### Testing VERCEL


Example of the URL

https://verceltest-smoky.vercel.app/api/movies?filter=%7B%22title%22%3A%22%2Fprada%2F%22%7D&limit=10


https://verceltest-smoky.vercel.app/api/index



## More info

Wiki ;)

https://github.com/prawinn555/MongoDBMoviesDemo/wiki

