var express = require('express');
var port = 8080;
var os = require('os');
var app = express();

var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage });

var Canvas = require('canvas');

var fs = require('fs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('csv'), (req, res) => {

    var canvas = new Canvas(200, 500, 'pdf');
    var image = req.file.buffer;
    var Image = new Canvas.Image;
    Image.src = image;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(Image, 0, 0, Image.width, Image.height);

    fs.writeFileSync('test.pdf', canvas.toBuffer());
    console.log('pdf created');
    res.status(200).send('OK');
});

app.listen(port, () => console.log(`App listen: ${port}`));
