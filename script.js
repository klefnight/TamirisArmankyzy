function calculate() {
    const date = document.getElementById('birthdate').value;
    if (!date) return alert("Введите дату");

    const digits = date.replace(/-/g, '').split('').map(Number);

    const sum1 = digits.reduce((a, b) => a + b, 0);
    const sum2 = sum1.toString().split('').reduce((a, b) => a + Number(b), 0);
    const sum3 = sum1 - (digits[0] * 2);
    const sum4 = sum3.toString().split('').reduce((a, b) => a + Number(b), 0);

    const allDigits = digits
        .concat(sum1.toString().split(''))
        .concat(sum2.toString().split(''))
        .concat(sum3.toString().split(''))
        .concat(sum4.toString().split(''));

    const counts = {};
    for (let i = 1; i <= 9; i++) counts[i] = '';

    allDigits.forEach(d => {
        if (d >= 1 && d <= 9) counts[d] += d;
    });

    for (let i = 1; i <= 9; i++) {
        document.getElementById('c' + i).textContent = counts[i] || '–';
    }

    document.getElementById('dateOut').textContent = date;
    document.getElementById('extraNumbers').textContent = `${sum1}, ${sum2}, ${sum3}, ${sum4}`;
    document.getElementById('lifeNumber').textContent = sum2;

    document.getElementById('interpretation').innerHTML =
        `<b>Число судьбы ${sum2}:</b> ${lifeMeaning(sum2)}`;

    const result = document.getElementById('result');
    result.classList.remove('hidden');
    setTimeout(() => result.classList.add('show'), 50);
}

function lifeMeaning(n) {
    const meanings = {
        1: "Лидерство, сила воли, самостоятельность",
        2: "Чувствительность, дипломатия, партнёрство",
        3: "Творчество, общительность, вдохновение",
        4: "Стабильность, трудолюбие, порядок",
        5: "Свобода, перемены, энергия",
        6: "Ответственность, семья, забота",
        7: "Анализ, мудрость, духовность",
        8: "Амбиции, успех, управление",
        9: "Гуманизм, завершение, опыт"
    };
    return meanings[n] || "Индивидуальный путь";
}
