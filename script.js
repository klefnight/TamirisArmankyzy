function calculate() {
    const input = document.getElementById('birthdate').value;
    if (!input) {
        alert("Введите дату рождения");
        return;
    }

    // ===== 1. Парсинг даты =====
    const [year, month, day] = input.split('-').map(Number);

    if (!isValidDate(day, month, year)) {
        alert("Некорректная дата");
        return;
    }

    // ===== 2. Цифры даты (включая нули) =====
    const dateDigits = `${pad(day)}${pad(month)}${year}`
        .split('')
        .map(Number);

    // ===== 3. Доп. числа =====
    const A = dateDigits.reduce((a, b) => a + b, 0);

    const B = sumDigits(A);

    const firstNonZero = dateDigits.find(d => d !== 0);
    let C = A - firstNonZero * 2;
    if (C < 0) C = Math.abs(C); // тетрадная практика

    const D = sumDigits(C);

    // ===== 4. Все цифры для квадрата =====
    const allDigits = [
        ...dateDigits,
        ...digitsOf(A),
        ...digitsOf(B),
        ...digitsOf(C),
        ...digitsOf(D)
    ];

    // ===== 5. Подсчёт 1–9 =====
    const cells = {};
    for (let i = 1; i <= 9; i++) cells[i] = '';

    allDigits.forEach(d => {
        if (d >= 1 && d <= 9) {
            cells[d] += d;
        }
    });

    // ===== 6. Вывод =====
    for (let i = 1; i <= 9; i++) {
        document.getElementById('c' + i).textContent =
            cells[i] || '–';
    }

    document.getElementById('dateOut').textContent =
        `${pad(day)}.${pad(month)}.${year}`;

    document.getElementById('extraNumbers').textContent =
        `${A}, ${B}, ${C}, ${D}`;

    document.getElementById('lifeNumber').textContent = B;

    document.getElementById('interpretation').innerHTML =
        `<b>Число судьбы ${B}:</b> ${lifeMeaning(B)}`;

    const result = document.getElementById('result');
    result.classList.remove('hidden');
    setTimeout(() => result.classList.add('show'), 50);
}

/* ===== ВСПОМОГАТЕЛЬНЫЕ ===== */

function sumDigits(n) {
    return Math.abs(n)
        .toString()
        .split('')
        .reduce((a, b) => a + Number(b), 0);
}

function digitsOf(n) {
    return Math.abs(n).toString().split('').map(Number);
}

function pad(n) {
    return n.toString().padStart(2, '0');
}

function isValidDate(d, m, y) {
    const date = new Date(y, m - 1, d);
    return (
        date.getFullYear() === y &&
        date.getMonth() === m - 1 &&
        date.getDate() === d
    );
}

function lifeMeaning(n) {
    const meanings = {
        1: "Лидерство, воля, инициатива",
        2: "Чувствительность, дипломатия",
        3: "Творчество, общение",
        4: "Стабильность, порядок",
        5: "Свобода, движение",
        6: "Ответственность, семья",
        7: "Мудрость, анализ",
        8: "Материальный успех",
        9: "Опыт, гуманизм"
    };
    return meanings[n] || "Индивидуальный путь";
}
