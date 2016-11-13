var userDatapoints = []; //Create an empty array to store datapoints Objects to pass to CanvasAPI
var fileDatapoints = []; // Array to hold details on each file that is loaded (fileName, No. of Lines)
var chart;

function Upload() {
    console.log("Upload function Start");
    
    var files = document.getElementById("fileInput").files;
    
    for(var i = 0; i < files.length; i++){
        var fileName = files[i].name;     // Get the path of the file currently selected
        console.log(fileName);
        if(fileName){                                                  // Check if a file has been selected
            //var fileName = files[i].value.toString();
            //var pathArray = fileName.split("\\");
            //fileName = pathArray.pop();

            var fileDatapointsIndex = Indexer("fileDatapoints_indexQuery", fileName);

            if (fileDatapointsIndex < 0) {
                    var id = Indexer("fileDatapoints_indexQuery", fileName);
                    LoadFile(fileName, files[i]);
                    } else {
                    alert("Cannot add files with the same name!");
                    }
            } else  {
                alert("There is no file selected!");
        }
    }
}

function LoadFile(fileName, files){
    var codeLength;
    var openFile = (function(event) {
        var reader = new FileReader();
        reader.onload = function(){
            var dataURL = reader.result;
            var fileAsText = reader.result;
            var response = [];
            response = fileAsText.split("\n");
            codeLength = response.length;
            document.getElementById("codeContainerInside").textContent = fileAsText;
            AddFileName(fileName, codeLength, fileAsText);
        };
    reader.readAsText(files);
    })();
}

// REDUNDANT CODE *******************************************
/*
function AjaxRequest (fileName) {
        console.log("Ajax Request");
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", fileName, true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                document.getElementById("codeContainerInside").textContent = this.responseText;
                
            } else {
                console.log("File did not load!" + xhttp.readyState);
            }
        };
}
*/
// REDUNDANT CODE *******************************************

function AddFileName(fileName, codeLength, fileAsText) {
                
                var dpObj2 = {label: fileName, y: codeLength, data: fileAsText};
                fileDatapoints.push(dpObj2);                    // Store, fileType and lines in array
                
                var newLi = document.createElement('li');
                var nFileName = document.createElement('span');
                var newLiID = "lifile" + fileName;
                var nFileNameID = "nfile" + fileName;

                newLi.setAttribute('id', newLiID);
                nFileName.setAttribute('id', nFileNameID);
                nFileName.textContent = fileName;

                document.getElementById("fileList").appendChild(newLi);
                document.getElementById(newLiID).appendChild(nFileName);                
    
                var delete_id = 'fdel' + fileName;
                var new_delete_btn = document.createElement('span');
                new_delete_btn.setAttribute('id', delete_id);
                new_delete_btn.setAttribute('class', "delBtn");
                document.getElementById(newLiID).appendChild(new_delete_btn);
                document.getElementById(delete_id).innerHTML += "x";

                var disp_id = 'fdisp' + fileName;
                var new_disp_btn = document.createElement('span');
                new_disp_btn.setAttribute('id', disp_id);
                new_disp_btn.setAttribute('class', "dispBtn");
                document.getElementById(newLiID).appendChild(new_disp_btn);
                document.getElementById(disp_id).innerHTML += "Show";

                document.getElementById(delete_id).addEventListener('click', deleteFile, false);
                document.getElementById(disp_id).addEventListener('click', showFile, false);
                
                AddFileExtension(fileName, codeLength, fileAsText);
}

