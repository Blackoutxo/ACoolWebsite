let count = 0;

const button = document.getElementById("btn");
const countDisplay = document.getElementById("spnid");

button.addEventListener("click", function () {
    count ++;

    countDisplay.textContent = count;
})