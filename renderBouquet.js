window.addEventListener("DOMContentLoaded", () => {
  const flowerImages = [
    "assets/rose-straight.png",
    "assets/lys-straight.png",
    "assets/sunflower-straight.png",
    "assets/tulip-straight.png",
    "assets/babies-breath-straight.png",
    "assets/daisy-straight.png"
  ];

  const vaseImages = [
    "assets/pink-vase-straight.png",
    "assets/green-vase-straight.png",
    "assets/blue-vase-straight.png"
  ];

  //Get selected flowers and vase from localStorage
  const selectedFlowers = JSON.parse(localStorage.getItem("selectedFlowers")) || [];
  const selectedVase = parseInt(localStorage.getItem("selectedVase"), 10);

  //Get the spans for name and message
  const loverNameSpan = document.getElementById("lover-name");
  const loverMsgSpan = document.getElementById("lover-msg");

  //Get values from localStorage
  const storedName = localStorage.getItem("loverName") || "My Valentine";
  const storedMsg = localStorage.getItem("loverMsg") || "A sweet message for you ❤️";

  //Set retrieved text inside the spans
  loverNameSpan.innerText = storedName;
  loverMsgSpan.innerText = storedMsg;

  //Set vase image
  if (selectedVase >= 0 && selectedVase < vaseImages.length) {
    document.getElementById("vase").src = vaseImages[selectedVase];
  }

  //Set flower images
  selectedFlowers.forEach((flowerIndex, i) => {
    // Ensure flowerIndex is valid
    if (flowerIndex >= 0 && flowerIndex < flowerImages.length) {
      document.getElementById(`flower${i + 1}`).src = flowerImages[flowerIndex];
    }
  });

  console.log("Rendering bouquet with:", selectedFlowers, selectedVase);

  //Screenshot functionality
  const screenshotBtn = document.getElementById('screenshot-btn');

  screenshotBtn.addEventListener('click', () => {
    screenshotBtn.classList.add('hidden');
    //Send message to the main process to capture the screenshot
    window.electronAPI.captureScreenshot();
  });

  //Listen for the 'screenshot-saved' event from main process
  window.electronAPI.onScreenshotSaved((event, filePath) => {
    console.log('Screenshot saved at:', filePath);
    alert(`Screenshot saved at: ${filePath}`);
    screenshotBtn.classList.remove('hidden');
  });
  
});