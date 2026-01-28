const titles = {
    1:"Характер",
    2:"Энергия",
    3:"Интерес",
    4:"Здоровье",
    5:"Логика",
    6:"Труд",
    7:"Удача",
    8:"Долг",
    9:"Память"
};

const descriptions = {
    1:"Единицы отвечают за характер и силу воли. Чем их больше — тем сильнее лидерские качества.",
    2:"Двойки — это энергия и чувствительность. Показывают эмоциональность.",
    3:"Тройки связаны с интересом к знаниям и общению.",
    4:"Четвёрки отвечают за здоровье и выносливость.",
    5:"Пятёрки — логика и мышление.",
    6:"Шестёрки показывают трудолюбие и практичность.",
    7:"Семёрки — удача и защита.",
    8:"Восьмёрки связаны с чувством долга и ответственностью.",
    9:"Девятки — память и интеллект."
};

// Получение всех цифр даты
function getDigits(str) {
    return str.split('').filter(c=>/\d/.test(c)).map(Number);
}

// Расчёт чисел Пифагора
function calculateMatrix(birth) {
    const digits = getDigits(birth);
    if(digits.length === 0) return null;

    const sum1 = digits.reduce((a,b)=>a+b,0);

    // sum2 — редукция sum1
    const sum2raw = getDigits(String(sum1)).reduce((a,b)=>a+b,0);
    const sum2 = sum2raw;

    // sum3 = sum1 - sum2 по классике Пифагора
    let sum3 = sum1 - sum2;
    if(sum3 <= 0) sum3 = 3; // правило для нуля или отрицательного числа

    // sum4 = редукция sum3 до однозначного
    let sum4 = sum3;
    while(sum4 > 9) {
        sum4 = getDigits(String(sum4)).reduce((a,b)=>a+b,0);
    }

    const fullDigits = digits.concat(
        getDigits(String(sum1)),
        getDigits(String(sum2)),
        getDigits(String(sum3)),
        getDigits(String(sum4))
    );

    const destiny = sum2 > 9 ? getDigits(String(sum2)).reduce((a,b)=>a+b,0) : sum2;

    const matrix = {};
    for(let i=1;i<=9;i++) matrix[i]="";
    fullDigits.forEach(d=>matrix[d]+=d);

    const temperament = matrix[2].length+matrix[4].length+matrix[6].length;
    const goal = matrix[1].length+matrix[4].length+matrix[7].length;
    const family = matrix[2].length+matrix[5].length+matrix[8].length;
    const habits = matrix[3].length+matrix[6].length+matrix[9].length;
    const spirituality = matrix[3].length+matrix[5].length+matrix[7].length;

    return {matrix, sum1, sum2, sum3, sum4, destiny, temperament, goal, family, habits, spirituality};
}

// Анимация плавного появления
function animateElements() {
    document.querySelectorAll(".cell").forEach((el,i)=>{
        el.style.animationDelay=`${i*0.15}s`;
        el.classList.add("show");
    });
    document.querySelectorAll(".side div").forEach((el,i)=>{
        el.style.animationDelay=`${0.4+i*0.15}s`;
        el.classList.add("show");
    });
    const extra = document.querySelector(".extra");
    extra.style.animationDelay="1s";
    extra.classList.add("show");
}

// Горизонтальная раскладка по твоему запросу:
// 1 → 4 → 7  
// 2 → 5 → 8  
// 3 → 6 → 9
function renderResults(data) {
    const grid = document.getElementById("matrixGrid");
    const side = document.getElementById("sideValues");
    const extra = document.getElementById("extraValues");

    const layoutOrder = [
        1,4,7,
        2,5,8,
        3,6,9
    ];

    grid.innerHTML = "";
    layoutOrder.forEach(i=>{
        const div = document.createElement("div");
        div.className="cell";
        div.innerHTML=`<strong>${titles[i]}</strong><br>${data.matrix[i] || "—"}<p class="desc">${descriptions[i]}</p>`;
        grid.appendChild(div);
    });

    side.innerHTML=`
        <div>Темперамент<br><strong>${data.temperament}</strong></div>
        <div>Цель<br><strong>${data.goal}</strong></div>
        <div>Семья<br><strong>${data.family}</strong></div>
        <div>Привычки<br><strong>${data.habits}</strong></div>
        <div>Духовность<br><strong>${data.spirituality}</strong></div>
    `;

    extra.innerHTML=`
        <h2>Дополнительные числа</h2>
        <p>1-е: ${data.sum1}</p>
        <p>2-е: ${data.sum2}</p>
        <p>3-е: ${data.sum3}</p>
        <p>4-е: ${data.sum4}</p>
        <h2>Число судьбы</h2>
        <div class="destiny">${data.destiny}</div>
    `;

    animateElements();
}

// Обработка формы
document.getElementById("birthForm").addEventListener("submit", e=>{
    e.preventDefault();
    const birth = document.getElementById("birthDate").value;
    const data = calculateMatrix(birth);
    if(data) renderResults(data);
    else alert("Введите корректную дату в формате ДД.ММ.ГГГГ");
});
