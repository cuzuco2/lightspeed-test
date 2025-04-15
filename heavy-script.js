let veryLargeArray = [];
for (let i = 0; i < 1000000; i++) {
    veryLargeArray.push(i); // Create a huge array to block the main thread
}

function longRunningFunction() {
    let result = 0;
    for (let i = 0; i < 500000; i++) {
        result += i;  // Simulate heavy computation
    }
    console.log("Long function finished: " + result);
}

longRunningFunction(); // Call it immediately to block