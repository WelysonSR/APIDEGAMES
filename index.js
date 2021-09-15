const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


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

app.get("/games",(req,res)=>{    
    res.json(DB.games);
    res.statusCode = 200;
});

app.get("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        let game = DB.games.find(g => g.id == id);
        if(game != undefined){
            res.json(game);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post("/game",(req,res)=>{
    let {title,year,price} = req.body;
    if(title != undefined){
        if(!isNaN(year)){
            if(!isNaN(price)){
                DB.games.push({
                    id: 4,
                    title,
                    year,
                    price
                });
                res.sendStatus(200);
            }
        }
    }else{
        res.sendStatus(400);
    }
});

app.delete("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        let game = DB.games.findIndex(g => g.id == id);
        
        if(game == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(game,1);
            res.sendStatus(200);
        }
    }
});

app.put("/game/:id",(req,res)=>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        let game = DB.games.find(g => g.id == id);
        if(game != undefined){
            
            let {title,year,price} = req.body;

            if(title != undefined){
                game.title = title;
            }
            if(year != undefined){
                game.year = year;
            }
            if(price != undefined){
                game.price = price;
            }
            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }

});



app.listen(8080,()=>{
    console.log("API RODANDO!");
});