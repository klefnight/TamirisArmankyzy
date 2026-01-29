function calculate() {
    const birth = document.getElementById("birth").value;

    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(birth)) {
        alert("Введите дату в формате ДД.ММ.ГГГГ");
        return;
    }

    // Все цифры даты
    const digits = birth.replace(/\D/g, "").split("").map(Number);

    // С1
    const s1 = digits.reduce((a, b) => a + b, 0);

    // С2
    const s2 = s1 > 9 ? sumDigits(s1) : s1;

    // День как ЧИСЛО (01 → 1) — КЛАССИКА 5533
    const day = parseInt(birth.slice(0, 2), 10);

    // С3
    const s3 = Math.abs(s1 - 2 * day);

    // С4
    const s4 = s3 > 9 ? sumDigits(s3) : s3;

    // Полный набор цифр для матрицы
    const allDigits = digits
        .concat(splitDigits(s1))
        .concat(splitDigits(s2))
        .concat(splitDigits(s3))
        .concat(splitDigits(s4));

    // Подсчёт
    const count = {};
    for (let i = 1; i <= 9; i++) count[i] = "";

    allDigits.forEach(d => {
        if (d >= 1 && d <= 9) count[d] += d;
    });

    renderMatrix(count);

    document.getElementById("s1").textContent = s1;
    document.getElementById("s2").textContent = s2;
    document.getElementById("s3").textContent = s3;
    document.getElementById("s4").textContent = s4;

    document.getElementById("result").classList.remove("hidden");
}

function sumDigits(num) {
    return String(num).split("").reduce((a, b) => a + Number(b), 0);
}

function splitDigits(num) {
    return String(num).split("").map(Number);
}

function renderMatrix(c) {
    const matrix = document.getElementById("matrix");
    matrix.innerHTML = "";

    // ТВОЙ ПРАВИЛЬНЫЙ ПОРЯДОК
    const cells = [
        {n:1, t:"Характер", d:"Единицы — сила воли"},
        {n:4, t:"Здоровье", d:"Четвёрки — здоровье"},
        {n:7, t:"Удача", d:"Семёрки — удача"},

        {n:2, t:"Энергия", d:"Двойки — энергия"},
        {n:5, t:"Логика", d:"Пятёрки — логика"},
        {n:8, t:"Долг", d:"Восьмёрки — долг"},

        {n:3, t:"Интерес", d:"Тройки — интерес"},
        {n:6, t:"Труд", d:"Шестёрки — труд"},
        {n:9, t:"Память", d:"Девятки — память"}
    ];

    cells.forEach(cell => {
        const div = document.createElement("div");
        div.className = "cell";
        div.innerHTML = `
            <h4>${cell.t}</h4>
            <div class="value">${c[cell.n] || "—"}</div>
            <p>${cell.d}</p>
        `;
        matrix.appendChild(div);
    });
}
