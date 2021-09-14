const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let DB ={
    games:[
        {
            id: 0,
            title: "Call of Duty",
            year: 2019,
            price: 60

        },
        {
            id: 1,
            title: "Assassin's Creed IV",
            year: 2013,
            price: 90

        },
        {
            id: 2,
            title: "Assassin's Creed Valhalla",
            year: 2020,
            price: 120

        }
    ]
}

app.get("/",()=>{

});

app.listen(8080,()=>{
    console.log("API RODANDO!");
});