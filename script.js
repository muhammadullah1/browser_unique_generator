async function getFingerprint(){
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
    network: {
      localIp: await getLocalIP(),
    },
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(fingerprint));
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

getFingerprint().then(fingerprint => {
  console.log(fingerprint)
  document.querySelector(".hash").innerHTML = fingerprint
})


function getLocalIP() {
    return new Promise((reslove) => {
      try{
        var pc = new (window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection)({
            iceServers: []
        });
        pc.createDataChannel("");
        pc.createOffer(offer => pc.setLocalDescription(offer, () => {}, e => {}), e => {});
        pc.onicecandidate = ice => {
            pc.onicecandidate = () => {};
            pc = null;
            reslove(ice.candidate.address);
        };
      }catch(e){
        reslove(null)
      }
    })
}