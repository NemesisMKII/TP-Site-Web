var readExif = function(fileBlob) {
    JPEG.readExifMetaData(fileBlob, function(error, metaData) {
      console.log(JSON.stringify(metaData))
    });
  };

  var writeExif = function(fileBlob) {
    JPEG.writeExifMetaData(
      fileBlob,
      {"Orientation" : 1},
      function(error, modifiedBlob) {
        // Process modified file
      });
  };

  var processImage = function() {
    var request = new XMLHttpRequest();
    request.open("GET", $("div#images img").attr("src"), true);
    request.responseType = "arraybuffer";
    request.onload = function (event) {
      var arrayBuffer = request.response; // Note: not request.responseText
      var blob = new Blob([arrayBuffer],{type: "image/jpeg"});
      readExif(blob);
      writeExif(blob);
    };
    request.send(null);
  };

  processImage();