import express from "express";
import axios from "axios";
import env from "dotenv";

const app = express();
const port = 3001;
env.config();
const API_KEY = process.env.API_KEY;
const API_URL = `https://holidays.abstractapi.com/v1/?api_key=${API_KEY}&country=MY&year=2020&month=12&day=25`;
const date = new Date();
var today = {
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
};

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL + `&year=${today.year}&month=${today.month}&day=${today.date}`)
        const response = result.data;
        console.log(response)
        console.log(today)
        console.log(response)
        let data = {}
        if(result.data){
            data = {}
        } else{
            let data = {
            name: response[0].name,
            type: response[0].type,
            }
        }
        

        res.render("index.ejs", data);
    } catch (error) {
        console.log(error.message);

    }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});