// Función para reproducir audio (simulado con Speech Synthesis API)
function playAudio(button) {
  const card = button.closest(".example-card")
  const text = card.querySelector(".example-text").textContent

  // Crear síntesis de voz
  if ("speechSynthesis" in window) {
    // Cancelar cualquier audio previo
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 0.8 // Velocidad más lenta para aprendizaje
    utterance.pitch = 1

    // Efecto visual durante la reproducción
    button.style.transform = "scale(1.2)"
    button.style.color = "var(--cyan-neon)"

    utterance.onend = () => {
      button.style.transform = "scale(1)"
      button.style.color = ""
    }

    window.speechSynthesis.speak(utterance)
  } else {
    alert("Tu navegador no soporta la síntesis de voz. Intenta con Chrome, Edge o Safari.")
  }
}

// Función para revelar/ocultar traducción
function toggleTranslation(button) {
  const card = button.closest(".example-card")
  const translation = card.querySelector(".translation")

  if (translation.classList.contains("hidden")) {
    translation.classList.remove("hidden")
    button.textContent = "👁️ Ocultar"
    translation.style.animation = "slideDown 0.3s ease"
  } else {
    translation.classList.add("hidden")
    button.textContent = "👁️ Revelar"
  }
}

// Animación para las estrellas (opcional)
document.addEventListener("DOMContentLoaded", () => {
  // Añadir estilo de animación CSS dinámico
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `
  document.head.appendChild(style)

  // Efecto de parallax suave en el hero (si existe)
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const stars = document.querySelector(".stars")
      if (stars) {
        stars.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    })
  }

  console.log("[v0] Plataforma Inglés para Todos cargada correctamente ✨")
})
