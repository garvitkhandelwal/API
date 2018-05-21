var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/SLP-sample');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var ingredients = [
    {
        "id" : "21gad7",
        "name" : "Eggs"
    },
    {
        "id" : "23vhjda",
        "name" : "Peanut butter"
    },
    {
        "id" : "das2124",
        "name" : "bread"
    },
    {
        "id" : "qwd314",
        "name" : "milk"
    }
];


app.get('/ingredients', function(request, response){
    response.send(ingredients);
})

app.put('/ingredients/:ingredientID', function(request, response){
   
    var text = request.body.name;
    
    if(!text || text === "")
        {
            response.status(500).send({Error:"You must provide an ingredient name! "})
        }
    else
        {
                var objectFound = false;
                for(var x = 0; x < ingredients.length; x++)
                    {
                        var ing = ingredients[x];
                        if(ing.id === request.params.ingredientID)
                            {
                                objectFound = true;
                                ingredients[x].name = text;
                                break;
                            }
                    }
            if(!objectFound)
                {
                    response.status(500).send({Error: "Ingredient ID not found!"})
                }
            else
                {
                    response.send(ingredients);
                }
        }
    
});

app.post('/ingredients', function(request, response){
    var ingredient = request.body;
    if(!ingredient || ingredient.name === "")
        {
            response.status(500).send({Error:"Your ingredient must have text!"});
        }
    else
        {
            ingredients.push(ingredient);
            response.status(200).send(ingredients);
        }
})

app.delete('/ingredients/:ingredientID', function(request, response){
    for(var v = 0 ; v < ingredients.length ; v++)
        {
            var ing1 = ingredients[v];
            if(ing1.ID === request.params.ingredientID)
                {
                    ing1.delete;
                    break;
                }
            else
                {
                    response.status(500).send({Error: "Ingredient ID not found!"});
                }
        }
})

app.listen(3000, function(){
    console.log("Server running successfully!");
})