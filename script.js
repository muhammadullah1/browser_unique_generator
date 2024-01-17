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
