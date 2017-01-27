var img;
var backgroundColor;
var strokeColor;
var rectX;
var rectY;

function setup() {
    url = getURL();
    url = url.split('_');
    if (url.length > 2) {
        // Set the canvas size
        var canvasWidth = new Number(url[2]);
        var canvasHeight = new Number(url[4]);
        if (canvasWidth > canvasHeight) {
            canvasWidth = canvasHeight;
        } else {
            canvasHeight = canvasWidth;
        }
        var julia_fractal = createCanvas(canvasWidth, canvasHeight);
        julia_fractal.parent('#img');
        // Set the background
        if (url[17] == 'b') {
          backgroundColor = 0;
          strokeColor = 255;
        } else if (url[17] == 'w') {
          backgroundColor = 255;
          strokeColor = 0;
        }
        background(backgroundColor);
        // Set the colors
        var redC = 0;
        var greenC = 0;
        var blueC = 0;
        if (url[18].indexOf('r') >= 0) {
          redC = 255;
        }
        if (url[18].indexOf('g') >= 0) {
          greenC = 255;
        }
        if (url[18].indexOf('b') >= 0) {
          blueC = 255;
        }
        // Set the rect mode and initialize squares
        img = Julia(-2, 2, -2, 2, 0, 1);
        rectMode(CENTER);
        rectX = 0;
        rectY = 0;
    }
}

function draw() {
    background(backgroundColor);
    stroke(strokeColor);
    image(img, 0, 0);
    noFill();
    stroke(strokeColor);
    rect(rectX, rectY, width/4, height/4);
}

function mouseMoved() {
    rectX = mouseX;
    rectY = mouseY;
}

/**
 * Complex number object
 */
function Complex(real, imaginary) {

    this.real = new Number(real);
    this.imaginary = new Number(imaginary);

    this.add = function(other) {
        this.real += other.real;
        this.imaginary += other.imaginary;
	return this;
    };

    this.multiply = function(other) {
        var new_real = this.real*other.real - this.imaginary*other.imaginary;
        var new_imaginary = this.real*other.imaginary + this.imaginary*other.real;
	this.real = new_real;
        this.imaginary = new_imaginary;
        return this;
    };

    this.abs = function() {
        return Math.sqrt(this.real*this.real + this.imaginary*this.imaginary);
    };

}

/**
 * Julia set image rendering algorithm
 */
function Julia(x_start, x_end, y_start, y_end, re, im) {

    // Set the increment parameter and range values
    var complex_parameter = new Complex(re, im);
    var re_start = new Number(x_start);
    var re_end = new Number(x_end);
    var im_start = new Number(y_start);
    var im_end = new Number(y_end);
    // Set the image
    var fractal = createImage(width, height);
    // Algorithm to count the Julia set points
    // Find the R value
    var r_border = (1+Math.sqrt(1+4*complex_parameter.abs()))/2;
    fractal.loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var re = re_start+x/width*(re_end-re_start);
            var im = im_start+y/height*(im_end-im_start);
            var z = new Complex(re, im);
            var f = z.multiply(z).add(complex_parameter);
            var color_value = 255;
            for (var iteration = 0; iteration < 255; iteration++) {
                if (f.abs() > r_border) {
                    color_value = iteration;
                    break;
                }
                f = f.multiply(f).add(complex_parameter);
            }
            fractal.set(x, y, color(color_value, color_value, color_value));
        }
    }
    fractal.updatePixels();
    
    return fractal;

}
