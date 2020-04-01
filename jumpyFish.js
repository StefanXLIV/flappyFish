const canvas = document.getElementById("jumpyFish");
const context = canvas.getContext("2d");


//Load images

const fish = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

fish.src = "images/pufferfish.png";
bg.src = "images/wbg2.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipenorth.png";
pipeSouth.src = "images/pipesouth.png";


//random variables



let fX = 10;
let fY = 150;

fish.width = 50;
fish.height = 35;
fg.width = 306;
fg.height = 118;
pipeNorth.width = 52;
pipeNorth.height = 242;
pipeSouth.width = 52;
pipeSouth.height = 242;

let gap = 130;
let constant = pipeNorth.height + gap;

let gravity = 1;
let score = 0;

// keydown

document.addEventListener("keydown", moveUp);

function moveUp() {
    if (event.keyCode === 38) {
        fY -= 30;
    }
}

// pipe coordinates

let pipe = [];

pipe[0] = {x: canvas.width, y: 0 };
// canvas.width stavljamo da bi cevi pocele od kraja mape, odnosno od zavrsetka duzine canvasa!

// draw images

function draw() {
    context.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeNorth, pipe[i].x, pipe[i].y, 52, 242);
        context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant, 52, 242);
        
       pipe[i].x--;

       if (pipe[i].x === canvas.width - 190) {
           pipe.push({
               x: canvas.width,
               y: Math.floor(Math.random()*120) - 110
           });
       }

        // game over

         if (fX + fish.width >= pipe[i].x
             && fX <= pipe[i].x + pipeNorth.width
             && (fY <= pipe[i].y + pipeNorth.height 
             || fY + fish.height >=  pipe[i].y + constant)
             || fY + fish.height >= canvas.height - fg.height){
              location.reload();
             }

            if(pipe[i].x === 1) {
                score++;
            }
    }

    

    context.drawImage(fg, 0, 420, 306, 118);
    context.drawImage(fish, fX, fY, 50, 35);

    fY += gravity;

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : " +score,10, canvas.height - 20);

    requestAnimationFrame(draw);
}
draw();