var express=require("express");
var unirest = require("unirest");
var bodyParser=require("body-parser");

var app=express();
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/",function(request,res){
	var req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");
req.headers({
	"x-rapidapi-host": "covid-193.p.rapidapi.com",
	"x-rapidapi-key": "9aeffa2a8emshe6c4ec1b27b1784p1d76f5jsn8e7169550fe8"
});
req.end(function (resp) {
	if (resp.error) throw new Error(resp.error);
	{
	// console.log(resp.body);
	}
res.render("landing.ejs",{data:resp.body});
});
});



app.get("/search",function(request,res){
var country=request.query.country;
var req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");
req.query({
	"country":country
});
req.headers({
	"x-rapidapi-host": "covid-193.p.rapidapi.com",
	"x-rapidapi-key": "9aeffa2a8emshe6c4ec1b27b1784p1d76f5jsn8e7169550fe8"
});
req.end(function (resp) {
	if (resp.error) throw new Error(resp.error);
	{
	// console.log(resp.body);
	}
	if(resp.body.response[0])
	{
res.render("result.ejs",{net:resp.body.response[0],result:resp.body.response[0].cases,deaths:resp.body.response[0].deaths});
}
else{
	res.send("Sorry, data not found. Check table!!");
}
});
});

app.get("/contact",function(req,res){
res.render("contact.ejs");
});

app.get("/abtme",function(req,res){
res.render("aboutme.ejs");
});

app.listen(process.env.PORT || 3000,function()
{
	console.log("Server online");
})
