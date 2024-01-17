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



    <!-- <script src="https://cdn.thumbmarkjs.com/latest/Thumbmark.js"></script>
    <script src="scriptTwo.js"></script> -->




    old script.js
    function getBrowserFingerprint() {
  let fingerprint = {
    browser: {
      userAgent: navigator.userAgent,
      vendor: navigator.vendor,
      product: navigator.product,
      productSub: navigator.productSub,
    },
    system: {
      touchPoints: navigator.maxTouchPoints,
      memory: navigator.deviceMemory,
      cors: navigator.hardwareConcurrency,
      platform: navigator.platform,
    },
    language: navigator.language,
    // screen: {
    //   width: screen.width,
    //   height: screen.height,
    //   colorDepth: screen.colorDepth,
    //   pixelDepth: screen.pixelDepth,
    // },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
  return fingerprint
}

function hashObject(obj) {
  return Math.abs(
    JSON.stringify(obj)
      .split("")
      .reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)
  )
}

const fingerprint = getBrowserFingerprint()
const fingerprintHash = hashObject(fingerprint)

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".hash").innerHTML = fingerprintHash
})
