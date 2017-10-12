var Canvas = require('canvas');
var Font = Canvas.Font
var path = require('path');
var fs = require('fs');

var image = fs.readFileSync('./template.png');
var Image = new Canvas.Image;
Image.src = image;

var creationTexts = fs.readFileSync('./creationTexts.txt', 'utf8').split(';');

creationTexts.forEach(creationText => {
    if (!creationText) {
        return;
    }
    var canvas = new Canvas(1200, 628);
    var header = creationText.split('+')[0];
    var description = creationText.split('+')[1];

    var ctx = canvas.getContext('2d');
    ctx.drawImage(Image, 0, 0, Image.width, Image.height);
    updateBig(ctx, Image.width, Image.height, header, description);

    fs.writeFileSync(`./creations_1200x628/${header}.png`, canvas.toBuffer());
    console.log(`${header} png created`);
});

var image = fs.readFileSync('./template600x600.png');
var Image = new Canvas.Image;
Image.src = image;

var creationTexts = fs.readFileSync('./creationTexts.txt', 'utf8').split(';');

creationTexts.forEach(creationText => {
    if (!creationText) {
        return;
    }
    var canvas = new Canvas(600, 600);
    var header = creationText.split('+')[0];
    var description = creationText.split('+')[1];

    var ctx = canvas.getContext('2d');
    ctx.drawImage(Image, 0, 0, Image.width, Image.height);
    updateSmall(ctx, Image.width, Image.height, header, description);

    fs.writeFileSync(`./creations_600x600/${header}.png`, canvas.toBuffer());
    console.log(`${header} png created`);
});

function getFont(fontSize, fontBase, canvasWidth) {
    var ratio = fontSize / fontBase;
    var size = canvasWidth * ratio;
    return (size | 0) + ' Lato Black';
}

function getFontBebas(fontSize, fontBase, canvasWidth) {
    var ratio = fontSize / fontBase;
    var size = canvasWidth * ratio;
    return (size | 0) + ' Bebas Neue';
}

function updateBig(ctx, width, height, header, description) {
    var textWidth = ctx.measureText(header).width;

    var textHeight;
    if (header === 'LINIAŁY') {
        textHeight = getFont(80, 1000, width - textWidth * 3).split(' ')[0];
        ctx.font = getFont(80, 1000, width - textWidth * 3);
    } else {
         textHeight = getFont(100, 1000, width - textWidth * 3).split(' ')[0];
        ctx.font = getFont(100, 1000, width - textWidth * 3);
    }

    ctx.textBaseline = 'top';
    ctx.fillStyle = '#DEDEEA';
    ctx.textAlign = "center";
    ctx.fillText(header.toUpperCase(), 600, 470);

    var textWidth = ctx.measureText(description).width;
    ctx.font = getFont(50, 1000, width - (textWidth / 8));
    ctx.fillText(description, 600, 470 + parseInt(textHeight));
}

function updateSmall(ctx, width, height, header, description) {
    var textWidth = ctx.measureText(header).width;
    var textHeight;

    textHeight =
    ctx.textBaseline = 'top';
    ctx.font = '120 Bebas Neue';

    ctx.fillStyle = '#DEDEEA';
    ctx.textAlign = "center";
    ctx.fillText(header.toUpperCase(), 300, 280);

    var textWidth = ctx.measureText(description).width;
    ctx.font = '100 Bebas Neue';
    ctx.fillText(description, 300, 420);
}