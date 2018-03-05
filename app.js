var app = {};
// store dom element variables in dom object
app.dom = {};
// store functions in functions object
app.functions = {}

app.dom.body = document.querySelector("body");

var numberOfSlides;

// init function starts on page load
app.functions.init = function(slideData) {

    console.log("init is running.");

    // create containers for slider
    var createContainers = app.functions.createContainers();

    // get number of slides
    	numberOfSlides = slideData.length;

    // create slide elements
    var slideElements = app.functions.createSlides(slideData);

    var slideContainer = document.querySelector(".slide-container");

    // append slides to container
    app.functions.appendElements(slideElements, slideContainer);

    // create slide elements
    var buttonElements = app.functions.createButtons(numberOfSlides);

    var buttonContainer = document.querySelector(".slide-button-container");

    // append slides to container
    app.functions.appendElements(buttonElements, buttonContainer);
}

app.functions.slideData = function() {

	console.log("Retrieving slide data.");

    var getSlideData = new XMLHttpRequest();

    getSlideData.open("GET", "slide-data.json", true);

    getSlideData.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            // Success!

            var data = JSON.parse(this.response);

            var slideData = data.slides;

            app.functions.init(slideData);

        } else {
            // We reached our target server, but it returned an error
        }
    }

    getSlideData.onerror = function() {
        // There was a connection error of some sort
    };

    getSlideData.send();

}

app.functions.createContainers = function() {

    console.log("Creating containers and arrows.")

    // create main container
    var pageContainer = document.createElement("div");
    pageContainer.classList.add("container");

    // append element
    app.dom.body.appendChild(pageContainer);

    // create slides container
    var slidesContainer = document.createElement("div");
    slidesContainer.classList.add("slide-container");

    // append element
    pageContainer.appendChild(slidesContainer);

    // create arrows
    var arrowLeft = document.createElement("div");
    arrowLeft.classList.add("arrow", "arrow-left");
    arrowLeft.setAttribute("data-arrowdirection", "left");
    arrowLeft.addEventListener("click", app.functions.arrowButtonClick);

    // append element to container
    pageContainer.appendChild(arrowLeft);

    var arrowRight = document.createElement("div");
    arrowRight.classList.add("arrow", "arrow-right")
    arrowRight.setAttribute("data-arrowdirection", "right");
    arrowRight.addEventListener("click", app.functions.arrowButtonClick);

    // append element to container
    pageContainer.appendChild(arrowRight);

    var slideButtonContainer = document.createElement("div");
    slideButtonContainer.classList.add("slide-button-container");

    // append element to container
    pageContainer.appendChild(slideButtonContainer);

}

app.functions.createElements = function(numberOfElements) {

    var elementsArray = [];

    for (var i = 0; i < numberOfElements; i++) {

        var elements = document.createElement("div");

        elementsArray.push(elements)

    }

    return elementsArray

}

app.functions.createSlides = function(slideData) {

	console.log("Creating slides.");

    var numberOfSlides = slideData.length

    var slideElements = app.functions.createElements(numberOfSlides);

    var slideCounter = 1;
    var slideDatasetCounter = 1;

    for (var i = 0; i < slideData.length; i++) {

        slideElements[i].classList.add("slide", "slide-" + slideCounter++);
        slideElements[i].setAttribute("data-slidenumber", slideDatasetCounter++);

        var slideTitle = slideData[i].slide_title;
        var slideMessage = slideData[i].slide_message;
        var slideBgColour = slideData[i].slide_background;

        slideElements[i].style.backgroundColor = slideBgColour;

    }

    return slideElements
}

app.functions.createButtons = function(numberOfSlides) {

	console.log("Creating slide buttons.")
    var buttonElements = app.functions.createElements(numberOfSlides);

    var buttonCounter = 1;
    var buttonTextCounter = 1;

    for (var i = 0; i < numberOfSlides; i++) {

        buttonElements[i].classList.add("button", "button-" + buttonCounter++);

        buttonElements[i].addEventListener("click", app.functions.slideButtonClick)

    }

    buttonElements[0].classList.add("active");

    return buttonElements
}

var currentSlide = 1;

app.functions.slideButtonClick = function(e) {

	var buttonTarget = e.target;
	var buttonTargetSlideNumber = e.target.dataset.slidenumber;

	var buttons = document.querySelectorAll(".button");

	for(var i = 0; i < buttons.length; i++) {

		buttons[i].classList.remove("active");

	}

		buttonTarget.classList.add("active")

}

app.functions.arrowButtonClick = function(e) {

	var arrowTarget = e.target;
	var arrowTargetDirection = e.target.dataset.arrowdirection;

	var slideContainer = document.querySelector(".slide-container");

	if(arrowTargetDirection === "left") {
		currentSlide--
	}

	if(arrowTargetDirection === "right") {
		currentSlide++
	}

	if(currentSlide <1) {
		currentSlide = 1;
	}

	if(currentSlide>numberOfSlides) {
		currentSlide = numberOfSlides
	}
}

app.functions.appendElements = function(nameOfElement, appendToElement) {

    var container = document.querySelector(".container");

    for (var i = 0; i < nameOfElement.length; i++) {

        appendToElement.appendChild(nameOfElement[i])

    }
}







window.onload = app.functions.slideData;