function calculate() {
    const input = document.getElementById('birthdate').value;
    if (!input) return alert("Введите дату");

    const [year, month, day] = input.split('-').map(Number);

    if (!isValidDate(day, month, year)) {
        alert("Некорректная дата");
        return;
    }

    // ===== цифры даты (все, включая нули) =====
    const dateDigits = `${pad(day)}${pad(month)}${year}`.split('').map(Number);

    // ===== доп числа =====
    const A = dateDigits.reduce((a,b)=>a+b,0);
    const B = sumDigits(A);

    // ===== правильная первая цифра дня =====
    let dayStr = pad(day); // "01" -> "01"
    let firstDayDigit = Number(dayStr[0]);
    if(firstDayDigit === 0) firstDayDigit = Number(dayStr[1]); // если 0, берём вторую

    const C = Math.abs(A - 2 * firstDayDigit);
    const D = sumDigits(C);

    // ===== все цифры для квадрата =====
    const allDigits = [
        ...dateDigits,
        ...digitsOf(A),
        ...digitsOf(B),
        ...digitsOf(C),
        ...digitsOf(D)
    ];

    const cells = {};
    for(let i=1;i<=9;i++) cells[i]='';

    allDigits.forEach(d=>{
        if(d>=1 && d<=9) cells[d]+=d;
    });

    for(let i=1;i<=9;i++){
        document.getElementById('c'+i).textContent = cells[i] || '–';
    }

    document.getElementById('dateOut').textContent = `${pad(day)}.${pad(month)}.${year}`;
    document.getElementById('extraNumbers').textContent = `${A}, ${B}, ${C}, ${D}`;
    document.getElementById('lifeNumber').textContent = B;
    document.getElementById('interpretation').innerHTML = `<b>Число судьбы ${B}:</b> ${lifeMeaning(B)}`;

    const result = document.getElementById('result');
    result.classList.remove('hidden');
    setTimeout(()=>result.classList.add('show'),50);
}

function sumDigits(n){
    return Math.abs(n).toString().split('').reduce((a,b)=>a+Number(b),0);
}

function digitsOf(n){
    return Math.abs(n).toString().split('').map(Number);
}

function pad(n){
    return n.toString().padStart(2,'0');
}

function isValidDate(d,m,y){
    const date = new Date(y,m-1,d);
    return date.getFullYear()===y && date.getMonth()===m-1 && date.getDate()===d;
}

function lifeMeaning(n){
    const m = {
        1:"Лидерство, сила воли",
        2:"Чувствительность, дипломатия",
        3:"Творчество, общение",
        4:"Стабильность, порядок",
        5:"Свобода, энергия",
        6:"Семья, ответственность",
        7:"Мудрость, анализ",
        8:"Успех, управление",
        9:"Опыт, гуманизм"
    };
    return m[n] || "Индивидуальный путь";
}
