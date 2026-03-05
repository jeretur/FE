'use strict';

let lowBmi = `If your BMI is below 18.5, it indicates underweight. 
This may be caused by a long-term illness or an eating disorder such as anorexia. 
If there is no underlying illness but your BMI has fallen below 18.5, you should consult a doctor. 
If your weight has dropped significantly within a few months from a BMI level above 20, it is safest to see a doctor already when the BMI approaches 19.`;

let normalBmi = `The normal BMI range is the range where a person's health is generally at its best. 
The normal BMI range is between 18.5 and 25. 
If the BMI is lower than 18.5 or higher than 25, the risk of diseases increases. 
BMI can be used from the age of 18 onwards.`;

let highBmi = `When BMI exceeds 25, a person is considered overweight. 
The amount of excess weight can vary greatly, from a few kilograms to many tens of kilograms. 
Therefore, it is useful to specify how significant the overweight condition is.`;


console.log(window.innerHeight);
console.log(window.innerWidth);

// finds the first element
const analysis = document.querySelector('.analysis');
console.log(analysis);
console.log(analysis.innerText);
console.log(analysis.innerHTML);

analysis.textContent = 'Hello there 😎';
analysis.textContent = normalBmi;

// all
const allP = document.querySelectorAll('p');
console.log(allP);

for (const p of allP) {
    console.log('Height of the P element.');
    console.log(p.offsetHeight);
}

// events

// document.addEventListener (What we listen to, what we do)
document.addEventListener('keydown', function(e) {
    console.log(e.key);
});

const nappula = document.querySelector('.calculate');
nappula.addEventListener('click', function(evt) {
    console.log('Button was clicked');
    console.log(evt);

    // Usually when we get a value from the UI,
    // it is initially in STRING format.
    const weight = Number(document.getElementById('weight').value);
    const height = Number(document.getElementById('height').value);

    console.log(typeof weight);
    let yht = weight + height;
    console.log(yht);
    
    if (!weight || !height) {
        analysis.textContent=
        console.log('Remember to enter the numbers!')
    }
    else {
        resettiFunktio();
        bmiLaskuri(weight, height);
    }
});

function bmiLaskuri(weight, height) {
    console.log('Calculating BMI');
    let bmi = (weight / ((height * height) / 10000)).toFixed(1);
    console.log(bmi);
    document.querySelector('.bmi-score').textContent = bmi;

    if(bmi <= 18.9) {
        console.log('Underweight')
        document.querySelector('.analysis').textContent = lowBmi;
        document.querySelector('.bmi0-19').style.color = '.lowBmi';
        document.querySelector('.bmi0-19').classList.add('lowBmi');
    } else if (bmi >= 25 ) {
        console.log('Overweight')
        document.querySelector('.analysis').textContent = highBmi;
        document.querySelector('.bmi25-30').style.color = '.highBmi';
        document.querySelector('.bmi25-30').classList.add('highBmi');
    } else {
        console.log('Normal weight')
        document.querySelector('.analysis').textContent = normalBmi;
        document.querySelector('.bmi19-25').style.color = '.normalBmi';
        document.querySelector('.bmi19-25').classList.add('normalBmi');
    }

}

function resettiFunktio() {
    // Reset styles
    document.querySelector('.bmi0-19').classList.remove('lowBmi');
    document.querySelector('.bmi19-25').classList.remove('normalBmi');
    document.querySelector('.bmi25-30').classList.remove('highBmi');

    // Restore default text
    document.querySelector('.analysis').textContent = 'Your BMI analysis will appear here';
}