function AddFileExtension(fileName, codeLength, fileAsText) {
    console.log("AddFileExtension function");
    var fileExtension = "." + fileName.split(".")[1];
    var userDatapointsIndex = Indexer("userDatapoints_indexQuery", fileExtension);
    
    if(userDatapointsIndex < 0) {            
        var dpObj = {label: fileExtension, y: codeLength};
        userDatapoints.push(dpObj); // fileExtension                   // Store, Extensions and total lines in array
                
                var newLi = document.createElement('li');
                var nFileExLabel = document.createElement('span');
                var nFileExPrpty = document.createElement('span');
                var nLengthLabel = document.createElement('span');
                var nLengthPrpty = document.createElement('span');
                var nFilesLabel = document.createElement('span');
                var nFilesPrpty = document.createElement('span');

                var newLiID = "index" + fileExtension;
                var nLengthID = "l" + fileExtension;
                var nTypeID = "t" + fileExtension;
                var nFilesID = "f" + fileExtension;
                newLi.setAttribute('id', newLiID);
                nLengthPrpty.setAttribute('id', nLengthID);
                nFileExPrpty.setAttribute('id', nTypeID);
                nFilesPrpty.setAttribute('id', nFilesID);

                nFileExLabel.textContent = "Type:";
                nFileExPrpty.textContent = fileExtension;
                nLengthLabel.textContent = "Lines:";
                nLengthPrpty.textContent = codeLength;
                nFilesLabel.textContent = "Files:";
                nFilesPrpty.textContent = "1";

                document.getElementById("typeList").appendChild(newLi);
                document.getElementById("index" + fileExtension).appendChild(nFileExLabel);
                document.getElementById("index" + fileExtension).appendChild(nFileExPrpty);
                document.getElementById("index" + fileExtension).appendChild(nLengthLabel);
                document.getElementById("index" + fileExtension).appendChild(nLengthPrpty);
                document.getElementById("index" + fileExtension).appendChild(nFilesLabel);
                document.getElementById("index" + fileExtension).appendChild(nFilesPrpty);

        } else {
                console.log("file type already exisits");
                            
                let lineSum = parseInt(document.getElementById("l" + fileExtension).textContent) + codeLength;
                document.getElementById("l" + fileExtension).textContent = lineSum;
                let fileSum = parseInt(document.getElementById("f" + fileExtension).textContent) + 1;
                document.getElementById("f" + fileExtension).textContent = fileSum;
                alert("Line total has been added");
                
                // Store Name and Length for each file
                userDatapoints[userDatapointsIndex].y += codeLength;
            }
}

// ************************************************************************************* //

function compileRedraw(){
    
    chartName = renameChart();
    
    function renameChart(){
        var chartName = document.getElementById("ProjectName").value;
        console.log(chartName);
        return chartName;
    }
    
    chartTheme = toggleTheme();
    
    function toggleTheme(){
        //Assign array to simple to use variable
        var selectTheme = document.getElementsByName("themeToggle");
        //Loop through variable array to look for which one is checked
        for (var i=0; i<selectTheme.length; i++) {
        if (selectTheme[i].checked) 
            {
            chartTheme = selectTheme[i].value;
            } else {
            chartTheme = "theme2";
            }
      }
        return chartTheme;
    }
    
    chartAnimation = toggleAnimation();

    function toggleAnimation(){
        var selectAnimation = document.getElementsByName("animationToggle");
        for (var i=0; i<selectAnimation.length; i++) {
        if (selectAnimation[i].checked == true)
            {
            chartAnimation = true;
            break;
            }
            else 
            {
            chartAnimation = false;
            break;
            }
        }
        return chartAnimation;
      }
    
    chartType = toggleStyle();
    
    function toggleStyle(){
        var selectStyle = document.getElementById("styleToggle");
        var chartType = selectStyle.value;
        return chartType;
    }

// CANVAS API ********************************************************************************************** //
    
        CanvasAPIInitialize(chartType, chartTheme, chartAnimation, chartName);
        function CanvasAPIInitialize(chartType, chartTheme, chartAnimation, chartName) {
        let presetdata;
        if (userDatapoints.length == 0) {
             presetdata = [
                    { label: "Javascript",  y: 100 },
                    { label: "HTML", y: 15  },
                    { label: "CSS", y: 25  },
                    { label: "C#",  y: 30  },
                    { label: "ASP.NET",  y: 28  }		                 ];
            chartName = "PresetData";
            userDatapoints = presetdata;
        }
        chart = new CanvasJS.Chart("chartContainer", {
		theme: chartTheme, //theme1
		title: {	text: chartName },
		animationEnabled: chartAnimation,   // change to true
		data: [ {
                type: chartType, // Change type to "bar", "area", "spline", "pie",etc.
                dataPoints: userDatapoints
		      } ]
	});
	chart.render();
            if (userDatapoints == presetdata){ userDatapoints = []}
}}

// DELETE FUNCTION ********************************************************************************************* //

function deleteFile(){  
    
    console.log("Delete function Start");
    
    var fileName = this.id.split("del")[1];                         // Get File Name to reference
    
    var fileExtension = "." + fileName.split(".")[1];              // File Extension to reference
    
    var listFilesIndex = Indexer("fileList_indexQuery", fileName);
    var listExtensionsIndex = Indexer("extensionList_indexQuery", fileExtension);
    var userDatapointsIndex = Indexer("userDatapoints_indexQuery", fileExtension);
    var fileDatapointsIndex = Indexer("fileDatapoints_indexQuery", fileName);
    
    var fileNameContainer = this.parentElement;                              // List item ID
        
    var fileList = document.getElementById("fileList");
    var typeList = document.getElementById("typeList");
    
    var codeLength = fileDatapoints[fileDatapointsIndex].y
    var fileCount = parseInt(document.getElementById("f" + fileExtension).textContent);
    
    
    if (fileCount > 1) {
    
        userDatapoints[userDatapointsIndex].y -= codeLength;
        //Decrement the fileCount (var)
        fileCount -= 1;
        document.getElementById("f" + fileExtension).textContent = fileCount;
        document.getElementById("l" + fileExtension).textContent = userDatapoints[userDatapointsIndex].y;
        
        // Remove from fileList (html)
        fileList.removeChild(fileNameContainer);
        fileDatapoints.splice(fileDatapointsIndex, 1);
        
    } else {
        // Remove from fileList (html)
        fileList.removeChild(fileNameContainer);
        
        // Remove from File Extensions List 
        typeList.removeChild(document.getElementById("t" + fileExtension).parentElement);
    
        
        // Remove from datapoints Array
        userDatapoints.splice(userDatapointsIndex, 1);
        
        // Remove from fileDatapoints Array
        fileDatapoints.splice(fileDatapointsIndex, 1);
        
    }
    document.getElementById("codeContainerInside").textContent = "";
    console.log("End of Delete");
    console.log(userDatapoints);
    console.log(fileDatapoints);
}

