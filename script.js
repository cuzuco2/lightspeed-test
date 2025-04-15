// Simulate network latency
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// CLS Issue 1: Header height change
window.onload = async () => {
    await delay(1500);
    document.getElementById('header').style.height = '200px'; // Expand header
};

// CLS Issue 2 & LCP Issue: Delayed loading of image
setTimeout(async () => {
    await delay(3000); // Simulate slow load
    const img = document.querySelector('.delayed-image');
    img.src = 'delayed.jpg'; // Replace with a larger image
}, 500);

// CLS Issue 3: Content injection
setTimeout(async () => {
    await delay(2000);
    document.getElementById('injected-content').innerHTML = `
        <p>This content was injected dynamically after a delay. This causes layout shift.</p>
        <iframe src="https://en.wikipedia.org/wiki/Adobe_Inc." width="400" height="300"></iframe>
    `;
}, 1500);

// INP Issue: Slow interaction
document.getElementById('interaction-button').addEventListener('click', async () => {
    let startTime = performance.now();
    await delay(1300); // Simulate a slow operation
    let endTime = performance.now();
    let interactionTime = endTime - startTime;
    console.log(`Interaction took ${interactionTime.toFixed(2)}ms`);

    alert("Button Clicked! (Slowly)"); // This itself can contribute to INP
    longRunningFunction();  // Add a very slow function call here!
});

// Carousel Logic (contributes to CLS if not sized correctly)
const carouselItems = document.querySelectorAll('.carousel-item');
let currentItem = 0;

setInterval(() => {
    carouselItems.forEach(item => item.style.opacity = 0);
    currentItem = (currentItem + 1) % carouselItems.length;
    carouselItems[currentItem].style.opacity = 1;

}, 3000);