// Check If There's Color Option In Local Storage
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  //---Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    //---Add Active Class On Elements With Data-color === Local Storage item
    if (ele.dataset.color === mainColor) {
      ele.classList.add("active");
    }
  });
}

// Spin Gear Icon On Click
let gear = document.querySelector(".setting-box .gear i");
let settingsBox = document.querySelector(".setting-box");

gear.addEventListener("click", function () {
  //------Rotate Icon On Self
  this.classList.toggle("fa-spin");
  //------Add Open Class To Settings Box
  settingsBox.classList.toggle("open");
});

// Switch Colors
const liColors = document.querySelectorAll(".colors-list li");

liColors.forEach((li) => {
  li.addEventListener("click", (e) => {
    //---Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //---Set Color On Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);
    //---Remove Active Class From Childrens
    handleActive(e);
  });
});

// ------Function To Randomize Background pictures
let backgroundOption = true;

// ------Variable To Control Interval
let backgroundInterval;

// Check If There's Random Background item in Local Storage
let bgLocalItem = localStorage.getItem("background-option");
let randomBgBtn = document.querySelectorAll(".random-backgrounds-btn span");

if (bgLocalItem !== null) {
  randomBgBtn.forEach((span) => {
    span.classList.remove("active");
  });

  if (bgLocalItem === "true") {
    backgroundOption = true;

    document
      .querySelector(".random-backgrounds-btn .yes")
      .classList.add("active");
  } else {
    backgroundOption = false;

    document
      .querySelector(".random-backgrounds-btn .no")
      .classList.add("active");
  }
}

// Switch Random Background Option
const randomBgEle = document.querySelectorAll(".random-backgrounds-btn span");

// Loop On All Spans
randomBgEle.forEach((span) => {
  //---Click On Spans
  span.addEventListener("click", (e) => {
    //---Remove Active Class From Spans
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImages();

      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background-option", false);
    }
  });
});

// Add Active Class To NavBar
let navbarr = document.querySelector(".header-area").querySelectorAll("a");

navbarr.forEach((ele) => {
  ele.addEventListener("click", function () {
    navbarr.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});

// Change Landing Page Background pictures
// ------Get Landing Element
let landingPage = document.querySelector(".landing-page");

// ------Get Array Of Pictures
let imgsArray = [
  "landing-photo-1.jpg",
  "landing-photo-2.jpg",
  "landing-photo-3.jpg",
  "landing-photo-4.jpg",
  "landing-photo-5.jpg",
];

// Create Randomize Function

function randomizeImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // ----Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // ---Change Background image Url
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

randomizeImages();

// File Our Skills Section

// ------Select Skills Selector

let skillsSection = document.querySelector(".skills");
let skillsSpan = document.querySelectorAll(".skill-progress span");

window.addEventListener("scroll", function () {
  if (window.scrollY >= skillsSection.offsetTop - 200) {
    skillsSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
});

// Create Pop-up With Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //---Create Overlay
    let overlay = document.createElement("div");

    //---Add Class To Div
    overlay.className = "popup-overlay";

    //---Add Overlay To Body
    document.body.appendChild(overlay);

    //---Creat The Pop-up Box
    let popupBox = document.createElement("div");

    //---Add Class To The Pop-up Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //---Create The Heading
      let imgHeading = document.createElement("h3");

      //---Add Class To Heading
      imgHeading.className = "main-heading";

      //---Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      //---Append Text To The Heading
      imgHeading.appendChild(imgText);

      //---Append Heading To The Pop-Up Box
      popupBox.appendChild(imgHeading);
    }

    //---Create The Image
    let popupImage = document.createElement("img");

    //---Add Source To Image
    popupImage.src = img.src;

    //---Add Image To Pop-up Box
    popupBox.appendChild(popupImage);

    //---Append Pop-up Box To Body
    document.body.appendChild(popupBox);

    //---Create The Close Span
    let closeBtn = document.createElement("span");

    //---Create The Close Button Text
    let btnText = document.createTextNode("X");

    //---Append Text To Close Button
    closeBtn.appendChild(btnText);

    //---Add Class To Close Button
    closeBtn.className = "close-btn";

    //---Add Close Button To Pop-Up Box
    popupBox.appendChild(closeBtn);
  });
});

// Close Pop-Up
document.addEventListener("click", (e) => {
  if (e.target.classList == "close-btn") {
    //---Remove The Current Pop-Up
    e.target.parentElement.remove();

    //---Remove Pop-Up Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSection(elements) {
  elements.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
      document.getElementById(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);

// Handle Active State

function handleActive(event) {
  //---Remove Active Class From Spans
  event.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  //---Add Active Class To Target
  event.target.classList.add("active");
}

// Show and Hide Bullets

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalStorage = localStorage.getItem("bullets-option");

if (bulletLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});

// Reset Button

let resetButton = document.querySelector(".reset-option");

resetButton.addEventListener("click", () => {
  localStorage.removeItem("background-option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("bullets-option");

  window.location.reload();
});

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleBtn.addEventListener("click", function (e) {
  //---Stop Propagation
  e.stopPropagation();

  this.classList.toggle("menu-active");
  links.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== links) {
    //---Check Menu If Open
    if (
      links.classList.contains("open") &&
      toggleBtn.classList.contains("menu-active")
    ) {
      links.classList.remove("open");
      toggleBtn.classList.remove("menu-active");
    }
  }
});

// Stop Propagation in Links

links.onclick = function (e) {
  e.stopPropagation();
};

// Scroll To Top Button

let span = document.querySelector(".scroll-to-top");

window.onscroll = function () {
  if (this.scrollY >= 1200) {
    span.classList.add("show");
  } else {
    span.classList.remove("show");
  }
};

span.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
