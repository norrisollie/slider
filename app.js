var app = {};
// store dom element variables in dom object
app.dom = {};
// store functions in functions object
app.functions = {}

app.dom.body = document.querySelector("body");

// init function starts on page load
app.functions.init = function() {

    console.log("App is running.");

    // create containers for slider
    var createContainers = app.functions.createContainers();

    // create slide elements
    var slideElements = app.functions.createElements(10);

}

app.functions.slideData = function() {




	return slideData

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







window.onload = app.functions.init;