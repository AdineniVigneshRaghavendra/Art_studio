const canvas = document.getElementById("artCanvas");

const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let animationPaused = false;
let mouse = {
    x: 0,
    y: 0
};
const pauseButton = document.getElementById("pauseButton");
const resumeButton = document.getElementById("resumeButton");
const randomButton = document.getElementById("randomButton");
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");

const particleSlider = document.getElementById("particleSlider");
const particleValue = document.getElementById("particleValue");

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

let particleSpeed = 2;

const patternMode = document.getElementById("patternMode");

let currentPattern = "normal";


pauseButton.addEventListener("click", function(){
    animationPaused = true;
});

resumeButton.addEventListener("click", function(){
    animationPaused = false;
});

randomButton.addEventListener("click", function(){

    generateParticles(Number(particleSlider.value));

    let patterns = ["normal","galaxy","waves","spiral","fireflies"];

    let randomIndex = Math.floor(Math.random() * patterns.length);

    currentPattern = patterns[randomIndex];

    patternMode.value = currentPattern;
});

canvas.addEventListener("mousemove", function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

function createParticle(x, y, radius, color){
    return{
        x: x,
        y: y,
        radius: radius,
        color: `hsl(${Math.random()*360}, 100%, 60%)`,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) *2
    };
}

function generateParticles(count){
    particles=[];
    for(let i=0;i<count;i++){
        let particle = createParticle(
              Math.random()*canvas.width,
              Math.random()*canvas.height,
              3 + Math.random() * 5,
              "white"
        );
    particles.push(particle);
    }
}

generateParticles(200);

function drawParticles(){
    for(let i=0; i<particles.length; i++)
    {
        let particle = particles[i];

        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x,particle.y,particle.radius,0,Math.PI*2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.shadowBlur=0;
    }
}

function connectParticles() {
    for(let i=0;i<particles.length;i++)
    {
        for(let j=i+1; j<particles.length; j++)
        {
            let particle1 = particles[i];
            let particle2 = particles[j];

            let dx = particle1.x - particle2.x;
            let dy = particle1.y - particle2.y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 90)
            {
                ctx.beginPath();
                ctx.moveTo(particle1.x,particle1.y);
                ctx.lineTo(particle2.x,particle2.y);

                ctx.strokeStyle = "rgba(255,255,255,0.35)";

                ctx.lineWidth = 1;
                ctx.shadowBlur = 5;
                ctx.shadowColor= "white";
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        }
    }
}

function updateParticles(){
    for(let i=0; i<particles.length; i++)
    {
        let particle = particles[i];

        particle.x += particle.speedX * particleSpeed;

        particle.y += particle.speedY * particleSpeed;

        let dx = mouse.x - particle.x;
        let dy = mouse.y - particle.y;

        let distance = Math.sqrt(dx * dx + dy*dy);

        if (distance < 120){
            particle.x += dx * 0.01;
            particle.y += dy * 0.01;
        }
    }
}

function galaxyMovement() {
    for(let i=0;i<particles.length; i++)
    {
        let particle = particles[i];

        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;

        let dx = particle.x - centerX;
        let dy = particle.y - centerY;

        let distance = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);

        angle += 0.002 * particleSpeed;

        particle.x = centerX + Math.cos(angle) * distance;
        particle.y = centerY + Math.sin(angle) * distance;
    }
}

function waveMovement() {
    for(let i=0;i<particles.length;i++)
    {
        let particle = particles[i];

        particle.x += particle.speedX * particleSpeed;

        particle.y = particle.y + Math.sin(particle.x * 0.01) * 0.5;

        if(particle.x > canvas.width){
            particle.x = 0;
        }
        if(particle.x < 0){
            particle.x = canvas.width;
        }
    }
}

function spiralMovement(){

    for(let i=0;i<particles.length;i++)
    {
        let particle = particles[i];

        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;

        let dx = particle.x - centerX;
        let dy = particle.y - centerY;

        let distance = Math.sqrt(dx * dx + dy * dy);

        let angle = Math.atan2(dy , dx);

        angle += 0.01 * particleSpeed;

        distance -= 0.15 * particleSpeed;

        if(distance < 20){
            distance = 350;
        }

        particle.x = centerX + Math.cos(angle) * distance;
        particle.y = centerY + Math.sin(angle) * distance;
    }
}

function fireflyMovement() {
    for(let i=0;i<particles.length;i++)
    {
        let particle = particles[i];

        particle.x += particle.speedX * 0.3 * particleSpeed;
        particle.y += particle.speedY * 0.3 * particleSpeed;


        if(particle.x < 0){
            particle.x = canvas.width;
        }

        if(particle.x > canvas.width){
            particle.x = 0;
        }
        if(particle.y < 0){
            particle.y = canvas.height;
        }
        if(particle.y > canvas.height){
            particle.y = 0;
        }
    }
}

function animate(){

    if(!animationPaused){
    ctx.fillStyle = "black";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    if(currentPattern === "normal"){
        
        updateParticles();
    }
    else if(currentPattern === "galaxy"){

        galaxyMovement();
    }
    else if(currentPattern === "waves"){
        waveMovement();
    }
    else if(currentPattern === "spiral"){

        spiralMovement();
    }
    else if(currentPattern === "fireflies"){

        fireflyMovement();
    }

    drawParticles();
    connectParticles();
    }

    requestAnimationFrame(animate);
}

particleSlider.addEventListener("input",function()
{
    particleValue.textContent = particleSlider.value;

    generateParticles(Number(particleSlider.value));
});

speedSlider.addEventListener("input",function(){
    particleSpeed = Number(speedSlider.value);

    speedValue.textContent = speedSlider.value;
});

patternMode.addEventListener("change", function(){

    currentPattern = patternMode.value;
});

saveButton.addEventListener("click", function(){

    let image = canvas.toDataURL("image/png");

    let link = document.createElement("a");

    link.download = "my-art.png";

    link.href = image;

    link.click();
})

resetButton.addEventListener("click", function(){

    particleSlider.value = 200;
    particleValue.textContent = "200";

    speedSlider.value = 2;
    speedValue.textContent = "2";

    particleSpeed = 2;

    currentPattern = "normal";

    patternMode.value = "normal";

    animationPaused = false;

    generateParticles(200);
});

animate();