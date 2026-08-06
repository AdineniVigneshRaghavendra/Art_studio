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

const particleSlider = document.getElementById("particleSlider");
const particleValue = document.getElementById("particleValue");

pauseButton.addEventListener("click", function(){
    animationPaused = true;
});

resumeButton.addEventListener("click", function(){
    animationPaused = false;
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

        particles.x += particle.speedX;

        particle.y += particle.speedY;

        let dx = mouse.x - particle.x;
        let dy = mouse.y - particle.y;

        let distance = Math.sqrt(dx * dx + dy*dy);

        if (distance < 120){
            particle.x += dx * 0.01;
            particle.y += dy * 0.01;
        }
    }
}

function animate(){

    if(!animationPaused){
    ctx.fillStyle = "black";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    updateParticles();
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

animate();