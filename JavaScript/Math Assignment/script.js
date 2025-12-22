const data = [4.2, 5.1, 3.8, 4.7, 5.3];

// Calculate the sum and mean of the data array
function calculateSumAndMean(data) {
    let sum = 0;
    let mean = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i];
    }
    mean = sum / data.length;
    return { sum, mean };
}

const { sum, mean } = calculateSumAndMean(data);

// Output the results
console.log("Sum:", sum);
console.log("Mean:", mean);

// Round the mean to two decimal places
Math.round(mean, 2);

// Change the html to display the calculations completed and the results
document.getElementById("calculations").innerText = `Sum: ${sum}`;
document.getElementById("result").innerText = `Mean: ${mean}`;