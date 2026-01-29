<script>
document.addEventListener("DOMContentLoaded", () => {

    const input = document.querySelector(".matrix_date");
    const button = document.querySelector(".matrix__button");

    button.addEventListener("click", () => {
        const date = input.value.trim();
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
            alert("Введите дату в формате ДД.ММ.ГГГГ");
            return;
        }

        const result = calculatePythagoras(date);
        renderResult(result, date);
    });

    function calculatePythagoras(date) {
        const digits = date.replace(/\./g, "").split("").map(Number);

        // 1. Сумма всех цифр
        const sum1 = digits.reduce((a, b) => a + b, 0);

        // 2. Сумма цифр первого числа
        const sum2 = sum1.toString().split("").reduce((a, b) => a + +b, 0);

        // 3. Первое доп. число
        const day = Number(date.split(".")[0]);
        const sum3 = sum1 - (day * 2);

        // 4. Сумма цифр третьего числа
        const sum4 = Math.abs(sum3)
            .toString()
            .split("")
            .reduce((a, b) => a + +b, 0);

        // Все цифры для матрицы
        const allDigits = [
            ...digits,
            ...sum1.toString().split("").map(Number),
            ...sum2.toString().split("").map(Number),
            ...Math.abs(sum3).toString().split("").map(Number),
            ...sum4.toString().split("").map(Number)
        ];

        // Матрица 1–9
        const matrix = Array.from({ length: 9 }, () => "");

        allDigits.forEach(n => {
            if (n >= 1 && n <= 9) {
                matrix[n - 1] += n;
            }
        });

        return {
            matrix,
            destiny: sum2,
            extra: `${sum1}, ${sum2}, ${sum3}, ${sum4}`
        };
    }

    function renderResult(data, date) {
        document.querySelector('[data-answer="date"]').textContent = date;
        document.querySelector('[data-answer="second-number"]').textContent = data.extra;
        document.querySelector('[data-answer="destiny-number"]').textContent = data.destiny;

        document.querySelectorAll("[data-index]").forEach(el => {
            const index = Number(el.dataset.index);
            el.textContent = data.matrix[index] || "—";
        });

        document.querySelector(".result__hidden")?.style.display = "block";
    }

});
</script>
