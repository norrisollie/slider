var app = {};
// store dom element variables in dom object
app.dom = {};
// store functions in functions object
app.functions = {}

app.dom.body = document.querySelector("body");

// init function starts on page load
app.functions.init = function(slideData) {

    console.log("App is running.");

    // create containers for slider
    var createContainers = app.functions.createContainers();

    // get number of slides
    var numberOfSlides = slideData.length;

    // create slide elements
    var slideElements = app.functions.createElements(numberOfSlides);

    // append slides to container
    	app.functions.appendChild(slideElements)

    console.log(slideElements)

}

app.functions.slideData = function() {

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

    // create arrows
    var arrowLeft = document.createElement("div");
    arrowLeft.classList.add("arrow", "arrow-left");

    // append element to container
    pageContainer.appendChild(arrowLeft);

    var arrowRight = document.createElement("div");
    arrowRight.classList.add("arrow", "arrow-right")

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

app.functions.appendElements = function(nameOfElement) {

	var container = document.querySelector(".container");

	for(var i = 0; i < nameOfElement.length; i++) {

		container.appendChild(nameOfElement)

	}





}







window.onload = app.functions.slideData;