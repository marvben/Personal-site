////////////Header./////////////
// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".navigation").classList.add("headerStyleOnSCroll");
  } else {
    document.querySelector(".navigation").classList.remove("headerStyleOnSCroll");
  }
}

///Footer time timeDate

window.addEventListener("load", (event) => {
  getTime().catch((err) => console.log(err));
});

async function getTime() {
  const time = await axios.get("/timeDate");
  const footerText = document.querySelector("footer p.copyright");
  footerText.innerText = time.data;
  return;
}

setInterval(getTime, 1000);

////section one

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();
tl.from(".nav-item", { duration: 0.4, stagger: 0.15, y: "-50px", opacity: 0, ease: "circ" });
tl.fromTo(
  ".homePage .section-one .bigHeading,.homePage .section-one .description,.homePage .section-one .button",
  {
    y: "-30px",
    opacity: 0,
  },
  {
    duration: 0.5,
    stagger: 0.15,
    y: "0",
    opacity: 1,
    ease: "circ",
  }
);
tl.from(".image-container", {
  scrollTrigger: {
    trigger: ".image-container",
    toggleActions: "play pause resume none",
    start: "top 100%",
    end: "bottom 20%",
    scrub: 2,
  },
  duration: 3,
  opacity: 0,
  scale: 0,
  ease: "circ",
});

////////////Section two

gsap.from(".skill", {
  scrollTrigger: {
    trigger: ".skill",
    toggleActions: "play pause resume none",
    start: "top 90%",
    end: "bottom 90%",
    scrub: 3,
  },
  duration: 1,
  opacity: 0,
  scale: 0,
  stagger: 1,
  ease: "circ",
});

//  Grained particles on contact page
var option = {
  animate: true,
  patternWidth: 263.34,
  patternHeight: 203.02,
  grainOpacity: 0.11,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
};

let testimonial = document.querySelector("#testimonial");
let main = document.querySelector("#main");
let newsForm = document.querySelector("#newsForm");
if (testimonial) {
  grained("#testimonial", option);
}
if (main) {
  console.log(main);
  grained("#main", option);
}
if (newsForm) {
  grained("#newsForm", option);
}

//odometer
// setTimeout(function () {
//   odometer.innerHTML = 56;
// }, 1000);

//check if verification works
const verificationInput = document.querySelector(".verificationInput");
const verificationLabel = document.querySelector(".verificationLabel");
const isVerified = document.querySelector(".isVerified");
if (verificationInput) {
  verificationInput.addEventListener("input", function (e) {
    if (verificationLabel.innerText == e.target.value) {
      isVerified.innerHTML = `<span class="text-success">Verified <i class="fa-solid fa-circle-check "></i></span>`;
    } else {
      isVerified.innerHTML = `<span class="text-danger">Not Verified <i class="fa-solid fa-circle-xmark"></i></span>`;
    }
  });
}
