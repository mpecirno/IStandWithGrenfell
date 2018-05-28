
function preventRefresh() {

var btn = document.getElementById('valueSubmit')
var main = document.getElementById('poster-generated')
console.log("Still here");
btn.addEventListener('click', function(e) {
e.preventDefault(); // comment this out and the browser will redirect
main.innerHTML = main.innerHTML + ' Clicked!'
})

}
