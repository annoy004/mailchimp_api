const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));//this is folder get the access of other static page like css and image
//jab public main static file dhundega toh humlog ko bas html main main public ke andar ka address batana hai jaise public ke andar css ke andar file hai toh css/file 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    console.log (firstname,lastname,email);

    const Data = {
        members : [
            {
                email_address :email,
                status : "subscribed",
                merge_fields : {
                   FNAME : firstname,
                   LNAME : lastname,
                }
              
            }
        ]
    };

 const jsonData = JSON.stringify(Data);
 const url = "https://us21.api.mailchimp.com/3.0/lists/3fe9fb0c56";
 const option = {
    method : "POST",
    auth : "arnav:c516671b17967d5bd263d83aea91192f-us21"// pehle koi bhi username banane ka fir as a password if dalne ka 
 }


 const request =  https.request(url,option,function(response) {
    if (response.statusCode === 200) {
        res.send("successfully subscribed");

    } else {
        res.send("there was an error with signing up ")
       // res.redirect("/");// is use to welcome back at route /
    }
    response.on("data", function(data) {
        console.log(JSON.parse(data));// to make object
    })
 })

 request.write(jsonData);
 request.end();
  
});

app.listen(3000 || process.env.PORT || 3000,function() { // 3000 pe bhi run hoga and heroku pe bhi 
    console.log("server is running on port 3000");
})



// 3fe9fb0c56

// c516671b17967d5bd263d83aea91192f-us21