// Simulate network latency
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// CLS Issue 1: Header height change
window.onload = async () => {
    await delay(1500);
    document.getElementById('header').style.height = '200px';
};

// CLS & LCP Issue: Replace Carousel with Delayed Image
setTimeout(async () => {
    await delay(3000);
    const carousel = document.getElementById('carousel-container');
    carousel.innerHTML = `<img src="delayed.jpg" alt="Delayed Image" style="width: 100%; height: 500px;">`; // Replace carousel content
    carousel.style.height = 'auto'; // Adjust container height
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
    await delay(1300);
    let endTime = performance.now();
    let interactionTime = endTime - startTime;
    console.log(`Interaction took ${interactionTime.toFixed(2)}ms`);

    alert("Button Clicked! (Slowly)");
    longRunningFunction(); // Keep the heavy function call
});

// Carousel Logic (contributes to CLS if not sized correctly)
const carouselItems = document.querySelectorAll('.carousel-item');
let currentItem = 0;

setInterval(() => {
    carouselItems.forEach(item => item.style.opacity = 0);
    currentItem = (currentItem + 1) % carouselItems.length;
    carouselItems[currentItem].style.opacity = 1;
}, 3000);