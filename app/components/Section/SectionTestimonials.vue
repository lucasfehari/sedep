<template>
  <section class="testimonials section" aria-labelledby="testimonials-heading">
    <div class="container">
      <div class="testimonials__layout">
        <!-- Coluna Esquerda: Cards de Depoimento em Carrossel -->
        <div class="testimonials__carousel-wrap">
          <div class="testimonials__cards">
            <div
              v-for="(item, idx) in visibleTestimonials"
              :key="item.id"
              class="testimonial-card"
              :class="{ 'testimonial-card--active': activeIndex === idx }"
            >
              <!-- Foto do Profissional -->
              <div class="testimonial-card__media">
                <img
                  :src="item.image"
                  :alt="item.name + ' - ' + item.firm"
                  class="testimonial-card__img"
                  loading="lazy"
                />
              </div>

              <!-- Citação e Autor -->
              <div class="testimonial-card__body">
                <p class="testimonial-card__quote">“{{ item.quote }}”</p>
                <div class="testimonial-card__author">
                  <span class="testimonial-card__name">- {{ item.name }}</span>
                  <span class="testimonial-card__firm">{{ item.firm }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Copy Institucional & Controles -->
        <div class="testimonials__content">
          <h2 id="testimonials-heading" class="testimonials__title">
            A advocacia evolui. E as histórias com a SEDEP comprovam.
          </h2>

          <p class="testimonials__desc">
            Dos pequenos escritórios aos grandes departamentos jurídicos, saiba
            como impulsionamos conquistas reais para os clientes.
          </p>

          <!-- Controles do Carrossel (Prev, Next, Pause/Play) -->
          <div
            class="testimonials__controls"
            role="group"
            aria-label="Navegação de depoimentos"
          >
            <button
              type="button"
              class="control-btn"
              aria-label="Depoimento anterior"
              @click="prevSlide"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              class="control-btn"
              aria-label="Próximo depoimento"
              @click="nextSlide"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button
              type="button"
              class="control-btn"
              :aria-label="
                isPaused
                  ? 'Iniciar rotação automática'
                  : 'Pausar rotação automática'
              "
              @click="togglePause"
            >
              <!-- Ícone Pause quando rodando -->
              <svg
                v-if="!isPaused"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              <!-- Ícone Play quando pausado -->
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

interface Testimonial {
  id: number;
  name: string;
  firm: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nahara",
    firm: "Nahara Landim Advocacia",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    quote:
      "A SEDEP já faz parte do meu dia a dia, como tradição eu preciso primeiramente abrir o sistema e ver meus alertas onde vejo os últimos andamentos e publicações dos meus processos, somente após isso, meu dia de trabalho inicia.",
  },
  {
    id: 2,
    name: "Marina",
    firm: "Maragno Pereira Sociedade de Advogados",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    quote:
      "Com a SEDEP, a rotina deixa de ser caótica e passa a ser estratégica. Com o tempo mais organizado, consigo atender melhor, construir estratégias preventivas e não viver refém da urgência.",
  },
  {
    id: 3,
    name: "Rodrigo",
    firm: "Albuquerque & Associados",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    quote:
      "A precisão na captura de publicações de Diários Oficiais nos deu 100% de segurança nos prazos. A inteligência e os filtros por OAB são impecáveis.",
  },
  {
    id: 4,
    name: "Camila",
    firm: "Freitas & Mendes Consultoria Jurídica",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    quote:
      "A automação de prazos e a visualização clara de todos os processos ativos transformaram a produtividade da nossa equipe desde a primeira semana.",
  },
];

const currentIndex = ref(0);
const isPaused = ref(false);
let timer: any = null;

const visibleTestimonials = computed(() => {
  // Mostra 2 depoimentos lado a lado
  const first = testimonials[currentIndex.value];
  const secondIndex = (currentIndex.value + 1) % testimonials.length;
  const second = testimonials[secondIndex];
  return [first, second];
});

const activeIndex = ref(0);

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length;
}

function prevSlide() {
  currentIndex.value =
    (currentIndex.value - 1 + testimonials.length) % testimonials.length;
}

function togglePause() {
  isPaused.value = !isPaused.value;
  if (isPaused.value) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function startAutoPlay() {
  stopAutoPlay();
  timer = setInterval(() => {
    nextSlide();
  }, 6000);
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.testimonials {
  padding: var(--section-spacing-md) 0;
  background-color: #f8fafc;
}

.testimonials__layout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-12);
  align-items: center;
}

/* Coluna de Cards */
.testimonials__carousel-wrap {
  width: 100%;
}

.testimonials__cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.testimonial-card {
  background: #483ea8;
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 35px -10px rgba(72, 62, 168, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform var(--transition-fast);
}

.testimonial-card:hover {
  transform: translateY(-4px);
}

.testimonial-card__media {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background-color: #312e81;
}

.testimonial-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.testimonial-card__body {
  padding: var(--space-6);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: var(--space-6);
}

.testimonial-card__quote {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 500;
}

.testimonial-card__author {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.testimonial-card__name {
  font-size: var(--text-base);
  font-weight: 800;
  color: #ffffff;
}

.testimonial-card__firm {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
}

/* Coluna de Conteúdo e Controles */
.testimonials__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-6);
}

.testimonials__title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin: 0;
}

.testimonials__desc {
  font-size: var(--text-base);
  line-height: var(--line-height-relaxed);
  color: #475569;
  margin: 0;
}

/* Controles */
.testimonials__controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.control-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.control-btn:hover {
  background-color: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
}

/* Responsividade */
@media (max-width: 1024px) {
  .testimonials__layout {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}

@media (max-width: 640px) {
  .testimonials__cards {
    grid-template-columns: 1fr;
  }
}
</style>
