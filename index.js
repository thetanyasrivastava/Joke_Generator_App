import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const JOKE_API_URL = "https://official-joke-api.appspot.com";

app.get("/", (req, res) => {
    res.render("index.ejs", { jokes: null });
});

app.get("/jokes", async(req, res) => {
    try{
        const result = await axios.get(JOKE_API_URL + "/jokes/ten");  //?type=programming

        //1. "/random_joke"                   --> works
        //2.a "/random_joke?type=programming"  --> Because not all APIs support query parameters.
        // This API uses different endpoints for filtering instead of query params. 
        // I checked the documentation and corrected the endpoint.”

        //2.b jokes/programming/random --> different endpoints ->worked 

        //3. jokes/ten --> loop jokes

        console.log(result.data);
        res.render("index.ejs", { jokes: result.data });
    }
    catch(error){
        console.log("Failed to make the request " + error.message);
        res.status(400).send(error.message);
    }
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})