function Indexer(methodCall, par) {
    
    var switchReturn;    //declar a reutrn value to modifty through the function.
    var fileName = par;
    var fileExtension = par;
    var fileList = document.getElementById("fileList");
    var typeList = document.getElementById("typeList");
    
    switch (methodCall) {
        case "fileList_indexQuery": // Find the Index of fileName in the fileList
            console.log("******** fileList indexQuery *********");
                    
            if (fileList.childElementCount != 0) {                              // make sure the list isnt empty
                for(var i=0; i<fileList.childElementCount; i++) {
                    if ((document.getElementById("nfile" + fileName).textContent) == fileName) {
                        console.log("filename already exists");                 //DEBUG
                        switchReturn = i;                                       // return files location in list
                        break;
                    } else {
                    console.log("This fileName is new");                        //DEBUG
                    switchReturn = parseFloat(fileList.childElementCount);      // return incremeted index value for new field
                    switchReturn++;
                    continue;
                    } // END IF
                } // END FOR
            } else {
                console.log("No Elements currently in the list");                //DEUBG
                switchReturn = 1;                                                // return starting index for empty list
            }
            break;
            
        case "extensionList_indexQuery":  // INPROGRESS ********************************
            console.log("******** extensionList indexQuery ******");
            if(typeList.childElementCount > 0) {                                // check if there are any elements in the list
                for (var i = 0; i < typeList.childElementCount; i++) {
                    if (document.getElementById("t" + fileExtension).textContent == fileExtension) {
                        switchReturn = i;
                        console.log("exList " + switchReturn);
                        break;
                    } else {
                        switchReturn = -1;
                        console.log("exList " + switchReturn);
                    } // END IF
                } // END FOR
            } else {
                switchReturn = -2;
                console.log("exList" + switchReturn);
            } // END IF
            break;
            
        case "userDatapoints_indexQuery":
            console.log("******* userDatapoints indexQuery *******");
            if (userDatapoints.length > 0) {    
                for (var i = 0; i < userDatapoints.length; i++) {
                    if (userDatapoints[i].label == fileExtension) {
                        console.log("udp Index " + i);
                        switchReturn = i;
                        break;
                    } else {
                        switchReturn = -1;
                        console.log("udp Index -1");
                    } // END IF
                } // END FOR
            } else {
                switchReturn = -1;
                console.log("udp Index -2");
            } // END IF
            break;
            
        case "fileDatapoints_indexQuery":
            console.log("********* fileDatapoints indexQuery ******");
            if(fileDatapoints.length != 0) {
                for (var i = 0; i < fileDatapoints.length; i++) {
                    console.log("fdp.label " + fileDatapoints[i].label == fileName);
                    if (fileDatapoints[i].label == fileName) {
                        console.log("fdp Index " + i);
                        switchReturn = i;                               // returns the index that the file is at
                        break;
                    } else {
                        console.log("fdp return -2")
                        switchReturn = -2;                              // Return value for value not in the list
                    } // END IF
                } // END FOR
            } else {
                console.log("fdp return -1")
                switchReturn = -1;                                      // Return value for EMPTY array
            }
            break;
            
        default:
            console.log("CASE STATEMENT DOESNT MatCH!");
            break;
    }
return switchReturn;
}

function clearFiles(){
        fileDatapoints = [];
        userDatapoints = [];
        document.getElementById("fileList").innerHTML = "";
        document.getElementById("typeList").innerHTML = "";
    }


// EVENT LISTENERS ********************************************************************************************* //

document.getElementById("clearFiles").addEventListener('click', clearFiles, false);
document.getElementById("renderChartBtn").addEventListener('click', compileRedraw, false);
document.getElementById("UploadBtn").addEventListener('click', Upload, false);
window.onload = compileRedraw;