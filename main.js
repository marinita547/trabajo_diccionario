document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. BUSCADOR Y FILTROS DEL DICCIONARIO ---
    const searchInput = document.getElementById("searchInput");
    const filterCategory = document.getElementById("filterCategory");
    const cards = document.querySelectorAll(".card");

    function filtrarDiccionario() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCat = filterCategory.value;

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const category = card.getAttribute("data-category");

            const matchesSearch = text.includes(searchText);
            const matchesCategory = selectedCat === "todos" || category === selectedCat;

            if (matchesSearch && matchesCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filtrarDiccionario);
    filterCategory.addEventListener("change", filtrarDiccionario);


    // --- 2. JUEGO QUIZ INTERACTIVO ---
    const quizQuestions = [
        {
            question: '¿Qué significa el término "Bug" en informática?',
            options: ['Un insecto dentro del monitor', 'Un error o fallo en un programa', 'Un tipo de virus informático', 'Un cable de red desconectado'],
            answer: 1
        },
        {
            question: '¿Cuál es la traducción de "Firewall"?',
            options: ['Muro de descarga', 'Memoria RAM', 'Cortafuegos (Seguridad de red)', 'Servidor en la nube'],
            answer: 2
        },
        {
            question: '¿Qué es "Cloud Computing"?',
            options: ['Computación en la nube', 'Pantalla con brillo alto', 'Teclado inalámbrico', 'Red local de cables'],
            answer: 0
        },
        {
            question: '¿A qué se refiere el término "Framework"?',
            options: ['Un antivirus', 'Un marco o estructura de trabajo', 'Un archivo ejecutable', 'Un tipo de base de datos'],
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
        feedback.textContent = "";
        nextBtn.style.display = "none";

        const q = quizQuestions[currentQuestion];
        questionCount.textContent = `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;
        scoreDisplay.textContent = `Puntos: ${score}`;
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
        buttons.forEach(btn => btn.disabled = true); // Desactivar otros clics

        if (selectedIndex === correctIndex) {
            selectedBtn.classList.add("correct");
            score += 10;
            scoreDisplay.textContent = `Puntos: ${score}`;
            feedback.textContent = "🎉 ¡Correcto! Excelente respuesta.";
            feedback.style.color = "#059669";
        } else {
            selectedBtn.classList.add("incorrect");
            buttons[correctIndex].classList.add("correct");
            feedback.textContent = "❌ Respuesta incorrecta.";
            feedback.style.color = "#dc2626";
        }

        if (currentQuestion < quizQuestions.length - 1) {
            nextBtn.textContent = "Siguiente Pregunta ➡️";
            nextBtn.style.display = "block";
        } else {
            nextBtn.textContent = "Ver Resultado Final 🏆";
            nextBtn.style.display = "block";
        }
    }

    nextBtn.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuiz();
        } else {
            showFinalScore();
        }
    });

    function showFinalScore() {
        questionText.textContent = "🏆 ¡Juego Completado!";
        optionsContainer.innerHTML = `<p style="font-size: 1.3rem; text-align:center;">Tu puntuación final fue de <strong>${score} puntos</strong> de ${quizQuestions.length * 10} posibles.</p>`;
        nextBtn.textContent = "🔄 Jugar de nuevo";
        nextBtn.addEventListener("click", () => location.reload());
    }

    loadQuiz();

    // --- 3. FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        formStatus.textContent = "✅ ¡Gracias! Tu sugerencia ha sido enviada con éxito.";
        formStatus.style.color = "#059669";
        formStatus.style.marginTop = "1rem";
        formStatus.style.textAlign = "center";
        contactForm.reset();
    });
});