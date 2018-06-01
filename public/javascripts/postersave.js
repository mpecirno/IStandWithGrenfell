
$('#save_image_locally').click(function(){
  console.log("clicked");
  var src = document.getElementById("poster-generated");
  var img = document.getElementById("image");
  takeHighResScreenshot(src, img, 6); // This time we provide desired scale factor directly, no more messing with DPI
});

function takeHighResScreenshot(srcEl, destIMG, scaleFactor) {

//ensure browser is at correct position
    $('html,body').animate({
    scrollTop: $("#section-gallery").offset().bottom},
    0);
    console.log("scrolled");
//Save original size of element
var originalWidth = srcEl.offsetWidth;
var originalHeight = srcEl.offsetHeight;
// Force px size (no %, EMs, etc)
srcEl.style.width = originalWidth + "px";
srcEl.style.height = originalHeight + "px";

// Position the element at the top left of the document because of bugs in html2canvas. The bug exists when supplying a custom canvas, and offsets the rendering on the custom canvas based on the offset of the source element on the page; thus the source element MUST be at 0, 0.
// See html2canvas issues #790, #820, #893, #922
var OriginalStylePosition = srcEl.style.position;
var OriginalStyleTop = srcEl.style.top;
var OriginalStyleLeft = srcEl.style.left;

srcEl.style.position = "fixed";
srcEl.style.top = "0";
srcEl.style.left = "0";

// Create scaled canvas
var scaledCanvas = document.createElement("canvas");
scaledCanvas.width = originalWidth * scaleFactor;
scaledCanvas.height = originalHeight * scaleFactor;
scaledCanvas.style.width = originalWidth + "px";
scaledCanvas.style.height = originalHeight + "px";
var scaledContext = scaledCanvas.getContext("2d");
scaledContext.scale(scaleFactor, scaleFactor);

html2canvas(srcEl, { canvas: scaledCanvas })
.then(function(canvas) {
//        destIMG.src = canvas.toDataURL("image/png");
//        srcEl.style.display = "none";
    //new below
    var a = document.createElement('a');
    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    a.download = 'IStandWithGrenfell.jpeg';
    a.click();
});
srcEl.style.position = OriginalStylePosition;
srcEl.style.top = OriginalStyleTop;
srcEl.style.left = OriginalStyleLeft;
};
