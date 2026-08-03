// TECHNICAL SKILLS BAR ANIMATION
document.querySelectorAll(".progress").forEach((bar) => {
  setTimeout(() => {
    bar.style.width = bar.getAttribute("data-width");
  }, 500);
});

document.querySelectorAll(".circle").forEach((circle) => {
  let percent = circle.getAttribute("data-percent");
  let span = circle.querySelector(".circle-percent");
  let degree = 0;
  let currentPercent = 0;

  let interval = setInterval(() => {
    if (currentPercent >= percent) {
      clearInterval(interval); // animation stop
    } else {
      currentPercent++;
      degree = currentPercent * 3.6; //
      circle.style.background = `conic-gradient(#2dd4bf 0deg ${degree}deg, #f3f0f0 ${degree}deg 360deg)`;
      span.textContent = currentPercent + "%";
    }
  }, 20);
});
//================ PREMIUM NETWORK BACKGROUND =================//

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

//================ CANVAS =================//

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

//================ COLORS =================//

const PRIMARY_COLOR = "#2dd4bf";
const LINE_COLOR = "45,212,191";

//================ RESPONSIVE SETTINGS =================//

let particleCount;
let connectDistance;
let particleSpeed;
let maxRadius;

function updateSettings() {

  if (window.innerWidth <= 576) {

    particleCount = 18;
    connectDistance = 90;
    particleSpeed = 0.4;
    maxRadius = 1.6;

  } else if (window.innerWidth <= 992) {

    particleCount = 30;
    connectDistance = 100;
    particleSpeed = 0.55;
    maxRadius = 1.9;

  } else {

    particleCount = 35;
    connectDistance = 120;
    particleSpeed = 0.95;
    maxRadius = 2.6;

  }

}

updateSettings();

//================ PARTICLES =================//

let particles = [];

class Particle {

  constructor() {

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = (Math.random() - 0.5) * particleSpeed;
    this.vy = (Math.random() - 0.5) * particleSpeed;

    this.radius = Math.random() * maxRadius + 0.8;

    this.shape = Math.floor(Math.random() * 5);

    this.angle = Math.random() * Math.PI * 2;

    this.rotateSpeed = (Math.random() - 0.5) * 0.02;

  }

  update() {

    this.x += this.vx;
    this.y += this.vy;

    this.angle += this.rotateSpeed;

    if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
    if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;

  }

  draw() {

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.beginPath();

    switch (this.shape) {

      // Circle
      case 0:

        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);

      break;

      // Square
      case 1:

        ctx.rect(
          -this.radius,
          -this.radius,
          this.radius * 2,
          this.radius * 2
        );

      break;

      // Diamond
      case 2:

        ctx.moveTo(0, -this.radius);
        ctx.lineTo(this.radius, 0);
        ctx.lineTo(0, this.radius);
        ctx.lineTo(-this.radius, 0);
        ctx.closePath();

      break;

      // Triangle
      case 3:

        ctx.moveTo(0, -this.radius);
        ctx.lineTo(this.radius, this.radius);
        ctx.lineTo(-this.radius, this.radius);
        ctx.closePath();

      break;

      // Hexagon
      case 4:

        for (let i = 0; i < 6; i++) {

          const angle = Math.PI / 3 * i;

          const x = this.radius * Math.cos(angle);
          const y = this.radius * Math.sin(angle);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

        }

        ctx.closePath();

      break;

    }

    ctx.fillStyle = PRIMARY_COLOR;

    ctx.shadowColor = PRIMARY_COLOR;
    ctx.shadowBlur = 15;

    ctx.fill();

    ctx.restore();

  }

}

//================ CREATE =================//

function createParticles() {

  particles = [];

  for (let i = 0; i < particleCount; i++) {

    particles.push(new Particle());

  }

}

createParticles();

//================ CONNECT =================//

function connectParticles() {

  for (let i = 0; i < particles.length; i++) {

    for (let j = i + 1; j < particles.length; j++) {

      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectDistance) {

        const opacity = (1 - distance / connectDistance) * 0.55;

        ctx.beginPath();

        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);

        ctx.strokeStyle = `rgba(${LINE_COLOR},${opacity})`;
        ctx.lineWidth = 1;

        ctx.shadowColor = PRIMARY_COLOR;
        ctx.shadowBlur = 8;

        ctx.stroke();

        ctx.shadowBlur = 0;

      }

    }

  }

}

//================ ANIMATE =================//

function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {

    particle.update();
    particle.draw();

  });

  connectParticles();

  requestAnimationFrame(animate);

}

