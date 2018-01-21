function createElements(numberOfElements) {

    var elementsArray = [];

    for (var i = 0; i < numberOfElements; i++) {

        var element = document.createElement("div");

        elementsArray.push(element);

    }

    return elementsArray
}

function createSlides(numberOfSlides) {

    var slideCounter = 1;
    var slideNumberCounter = 1;

    var slideElements = createElements(numberOfSlides);

    for (var i = 0; i < slideElements.length; i++) {

        slideElements[i].classList.add("slides")
        slideElements[i].classList.add("slide-" + slideCounter++);
        slideElements[i].setAttribute("data-slidenumber", "slide-" + slideNumberCounter++);

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
        buttonElements[i].setAttribute("data-slidenumber", "slide-" + slideButtonDatasetCounter++);

        buttonElements[i].addEventListener("click", slideButtonClick);

    }

    console.log(buttonElements)

    return buttonElements

}

function appendElements(elementsArray, container) {

    for (var i = 0; i < elementsArray.length; i++) {

        container.appendChild(elementsArray[i]);

    }

}

function slideButtonClick(e) {

    var slideButtons = document.querySelectorAll(".buttons");

    var targetButton = e.target;

    var targetButtonDataset = e.target.dataset.slidenumber;

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

    var slideContainer = document.querySelector(".slide-container");

    for (var i = 0; i < slideNumberArray.length; i++) {

        var elementPosition = document.querySelector("." + targetButtonDataset).offsetLeft;

        if (targetButtonDataset === slideNumberArray[i]) {

            var scroll_source_object = {
                x: slideContainer.scrollLeft
            };

            TweenMax.to(scroll_source_object, 2, {
                x: elementPosition,
                onUpdate: function() {
                    slideContainer.scrollTo(scroll_source_object.x, 0);
                },
                ease: Power3.easeOut
            });
        }
    }
}

var request = new XMLHttpRequest();
request.open('GET', '/c2c/test2.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);

    for(var i = 0; i < data.length; i++){

    	console.log(data[i])

    }

  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

function app() {

    var slideContainer = document.querySelector(".slide-container");
    var buttonContainer = document.querySelector(".button-container");

    var slides = createSlides(10);

    appendElements(slides, slideContainer);

    var numberOfSlides = slides.length;

    var buttons = createSlideButtons(numberOfSlides);

    appendElements(buttons, buttonContainer);

}

window.onload = app();