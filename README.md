# Service with MangoDB 🐩

## configuration 🐩

see `.env` file.


```
DB_URI=mongodb+srv://<user>:<password>@<mangoDBHost>
```


* Free server @ https://www.mongodb.com/cloud/atlas.🥳🥳🥳
* Don't forget to configure the allowed client IP adresses (you can allow all IP adresses). 😇
* You can load sample data (such as movies Mflix).


## How to run

classic way 🎄

```
npm start
```

## Service URL : find movies



```
http://<host>/api/movies?filter=<filter>&limit=<limit>&order=<order>
```

Parameters 
* filter : search criteria in JSON, optional (by default everything)
* limit : optional (by default only 3)
* order : optional (by default, by year descending `{ year : -1}`)

The search criteria is written in MondoDB query syntax.
see 

```
```

## How to deploy on VERCEL



VERCEL (https://vercel.com/) is a serviceless (= stateless) service platform.

We can deply a free application in their cloud.



