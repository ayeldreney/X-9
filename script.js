// Function to calculate rank based on exercise and body weight
// function calculateRank(exercise, inputId) {
//     const bodyWeight = parseFloat(document.getElementById('bodyWeight').value);
//     const liftWeight = parseFloat(document.getElementById(inputId).value);

//     if (!bodyWeight || !liftWeight) {
//         alert("Please enter both body weight and lift weight.");
//         return;
//     }

//     let rank = "F";
//     switch (exercise) {
//         case 'deadlift':
//             rank = getRank(liftWeight / bodyWeight, [1.0, 1.25, 1.5, 1.75, 2.0, 2.25]);
//             document.getElementById('deadliftRank').innerText = `Rank: ${rank}`;
//             break;
//         // Additional cases for each exercise with their specific criteria
//         // Example: case 'latPulldown': rank = getRank(liftWeight / bodyWeight, [0.5, 0.75, 1.0, ...]);
//     }
// }

// // Helper function to determine rank based on thresholds
// function getRank(ratio, thresholds) {
//     const ranks = ["F", "D", "C", "B", "A", "S"];
//     for (let i = 0; i < thresholds.length; i++) {
//         if (ratio < thresholds[i]) return ranks[i];
//     }
//     return "S+";
// }

// // Function to update the progress chart
// function updateProgressChart() {
//     const ctx = document.getElementById('progressCanvas').getContext('2d');
//     // Assume data is collected dynamically from user inputs or stored values
//     const data = {
//         labels: ["Deadlift", "Lat Pulldown", "Bench Press"], // Add other exercises as labels
//         datasets: [{
//             label: 'Progress Over Time',
//             data: [1.2, 1.4, 1.6], // Dynamic values
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1
//         }]
//     };
//     new Chart(ctx, {
//         type: 'line',
//         data: data,
//         options: { responsive: true }
//     });
// }

// // Call updateProgressChart to initialize the chart
// updateProgressChart();

const exerciseRanks = {
    deadlift: { 1.0: 'F', 1.25: 'D', 1.5: 'C', 1.75: 'B', 2.0: 'A', 2.25: 'S' },
    latPulldown: { 0.5: 'F', 0.75: 'D', 1.0: 'C', 1.25: 'B', 1.5: 'A', 1.75: 'S' },
    seatedRow: { 0.5: 'F', 0.75: 'D', 1.0: 'C', 1.25: 'B', 1.5: 'A', 1.75: 'S' },
    iliacPulldown: { 0.25: 'F', 0.5: 'D', 0.75: 'C', 1.0: 'B', 1.25: 'A', 1.5: 'S' },
    benchPress: { 0.5: 'F', 0.75: 'D', 1.0: 'C', 1.25: 'B', 1.5: 'A', 1.75: 'S' },
    inclinePress: { 0.125: 'F', 0.25: 'D', 0.5: 'C', 1.0: 'B', 1.25: 'A', 1.5: 'S' },
    chestFly: { 0.25: 'F', 0.5: 'D', 0.75: 'C', 1.0: 'B', 1.25: 'A', 1.5: 'S' },
    preacherCurl: { 0.1: 'F', 0.15: 'D', 0.25: 'C', 0.35: 'B', 0.5: 'A', 0.75: 'S' },
    bayesianCurl: { 0.25: 'F', 0.3: 'D', 0.4: 'C', 0.45: 'B', 0.5: 'A', 0.75: 'S' },
    tricepPushdown: { 0.1: 'F', 0.2: 'D', 0.3: 'C', 0.4: 'B', 0.5: 'A', 0.75: 'S' },
    overheadExtension: { 0.05: 'F', 0.1: 'D', 0.2: 'C', 0.3: 'B', 0.4: 'A', 0.75: 'S' },
    reverseCurl: { 0.05: 'F', 0.1: 'D', 0.2: 'C', 0.35: 'B', 0.5: 'A', 0.75: 'S' },
    lateralRaise: { 0.05: 'F', 0.1: 'D', 0.15: 'C', 0.2: 'B', 0.35: 'A', 0.5: 'S' },
    rearDeltFly: { 0.05: 'F', 0.1: 'D', 0.25: 'C', 0.3: 'B', 0.4: 'A', 0.5: 'S' },
    legExtension: { 0.5: 'F', 0.75: 'D', 1.0: 'C', 1.25: 'B', 1.5: 'A', 1.75: 'S' },
    squat: { 0.5: 'F', 0.75: 'D', 1.0: 'C', 1.25: 'B', 1.5: 'A', 2.0: 'S' },
    legCurl: { 0.25: 'F', 0.5: 'D', 0.75: 'C', 1.0: 'B', 1.25: 'A', 1.5: 'S' },
    rdl: { 1.0: 'F', 1.25: 'D', 1.5: 'C', 1.75: 'B', 2.0: 'A', 2.25: 'S' },
    calfRaise: { 0.5: 'F', 0.75: 'D', 1.0: 'C', 1.25: 'B', 1.5: 'A', 1.75: 'S' }
};

document.getElementById('calculate').addEventListener('click', function() {
    const bw = parseFloat(document.getElementById('bw').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);
    const exercise = document.getElementById('exercise').value;

    const rpe = weight * (1 + (reps / 30)); // Epley formula for 1RM
    const bwRatio = weight / bw;

    let rank = 'Unknown';
    for (const key of Object.keys(exerciseRanks[exercise]).sort((a, b) => b - a)) {
        if (bwRatio >= parseFloat(key)) {
            rank = exerciseRanks[exercise][key];
            break; // Exit loop once the rank is found
        }
    }

    const result = `1RM: ${rpe.toFixed(2)} kg\nRank: ${rank}`;
    document.getElementById('result').innerText = result;
});