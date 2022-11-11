window.onload = function () {
    // document.getElementById("messageScreen").style.display = "none";
    if (document.getElementById("input-error") != null) {
        document.getElementById("username").style.borderColor = "#c93328";
        document.getElementById("password").style.borderColor = "#c93328";
    }
}

function screenClose() {
    document.getElementById("messageScreen").style.display = "none";
}