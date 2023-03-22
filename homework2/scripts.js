const section = document.querySelector("section");
const img = document.getElementById("img");
const audio = document.getElementById("audio");
const FPS = 60;
section.style.height = window.innerHeight + "px";
section.style.width = window.innerWidth + "px";

// Logo moving velocity Variables
let xPosition = 10;
let yPosition = 10;
let xSpeed = 4;
let ySpeed = 4;

function update() {
  img.style.left = xPosition + "px";
  img.style.top = yPosition + "px";
}

setInterval(() => {
  if (xPosition + img.clientWidth >= window.innerWidth || xPosition <= 0) {
    xSpeed = -xSpeed;
    img.style.backgroundColor = randomColor();
    audio.play();
    console.log(img.style.backgroundColor, "colorrr");
  }
  if (yPosition + img.clientHeight >= window.innerHeight || yPosition <= 0) {
    ySpeed = -ySpeed;
    img.style.backgroundColor = randomColor();
    audio.play();
    console.log(img.style.backgroundColor, "colorrr");
  }

  xPosition += xSpeed;
  yPosition += ySpeed;
  update();
}, 1000 / FPS);
function randomColor() {
  let color = "#";
  color += Math.random().toString(16).slice(2, 8).toUpperCase();

  return color;
}

window.addEventListener("resize", () => {
  xPosition = 10;
  yPosition = 10;

  section.style.height = window.innerHeight + "px";
  section.style.width = window.innerWidth + "px";
});
