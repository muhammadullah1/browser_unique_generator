<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Unique Id Generator</title>
    <link rel="stylesheet" href="style.css" />
    <!-- <script src="script.js"></script> -->

    <script src="https://cdn.thumbmarkjs.com/latest/Thumbmark.js"></script>
    <script src="scriptTwo.js"></script>

  </head>
  <body>
    <h1 class="hash">---</h1>

    <!-- <script>
      ThumbmarkJS.getFingerprintData().then(function (fp) {
        console.log(fp)
        let fingerprint = fp;
      })
    </script> -->
  </body>
</html>


function hashObject(obj) {
    // Convert the object to a JSON string
    const jsonString = JSON.stringify(obj);
    console.log("------jsonString-----", jsonString);
    let hash = 5381;
    for (let i = 0; i < jsonString.length; i++) {
        hash = (hash << 5) + hash + jsonString.charCodeAt(i);
    }
    return hash >>> 0;
}


document.addEventListener("DOMContentLoaded", function () {
  ThumbmarkJS.getFingerprintData().then(function (fp) {
    const fingerprintHash = hashObject(fp)
    document.querySelector(".hash").innerHTML = fingerprintHash
  })
})




scripttTwo.js
// function hashObject(obj) {
//     // Convert the object to a JSON string
//     const jsonString = JSON.stringify(obj);
//     console.log("------jsonString-----", jsonString);
//     let hash = 5381;
//     for (let i = 0; i < jsonString.length; i++) {
//         hash = (hash << 5) + hash + jsonString.charCodeAt(i);
//     }
//     return hash >>> 0;
// }


// document.addEventListener("DOMContentLoaded", function () {
//   ThumbmarkJS.getFingerprintData().then(function (fp) {
//     const fingerprintHash = hashObject(fp)
//     document.querySelector(".hash").innerHTML = fingerprintHash
//   })
// })




document.addEventListener("DOMContentLoaded", function () {
  ThumbmarkJS.getFingerprintData().then(async function (fp) {

    console.log("-------information-------", fp);
    
    const fingerprintHash = await sha256(JSON.stringify(fp));
    document.querySelector(".hash").innerHTML = fingerprintHash;
  });
});

async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = new Uint32Array(hashBuffer.slice(0, 4));
    const numericHash = hashArray[0];

    return numericHash;
}