animate();

//================ RESIZE =================//

window.addEventListener("resize", () => {

  resizeCanvas();
  updateSettings();
  createParticles();

});/*==================================================
            ORBIT PROJECTS
==================================================*/

const projects = [
{
    tech: "HTML",
    title: "Coffee Shop Website",
    image: "images/project1.jpg",
    category: "Frontend",
    desc: "Responsive coffee shop website with modern UI, animations and elegant layout.",
    demo: "#",
    github: "#"
},
{
    tech: "CSS",
    title: "Personal Portfolio",
    image: "images/project2.jpg",
    category: "Creative",
    desc: "Modern developer portfolio with premium animations and responsive design.",
    demo: "#",
    github: "#"
},
{
    tech: "JS",
    title: "Weather App",
    image: "images/project3.jpg",
    category: "JavaScript",
    desc: "Weather application using live API with beautiful interface.",
    demo: "#",
    github: "#"
},
{
    tech: "React",
    title: "Task Manager",
    image: "images/project4.jpg",
    category: "React",
    desc: "Modern task management application built with React.",
    demo: "#",
    github: "#"
},
{
    tech: "Node",
    title: "Chat Application",
    image: "images/project5.jpg",
    category: "Node JS",
    desc: "Real-time chat application using Socket.io and Node.js.",
    demo: "#",
    github: "#"
},
{
    tech: "PHP",
    title: "E-Commerce",
    image: "images/project6.jpg",
    category: "PHP",
    desc: "Complete online shopping website with admin dashboard.",
    demo: "#",
    github: "#"
},
{
    tech: "Laravel",
    title: "School Management",
    image: "images/project7.jpg",
    category: "Laravel",
    desc: "School Management System with authentication and dashboard.",
    demo: "#",
    github: "#"
},
{
    tech: "MySQL",
    title: "Database Project",
    image: "images/project8.jpg",
    category: "Database",
    desc: "Advanced MySQL database management project.",
    demo: "#",
    github: "#"
}
];


/*==================================================
        ELEMENTS
==================================================*/

const nodes = document.querySelectorAll(".orbit-node");

const image = document.querySelector(".project-preview img");

const title = document.querySelector(".project-info h3");

const desc = document.querySelector(".project-info p");

const category = document.querySelector(".project-category");

const buttons = document.querySelectorAll(".project-buttons a");

const card = document.querySelector(".center-project");


/*==================================================
        CHANGE PROJECT
==================================================*/

function showProject(index){

    const p = projects[index];

    image.style.opacity = "0";

    card.style.opacity = ".6";

    setTimeout(()=>{

        image.src = p.image;

        title.innerHTML = p.title;

        desc.innerHTML = p.desc;

        category.innerHTML = p.category;

        buttons[0].href = p.demo;

        buttons[1].href = p.github;

        image.style.opacity = "1";

        card.style.opacity = "1";

    },250);

}


/*==================================================
        NODE CLICK
==================================================*/

nodes.forEach((node,index)=>{

    node.addEventListener("click",()=>{

        nodes.forEach(n=>n.classList.remove("active-node"));

        node.classList.add("active-node");

        showProject(index);

    });

});


/*==================================================
        AUTO CHANGE
==================================================*/

let current = 0;

setInterval(()=>{

    current++;

    if(current >= projects.length){

        current = 0;

    }

    nodes.forEach(n=>n.classList.remove("active-node"));

    nodes[current].classList.add("active-node");

    showProject(current);

},5000);


/*==================================================
        MOUSE PARALLAX
==================================================*/

const wrapper = document.querySelector(".orbit-wrapper");

if (wrapper) {

    wrapper.addEventListener("mousemove", (e) => {

        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;

        card.style.transform =
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

    });

    wrapper.addEventListener("mouseleave", () => {
        card.style.transform = "translate(-50%, -50%)";
    });

}

/*==================================================
        ACTIVE CLASS
==================================================*/

const style=document.createElement("style");

style.innerHTML=`

.active-node{

background:var(--primary);

color:#fff;

box-shadow:0 0 25px rgba(45, 212, 191, .45);

transform:scale(1.15);

}

.project-preview img{

transition:.5s;

}

.center-project{

transition:.35s;

}

`;

document.head.appendChild(style);

// =============navbar===============
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (
            href.endsWith("#" + current) ||
            (current === "home" && href === "index.html") ||
            (current === "about" && href === "about.html") ||
            (current === "experience" && href === "journey.html") ||
            (current === "contact" && href === "contact.html")
        ) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);
