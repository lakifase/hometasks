// Алгоритмическая задача: бревно и брус.
// Квадрат со стороной A помещается в круг диаметром D,
// если его диагональ A * √2 не больше D.
// Наибольшая ширина бруса: D / √2.

document.getElementById("check").onclick = function () {
  // читаем значения из полей
  const D = parseFloat(document.getElementById("D").value);
  const A = parseFloat(document.getElementById("A").value);
  const result = document.getElementById("res");

  // проверка ввода
  if (isNaN(D) || isNaN(A) || D <= 0 || A <= 0) {
    result.value = "Введите положительные D и A";
    return;
  }

  const maxWidth = D / Math.SQRT2;

  if (A * Math.SQRT2 <= D) {
    result.value = "Брус поместится";
  } else {
    result.value = "Не поместится. Макс. ширина: " + maxWidth.toFixed(3);
  }
};
