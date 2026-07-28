// Funcionalidad del Buscador
document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador');
    const conceptos = document.querySelectorAll('.concepto');

    if (buscador) {
        buscador.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase();
            conceptos.forEach(concepto => {
                const titulo = concepto.querySelector('h3').textContent.toLowerCase();
                const contenido = concepto.querySelector('p').textContent.toLowerCase();
                if (titulo.includes(texto) || contenido.includes(texto)) {
                    concepto.style.display = 'block';
                } else {
                    concepto.style.display = 'none';
                }
            });
        });
    }

    // Funcionalidad básica del Quiz
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Evaluación enviada con éxito!');
        });
    }
});