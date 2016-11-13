
// Get the modal
var modal = document.getElementById('codeModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

function showFile(){
    var fileName = this.id.split("disp")[1];                         // Get File Name to reference
    var fileExtension = "." + fileName.split(".")[1];              // File Extension to reference
    var fileDatapointsIndex = Indexer("fileDatapoints_indexQuery", fileName);
    document.getElementById("codeContainerInside").textContent = fileDatapoints[fileDatapointsIndex].data;
    document.getElementById("codeModalHeading").textContent = fileName;
    modal.style.display = "block";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}