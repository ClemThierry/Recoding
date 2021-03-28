var gui = new dat.GUI();
var params = {
    N: 300,
    seed: 6,
    rectVersion: false,
    Download_Image: function () { return save(); },
};
gui.add(params, "N", 0, 300, 1);
gui.add(params, "rectVersion");
gui.add(params, "seed", 0, 50, 1);
gui.add(params, "Download_Image");
function draw() {
    background(255, 255, 255);
    randomSeed(params.seed);
    fill(0, 0, 0, 0);
    stroke(0);
    strokeWeight(1);
    if (!params.rectVersion) {
        var change_x = true;
        var x = random(30, height - 30);
        var y = random(30, height - 30);
        beginShape();
        for (var index = 0; index < params.N; index++) {
            if (change_x) {
                x = random(30, width - 30);
            }
            else {
                y = random(30, height - 30);
            }
            vertex(x, y);
            change_x = !change_x;
        }
        endShape();
    }
    else {
        var x = void 0, y = void 0, rectHeight = void 0, rectWidth = void 0;
        for (var index = 0; index < params.N; index++) {
            x = random(30, width - 30);
            y = random(30, height - 30);
            rectHeight = random(20, height - y - 30);
            rectWidth = random(20, width - x - 30);
            rect(x, y, rectWidth, rectHeight);
        }
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map