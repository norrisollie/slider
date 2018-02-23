function createElements(numberOfElements) {

    var elementsArray = [];

    for (var i = 0; i < numberOfElements; i++) {

        var element = document.createElement("div");

        elementsArray.push(element);

    }

    return elementsArray
}

var numberOfSlides;

function createSlides(data) {

    var slideCounter = 1;
    var slideNumberCounter = 1;

    var slides = data.slides;
    var filtered = slides.filter(function(slide) {
        var isObject = typeof slide === "object"
        return isObject
    })
    var numberOfSlides = filtered.length;

    console.log(numberOfSlides)

    var slideElements = createElements(numberOfSlides);

    for (var i = 0; i < numberOfSlides; i++) {

        console.log(typeof filtered[i])

        if (typeof filtered[i] === "object") {

            var title = filtered[i].slide_title;
            var message = filtered[i].slide_message;
            var color = filtered[i].slide_background;

            console.log(title);
            console.log(message);

            slideElements[i].classList.add("slides")
            slideElements[i].style.backgroundColor = color;
            slideElements[i].classList.add("slide-" + slideCounter++);
            slideElements[i].setAttribute("data-slidenumber", "slide-" + slideNumberCounter++);

            slideElements[i].innerHTML += title + " " + message;

        }
    }

    console.log(slideElements)

    return slideElements

}

function createSlideButtons(slideArrayLength) {

    var slideButtonClassCounter = 1;
    var slideButtonTextCounter = 1;
    var slideButtonDatasetCounter = 1;

    var buttonElements = createElements(slideArrayLength);

    for (var i = 0; i < buttonElements.length; i++) {

        buttonElements[0].classList.add("active");

        buttonElements[i].classList.add("buttons")
        buttonElements[i].classList.add("button-" + slideButtonClassCounter++);
        buttonElements[i].textContent = slideButtonTextCounter++;
        buttonElements[i].setAttribute("data-slidenumber", slideButtonDatasetCounter++);
        buttonElements[i].setAttribute("data-buttontype", "slideButton");

        buttonElements[i].addEventListener("click", clickEventHandler);

    }

    console.log(buttonElements)

    return buttonElements

}

function createArrows(numberOfArrows) {

    var leftArrow = document.createElement("div");
        leftArrow.classList.add("arrow", "arrow-left");
        leftArrow.setAttribute("data-buttontype", "arrow");
        leftArrow.setAttribute("data-arrowdirection", "left");

    var rightArrow = document.createElement("div");
        rightArrow.classList.add("arrow", "arrow-right");
        rightArrow.setAttribute("data-buttontype", "arrow");
        rightArrow.setAttribute("data-arrowdirection", "right");

        var arrows = [leftArrow, rightArrow];

        for(var i = 0; i < arrows.length; i++) {
            arrows[i].addEventListener("click", clickEventHandler); 
        }

    return arrows


}

function appendElements(elementsArray, container) {

    for (var i = 0; i < elementsArray.length; i++) {

        container.appendChild(elementsArray[i]);

    }

}

function clickEventHandler(e) {

    var slideButtons = document.querySelectorAll("buttons");
    var arrows = document.querySelectorAll("arrows");

    var clickTarget = e.target.dataset.buttontype

    switch(clickTarget) {

        case "slideButton":

            slideButtonHandler(e);

        break;

        case "arrow":

arrowButtonHandler(e);

        break;

    }
}

var currentSlide = 1;
var numberOfSlides;

function arrowButtonHandler(e) {

    var direction = e.target.dataset.arrowdirection;

        moveSlides(slideNumberPosition)

    switch(direction) {

        case "left":

            currentSlide--

        break;

        case "right":

        currentSlide++

        break;



    }



    if(currentSlide <1) {
        currentSlide = 1;
    }

    if(currentSlide > numberOfSlides) {
        currentSlide = numberOfSlides;
    }

    var targetButton = document.querySelector(".button-" + currentSlide)

    var slideButtons = document.querySelectorAll(".buttons");

    for (var i = 0; i < slideButtons.length; i++) {

        slideButtons[i].classList.remove("active");

    }

    targetButton.classList.add("active");

    var slideNumberPosition = document.querySelector(".slide-" + currentSlide).offsetLeft;

            moveSlides(slideNumberPosition)

    console.log(currentSlide)

}

function slideButtonHandler(e) {

    var slideButtons = document.querySelectorAll(".buttons");

    var targetButton = e.target;

    var targetButtonDataset = e.target.dataset.slidenumber;

    currentSlide = targetButtonDataset;



    for (var i = 0; i < slideButtons.length; i++) {

        slideButtons[i].classList.remove("active");

    }

    targetButton.classList.add("active");

    var slides = document.querySelectorAll(".slides");

    var slideNumberArray = [];

    for (var i = 0; i < slides.length; i++) {

        var slideNumber = slides[i].dataset.slidenumber;

        slideNumberArray.push(slideNumber);

    }

    for (var i = 0; i < slideNumberArray.length; i++) {

        var slideNumberPosition = document.querySelector(".slide-" + targetButtonDataset).offsetLeft;

        moveSlides(slideNumberPosition)

    }


}

function moveSlides(slideNumberPosition) {

    var slideContainer = document.querySelector(".slide-container");

    var scroll_source_object = {
                x: slideContainer.scrollLeft
            };

            TweenMax.to(scroll_source_object, 2, {
                x: slideNumberPosition,
                onUpdate: function() {
                    slideContainer.scrollTo(scroll_source_object.x, 0);
                },
                ease: Power3.easeOut
            });

}


function createXMLRequest() {

    var request = new XMLHttpRequest();

    request.open("GET", "test.json", true);

    request.onload = requestSuccess;

    request.onerror = requestError;

    request.send()

    function requestSuccess() {
        console.log("success")

        var data = JSON.parse(this.responseText);

        console.log(data)
        app(data);

    }

    function requestError() {
        console.log("error");
    }

}



function app(data) {


    var wrapper = document.querySelector(".wrapper");
    var slideContainer = document.querySelector(".slide-container");
    var buttonContainer = document.querySelector(".button-container");

    var slides = createSlides(data);
    numberOfSlides = slides.length

    appendElements(slides, slideContainer);

    // var numberOfSlides = slides.length;

    var buttons = createSlideButtons(numberOfSlides);

    appendElements(buttons, buttonContainer);

    // var numberOfArrows = arrowsArr.length;

    var arrows = createArrows();

    appendElements(arrows, wrapper);

}

window.onload = createXMLRequest();