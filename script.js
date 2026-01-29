function calculate() {
    const date = document.getElementById('birthdate').value;
    if (!date) return alert("Введите дату");

    const digits = date.replace(/-/g, '').split('').map(Number);

    // 1 доп число
    const sum1 = digits.reduce((a, b) => a + b, 0);

    // 2 доп число
    const sum2 = sum1.toString().split('').reduce((a, b) => a + Number(b), 0);

    // первая ненулевая цифра даты
    const firstNonZero = digits.find(d => d !== 0);

    // 3 доп число (КЛАССИКА)
    const sum3 = sum1 - (firstNonZero * 2);

    // 4 доп число
    const sum4 = sum3.toString().split('').reduce((a, b) => a + Number(b), 0);

    // Все цифры для квадрата
    const allDigits = [
        ...digits,
        ...sum1.toString().split('').map(Number),
        ...sum2.toString().split('').map(Number),
        ...sum3.toString().split('').map(Number),
        ...sum4.toString().split('').map(Number)
    ];

    const counts = {};
    for (let i = 1; i <= 9; i++) counts[i] = '';

    allDigits.forEach(d => {
        if (d >= 1 && d <= 9) counts[d] += d;
    });

    for (let i = 1; i <= 9; i++) {
        document.getElementById('c' + i).textContent = counts[i] || '–';
    }

    document.getElementById('dateOut').textContent = date;
    document.getElementById('extraNumbers').textContent =
        `${sum1}, ${sum2}, ${sum3}, ${sum4}`;

    document.getElementById('lifeNumber').textContent = sum2;

    document.getElementById('interpretation').innerHTML =
        `<b>Число судьбы ${sum2}:</b> ${lifeMeaning(sum2)}`;

    const result = document.getElementById('result');
    result.classList.remove('hidden');
    setTimeout(() => result.classList.add('show'), 50);
}

function lifeMeaning(n) {
    const meanings = {
        1: "Лидерство, сила воли",
        2: "Чувствительность, партнёрство",
        3: "Творчество, общительность",
        4: "Стабильность, труд",
        5: "Свобода, энергия",
        6: "Семья, ответственность",
        7: "Мудрость, анализ",
        8: "Успех, власть",
        9: "Опыт, гуманизм"
    };
    return meanings[n] || "Индивидуальный путь";
}
