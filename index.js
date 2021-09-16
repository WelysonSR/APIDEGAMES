const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "IZA Déborah";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


auth = (req,res,next)=>{
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        let token = bearer[1];
        jwt.verify(token,JWTSecret,(err,data)=>{
            if(err){
                res.status(401);
                res.json({err: "Token invalido!"});
            }else{
                req.token = token;
                req.loggenUser = {id: data.id, name: data.name, email: data.email };
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err: "Token invalido!"});
    }    
}


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
    ],
    users: [

        {
            id: 0,
            name: "Welyson",
            email: "welyson12@hotmail.com",
            password: 123456
        }

    ]
}

app.post("/auth",(req,res)=>{

    let {email, password} = req.body;

    if(email != undefined){
        let user =DB.users.find(u=>u.email == email);
        if(user != undefined){
            if(user.password == password){
                jwt.sign({id: user.id, name: user.name, email: user.email},JWTSecret,{expiresIn:'24h'},(err, token)=>{
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                });                
            }else{
                res.status(401);
                res.json({err: "Credenciais Inválida!"});
            }
        }else{
            res.status(404);
            res.json({err: "E-mail não cadstrado!"});
        }
        
    }else{
        res.status(400);
        res.json({err: "E-mail invalido!"});
    }

});

app.get("/games", auth,(req,res)=>{    
    res.json(DB.games);
    res.statusCode = 200;
});

app.get("/game/:id", auth,(req,res)=>{
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

app.post("/game", auth,(req,res)=>{
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

app.delete("/game/:id", auth,(req,res)=>{
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

app.put("/game/:id", auth,(req,res)=>{

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