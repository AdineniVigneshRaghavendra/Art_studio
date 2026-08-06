const canvas = document.getElementById("artCanvas");

const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle(x, y, radius, color){
    return{
        x: x,
        y: y,
        radius: radius,
        color: color,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) *2
    };
}

for(let i=0; i<100; i++)
{
    let particle = createParticle(
     Math.random()*canvas.width,
     Math.random()*canvas.height,
     3 + Math.random() * 5,
     "white"
    );
    particles.push(particle);
}

function drawParticles(){
    for(let i=0; i<particles.length; i++)
    {
        let particle = particles[i];

        ctx.beginPath();
        ctx.arc(particle.x,particle.y,particle.radius,0,Math.PI*2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }
}

function updateParticles(){
    for(let i=0)
}

ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);

drawParticles();