const express = require('express');
var bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();
const Nightmare = require("nightmare");

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, './Frontend/build')));
app.use(cors());
app.use(bodyParser.json());

app.post("/", async(req,res) => {
    try{
        var nightmare = Nightmare({show: false});
        console.log(req.body.linku);
        var listaFinal = [];
        var perserit = true;

        while(perserit === true){
        var resultPhoto = await nightmare.goto(req.body.linku)
        .wait('#react-root')
        .evaluate(() => {
            var r = [];
            let array = document.querySelectorAll('img[class="FFVAD"]');
            for(let i=0; i < array.length; i++){
                r.push(array[i].src);
            }
            return r;
        })
        .catch(() => {
            console.log("No images...");
        })
        listaFinal.push(...resultPhoto);

        var resultVideo = await nightmare
        .evaluate(() => {
            var r = [];
            let array = document.querySelectorAll('video[class="tWeCl"]');
            for(let i=0; i < array.length; i++){
                r.push(array[i].src);
            }
            return r;
        })
        .catch(() => {
            console.log("No videos...");
        })
        listaFinal.push(...resultVideo);

        var prap = await nightmare
        .click('._6CZji')
        .then(() => {
            return true;
        })
        .catch(async() => {
            console.log("No next button...");
            await nightmare
            .end()
            perserit = false;
            return false;
        })
        perserit = prap;
        }

        listaFinal = listaFinal.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        let response = {
            success: true,
            lista: listaFinal
        }
        res.json(response);

    }catch(error){
        let response = {
            success: false
        }
        res.json(response);
    }
})

app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, './Frontend/build/index.html')); 
});

app.listen(process.env.PORT || 3000);