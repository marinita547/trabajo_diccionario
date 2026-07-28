document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. BUSCADOR Y FILTROS ---
    const searchInput = document.getElementById("searchInput");
    const filterCategory = document.getElementById("filterCategory");
    const cards = document.querySelectorAll(".card");

    function filtrarDiccionario() {
        const searchText = searchInput ? searchInput.value.toLowerCase() : "";
        const selectedCat = filterCategory ? filterCategory.value : "todos";

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const category = card.getAttribute("data-category");

            const matchesSearch = text.includes(searchText);
            const matchesCategory = selectedCat === "todos" || category === selectedCat;

            card.style.display = (matchesSearch && matchesCategory) ? "block" : "none";
        });
    }

    if (searchInput) searchInput.addEventListener("input", filtrarDiccionario);
    if (filterCategory) filterCategory.addEventListener("change", filtrarDiccionario);


    // --- 2. QUIZ INTERACTIVO ---
    const quizQuestions = [
        {
            question: '¿Qué significa el término "Bug" en informática?',
            options: ['Un insecto en el monitor', 'Un error o fallo en un programa', 'Un tipo de virus', 'Un cable desconectado'],
            answer: 1
        },
        {
            question: '¿Cuál es la función principal de un "Firewall"?',
            options: ['Acelerar el Wi-Fi', 'Bloquear tráfico no autorizado (Cortafuegos)', 'Limpiar la pantalla', 'Guardar archivos'],
            answer: 1
        },
        {
            question: '¿A qué se refiere "Cloud Computing"?',
            options: ['Computación en la nube', 'Pantalla con mucho brillo', 'Servidor de videojuegos', 'Memoria USB'],
            answer: 0
        },
        {
            question: '¿Qué es una "API" en programación?',
            options: ['Un lenguaje de diseño', 'Interfaz que comunica aplicaciones', 'Una marca de computadora', 'Un ejecutable'],
            answer: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionCount = document.getElementById("questionCount");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");
    const nextBtn = document.getElementById("nextBtn");
    const feedback = document.getElementById("feedback");

    function loadQuiz() {
        if (!optionsContainer || !questionText) return;

        feedback.textContent = "";
        if (nextBtn) nextBtn.style.display = "none";

        const q = quizQuestions[currentQuestion];
        if (questionCount) questionCount.textContent = `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;
        if (scoreDisplay) scoreDisplay.textContent = `Puntos: ${score}`;
        questionText.textContent = q.question;

        optionsContainer.innerHTML = "";
        q.options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.textContent = opt;
            btn.addEventListener("click", () => selectOption(index, q.answer, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(selectedIndex, correctIndex, selectedBtn) {
        const buttons = optionsContainer.querySelectorAll(".option-btn");
        buttons.forEach(btn => btn.disabled = true);

        if (selectedIndex === correctIndex) {
            selectedBtn.classList.add("correct");
            score += 10;
            if (scoreDisplay) scoreDisplay.textContent = `Puntos: ${score}`;
            feedback.textContent = "🎉 ¡Correcto!";
            feedback.style.color = "#059669";
        } else {
            selectedBtn.classList.add("incorrect");
            buttons[correctIndex].classList.add("correct");
            feedback.textContent = "❌ Incorrecto.";
            feedback.style.color = "#dc2626";
        }

        if (nextBtn) {
            nextBtn.style.display = "block";
            if (currentQuestion < quizQuestions.length - 1) {
                nextBtn.textContent = "Siguiente Pregunta ➡️";
            } else {
                nextBtn.textContent = "Ver Resultado Final 🏆";
            }
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                loadQuiz();
            } else {
                showFinalScore();
            }
        });
    }

    function showFinalScore() {
        questionText.textContent = "🏆 ¡Juego Completado!";
        optionsContainer.innerHTML = `<p style="font-size: 1.2rem; text-align:center;">Puntuación final: <strong>${score} puntos</strong> de ${quizQuestions.length * 10}.</p>`;
        if (nextBtn) {
            nextBtn.textContent = "🔄 Jugar de nuevo";
            nextBtn.style.display = "block";
            nextBtn.onclick = () => location.reload();
        }
    }

    loadQuiz();

    // --- 3. FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            formStatus.textContent = "✅ ¡Gracias! Sugerencia enviada con éxito.";
            formStatus.style.color = "#059669";
            formStatus.style.marginTop = "1rem";
            formStatus.style.textAlign = "center";
            contactForm.reset();
        });
    }
});