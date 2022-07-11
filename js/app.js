function displayTime() {
    const dateTime = new Date();
    const hrs = dateTime.getHours();
    const min = dateTime.getMinutes();
    const sec = dateTime.getSeconds();
    const session = document.querySelector('#session');

// console.log(displayTime);
if (hrs >= 12) {
    session.innerHtml = 'PM';
}
else {
    session.innerHtml = 'AM';
}
document.querySelector('#hours').innerHTML = hrs;
document.querySelector('#minutes').innerHTML = min;
document.querySelector('#seconds').innerHTML = sec;
}
setInterval(displayTime);

//
// COMMENT
// slider
// სლაიდერის ღილაკები
const nextBtn = document.querySelector("#next"),
  prevBtn = document.querySelector("#prev"),
  sliders = document.querySelectorAll(".slider-item"),
  circles = document.querySelectorAll(".circle"),
  startAutoSliding = document.querySelector("#start-auto"),
  stopAutoSliding = document.querySelector("#stop-auto");

// საწყისი activeIndex
let activeIndex = 0;

console.log("sliders", sliders);

function initSlider() {
  // next prev ღილაკებზე ლისენერის დამატება
  nextBtn.addEventListener("click", showNextSlide);
  prevBtn.addEventListener("click", showPrevSlide);

  // ერთ-ერთ სლაიდზე active კლასის დამატება activeIndex-ის მიხედვით
  renderSlides();

  // კლავიატურის ღილაკებზე მოსმენა
  document.addEventListener("keyup", (e) => {
    console.log(e);
    // e.code გვიბრუნდებს შესაბამისი ღილაკის შესახებ ინფორმაციას
    if (e.code === "ArrowLeft") {
      showNextSlide();
    }
  });
}

// activeIndex (0, 1, ან 2) ინდექსის მქონე სლაიდზე ამატებს active კლასს, დანარჩენებზე შლის
function renderSlides() {
  console.log("activeIndex", activeIndex);
  sliders.forEach((slide, i) => {
    if (i === activeIndex) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
  circles.forEach((circle, i) => {
    if (i === activeIndex) {
      circle.classList.add("grey");
    } else {
      circle.classList.remove("grey");
    }
  });
}

circles.forEach((circle, i) => {
  circle.addEventListener("click", function () {
    stopIntervalFnSlider();
    activeIndex = i;
    renderSlides();
  });
});

//
function showNextSlide() {
  // console.log("next");
  // activeIndex ის მნიშვნელობის გაზრდა და ვამოწმებთ ეს ინდექსი (სლაიდების რაოდენობას - 1)-ზე მეტი ხომ არაა
  if (activeIndex === sliders.length - 1) {
    activeIndex = 0;
  } else {
    activeIndex++;
  }
  //  active კლასის ხელახლა დამატება შესაბამის ელემენტზე
  renderSlides();
}

function showPrevSlide() {
  // console.log("prevBtn");
  // activeIndex ის მნიშვნელობის შემცირება და ვამოწმებთ ეს ინდექსი 0-ზე ნაკლები ხომ არაა
  if (activeIndex === 0) {
    activeIndex = sliders.length - 1;
  } else {
    activeIndex--;
  }
  //  active კლასის ხელახლა დამატება შესაბამის ელემენტზე
  renderSlides();
}

// COMMENT autosliding
// id სლაიდერის ინტერვალისთვის
let autoSlidingId = null,
  isSlidingInProcess = false,
  sliderImg = document.querySelector(".slider-wrapper img"),
  isSlidingStopped = true;

function startIntervalFnSlider() {
  // ეს კოდი შესრულდება ყოველ 3 წამში (3000 მილიწამში)
  autoSlidingId = setInterval(showNextSlide, 3000);
  isSlidingInProcess = true;
}

// autosliding -ის შეჩერება
function stopIntervalFnSlider() {
  clearInterval(autoSlidingId);
  isSlidingStopped = true;
  isSlidingInProcess = false;
}

// autosliding-ის დამატება შესაბამის ღილაკებზე
startAutoSliding.addEventListener("click", startIntervalFnSlider);
stopAutoSliding.addEventListener("click", stopIntervalFnSlider);

// სლაიდერის დარენდერება საიტის ჩატვირთვისას
initSlider();

sliderImg.addEventListener("mouseenter", function () {
  if (isSlidingInProcess === true) {
    stopIntervalFnSlider();
    isSlidingStopped = false;
  }
});

sliderImg.addEventListener("mouseleave", function () {
  if (isSlidingStopped === false) {
    startIntervalFnSlider();
  }
});
