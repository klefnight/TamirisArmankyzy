const descriptions = {
    "1":"Единицы отвечают за характер и силу воли. Чем их больше — тем сильнее лидерские качества.",
    "2":"Двойки — это энергия и чувствительность. Показывают эмоциональность.",
    "3":"Тройки связаны с интересом к знаниям и общению.",
    "4":"Четвёрки отвечают за здоровье и выносливость.",
    "5":"Пятёрки — логика и мышление.",
    "6":"Шестёрки показывают трудолюбие и практичность.",
    "7":"Семёрки — удача и защита.",
    "8":"Восьмёрки связаны с чувством долга и ответственностью.",
    "9":"Девятки — память и интеллект."
};

const titles = {
    "1":"Характер",
    "2":"Энергия",
    "3":"Интерес",
    "4":"Здоровье",
    "5":"Логика",
    "6":"Труд",
    "7":"Удача",
    "8":"Долг",
    "9":"Память"
};

function getDigits(str) {
    return str.split('').filter(c=>/\d/.test(c)).map(Number);
}

function calculateMatrix(birth) {
    let digits = getDigits(birth);
    if(digits.length===0) return null;

    let sum1 = digits.reduce((a,b)=>a+b,0);
    let sum2 = getDigits(String(sum1)).reduce((a,b)=>a+b,0);
    let first = digits[0];
    let sum3 = Math.abs(sum1 - 2*first);
    let sum4 = getDigits(String(sum3)).reduce((a,b)=>a+b,0);

    let fullDigits = digits.concat(
        getDigits(String(sum1)),
        getDigits(String(sum2)),
        getDigits(String(sum3)),
        getDigits(String(sum4))
    );

    let matrix = {};
    for(let i=1;i<=9;i++) matrix[i]="";
    fullDigits.forEach(d=>matrix[d]+=d);

    let destiny = sum2>9?getDigits(String(sum2)).reduce((a,b)=>a+b,0):sum2;

    let temperament = matrix[2].length+matrix[4].length+matrix[6].length;
    let goal = matrix[1].length+matrix[4].length+matrix[7].length;
    let family = matrix[2].length+matrix[5].length+matrix[8].length;
    let habits = matrix[3].length+matrix[6].length+matrix[9].length;
    let spirituality = matrix[3].length+matrix[5].length+matrix[7].length;

    return {matrix, sum1, sum2, sum3, sum4, destiny, temperament, goal, family, habits, spirituality};
}

function animateElements() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((el, i) => {
        el.style.animationDelay = `${i*0.15}s`;
        el.classList.add("show");
    });

    const sideDivs = document.querySelectorAll(".side div");
    sideDivs.forEach((el, i) => {
        el.style.animationDelay = `${0.4 + i*0.15}s`;
        el.classList.add("show");
    });

    const extra = document.querySelector(".extra");
    extra.style.animationDelay = "1s";
    extra.classList.add("show");
}

function renderRes
