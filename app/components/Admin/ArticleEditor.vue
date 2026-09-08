<template>
  <div class="editor-layout">
    <!-- Toast de Feedback -->
    <transition name="toast-slide">
      <div v-if="toast.visible" class="editor-toast" :class="`editor-toast--${toast.type}`" role="alert">
        <span class="editor-toast__icon">{{ toast.type === 'success' ? '✅' : '❌' }}</span>
        <span>{{ toast.message }}</span>
      </div>
    </transition>

    <!-- Barra Superior de Controle e Ações -->
    <div class="editor-header">
      <div class="editor-header__left">
        <NuxtLink to="/admin/noticias" class="back-link">← Voltar para Notícias</NuxtLink>
        <h1 class="editor-page-title">
          {{ isEditMode ? 'Editar Artigo' : 'Criar Novo Artigo' }}
        </h1>
      </div>

      <div class="editor-header__actions">
        <div class="status-selector">
          <label class="status-radio" :class="{ 'status-radio--active': form.status === 'draft' }">
            <input type="radio" v-model="form.status" value="draft" />
            <span>Rascunho</span>
          </label>
          <label class="status-radio" :class="{ 'status-radio--active': form.status === 'published' }">
            <input type="radio" v-model="form.status" value="published" />
            <span>Publicado</span>
          </label>
        </div>

        <button
          @click="saveDraft"
          class="btn-draft"
          :disabled="saving"
        >
          💾 Salvar Rascunho
        </button>

        <button
          @click="saveArticle"
          class="btn-save"
          :disabled="saving"
        >
          <span v-if="saving" class="btn-spinner" />
          <span>{{ saving ? 'Salvando...' : (isEditMode ? 'Atualizar' : 'Publicar') }}</span>
        </button>
      </div>
    </div>

    <!-- Grid Principal: Conteúdo (Esquerda) e Suíte SEO (Direita) -->
    <div class="editor-grid">
      
      <!-- Coluna Esquerda: Edição de Conteúdo -->
      <div class="editor-main-col">
        
        <!-- Título & Slug -->
        <div class="editor-card">
          <div class="form-group">
            <label class="field-label" for="article-title">
              <span>Título da Notícia / Artigo</span>
              <span class="char-count" :class="{ 'char-count--warning': form.title.length > 70 }">
                {{ form.title.length }} caracteres
              </span>
            </label>
            <input
              id="article-title"
              v-model="form.title"
              type="text"
              class="input-title"
              placeholder="Ex: Inteligência Artificial e Automação de Prazos na Advocacia Moderna"
              @input="onTitleInput"
              required
            />
          </div>

          <div class="slug-control">
            <span class="slug-label">URL Amigável (Slug):</span>
            <div class="slug-input-wrapper">
              <span class="slug-prefix">/noticias/</span>
              <input
                v-model="form.slug"
                type="text"
                class="input-slug"
                :readonly="autoSlug"
              />
              <button
                type="button"
                @click="autoSlug = !autoSlug"
                class="btn-slug-toggle"
                :title="autoSlug ? 'Personalizar slug manualmente' : 'Sincronizar com o título'"
              >
                {{ autoSlug ? '🔒 Automático' : '✏️ Manual' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Categoria, Tags e Imagem -->
        <div class="editor-card">
          <div class="form-row">
            <div class="form-group form-group--half">
              <label class="field-label" for="category">Categoria</label>
              <select id="category" v-model="form.category" class="input-select">
                <option value="Inteligência Artificial">Inteligência Artificial</option>
                <option value="Software Jurídico">Software Jurídico</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="LGPD">LGPD & Privacidade</option>
                <option value="Gestão & Negócios">Gestão & Negócios</option>
                <option value="Institucional">Institucional</option>
              </select>
            </div>

            <div class="form-group form-group--half">
              <label class="field-label" for="tags">Tags (separadas por vírgula)</label>
              <input
                id="tags"
                v-model="tagsInput"
                type="text"
                class="input-text"
                placeholder="Ex: IA, Sedep Faz, Produtividade"
                @change="updateTags"
              />
            </div>
          </div>

          <!-- Imagem de Capa -->
          <div class="form-group" style="margin-top: 1rem;">
            <label class="field-label" for="cover">URL da Imagem de Capa (Open Graph / Banner)</label>
            <input
              id="cover"
              v-model="form.coverImage"
              type="url"
              class="input-text"
              placeholder="https://..."
            />

            <!-- Presets Rápidos -->
            <div class="cover-presets">
              <span class="presets-label">Presets Rápidos:</span>
              <button
                type="button"
                @click="form.coverImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'"
                class="btn-preset"
              >
                IA & Cloud
              </button>
              <button
                type="button"
                @click="form.coverImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'"
                class="btn-preset"
              >
                Data Lake & Analytics
              </button>
              <button
                type="button"
                @click="form.coverImage = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop'"
                class="btn-preset"
              >
                Cyber Security & LGPD
              </button>
              <button
                type="button"
                @click="form.coverImage = 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop'"
                class="btn-preset"
              >
                Advocacia & Direito
              </button>
            </div>

            <!-- Preview da Imagem -->
            <div v-if="form.coverImage" class="cover-preview">
              <img :src="form.coverImage" alt="Preview da Capa" />
            </div>
          </div>

          <!-- Resumo / Lead -->
          <div class="form-group" style="margin-top: 1rem;">
            <label class="field-label" for="excerpt">
              <span>Resumo / Lead (Exibido nas listagens e snippet)</span>
              <span class="char-count">{{ form.excerpt.length }}/200</span>
            </label>
            <textarea
              id="excerpt"
              v-model="form.excerpt"
              rows="3"
              class="input-textarea"
              placeholder="Uma introdução clara e persuasiva sobre o tema do artigo..."
            />
          </div>
        </div>

        <!-- Editor de Conteúdo Rico -->
        <div class="editor-card">
          <div class="editor-card__header">
            <label class="field-label">Corpo do Artigo (HTML / Rico)</label>
            <div class="editor-tabs">
              <button
                type="button"
                class="tab-btn"
                :class="{ 'tab-btn--active': activeTab === 'write' }"
                @click="activeTab = 'write'"
              >
                ✏️ Escrever
              </button>
              <button
                type="button"
                class="tab-btn"
                :class="{ 'tab-btn--active': activeTab === 'preview' }"
                @click="activeTab = 'preview'"
              >
                👁️ Pré-visualizar
              </button>
            </div>
          </div>

          <!-- Barra de Ferramentas de Formatação Rápida -->
          <div v-if="activeTab === 'write'" class="editor-toolbar">
            <button type="button" @click="insertTag('<h2>', '</h2>')" title="Subtítulo H2">H2</button>
            <button type="button" @click="insertTag('<h3>', '</h3>')" title="Subtítulo H3">H3</button>
            <button type="button" @click="insertTag('<strong>', '</strong>')" title="Negrito"><b>B</b></button>
            <button type="button" @click="insertTag('<em>', '</em>')" title="Itálico"><i>I</i></button>
            <button type="button" @click="insertTag('<blockquote><p>', '</p></blockquote>')" title="Citação">“ ”</button>
            <button type="button" @click="insertTag('<ul>\n  <li>', '</li>\n</ul>')" title="Lista com Marcadores">• Lista</button>
            <button type="button" @click="insertTag('<p>', '</p>')" title="Parágrafo">&lt;p&gt;</button>
          </div>

          <!-- Área de Escrita -->
          <div v-if="activeTab === 'write'">
            <textarea
              ref="contentAreaRef"
              v-model="form.content"
              rows="18"
              class="content-editor-textarea"
              placeholder="Escreva o conteúdo completo do artigo utilizando formatação HTML ou parágrafos..."
            />
            <div class="content-stats">
              <span>{{ wordCount }} palavras</span>
              <span>Tempo de leitura estimado: {{ readingTime }} min</span>
            </div>
          </div>

          <!-- Pré-visualização Renderizada -->
          <div v-else class="content-preview-box">
            <div class="prose" v-html="form.content || '<p><em>Nenhum conteúdo digitado ainda.</em></p>'" />
          </div>
        </div>
      </div>

      <!-- Coluna Direita: Suíte de Inteligência SEO & Indexação -->
      <aside class="editor-seo-col">
        
        <!-- Score SEO & Checklist -->
        <div class="seo-card">
          <div class="seo-card__header">
            <span class="seo-card__title">Auditoria SEO em Tempo Real</span>
            <div class="seo-score-badge" :class="getScoreClass(seoScore)">
              <span>{{ seoScore }}</span>
              <span class="seo-score-badge__max">/100</span>
            </div>
          </div>

          <!-- Checklist de Auditoria -->
          <ul class="seo-checklist">
            <li :class="checklist.hasKeywordInTitle ? 'item-pass' : 'item-fail'">
              <span class="item-icon">{{ checklist.hasKeywordInTitle ? '✓' : '✗' }}</span>
              <span>Palavra-chave no Título</span>
            </li>
            <li :class="checklist.hasKeywordInMeta ? 'item-pass' : 'item-fail'">
              <span class="item-icon">{{ checklist.hasKeywordInMeta ? '✓' : '✗' }}</span>
              <span>Palavra-chave na Meta Description</span>
            </li>
            <li :class="checklist.hasKeywordInContent ? 'item-pass' : 'item-fail'">
              <span class="item-icon">{{ checklist.hasKeywordInContent ? '✓' : '✗' }}</span>
              <span>Palavra-chave no Conteúdo</span>
            </li>
            <li :class="checklist.titleLengthOk ? 'item-pass' : 'item-fail'">
              <span class="item-icon">{{ checklist.titleLengthOk ? '✓' : '✗' }}</span>
              <span>Tamanho do Título SEO (30-65 chars)</span>
            </li>
            <li :class="checklist.metaDescLengthOk ? 'item-pass' : 'item-fail'">
              <span class="item-icon">{{ checklist.metaDescLengthOk ? '✓' : '✗' }}</span>
              <span>Tamanho da Meta Description (100-160 chars)</span>
            </li>
            <li :class="checklist.hasCoverImage ? 'item-pass' : 'item-fail'">
              <span class="item-icon">{{ checklist.hasCoverImage ? '✓' : '✗' }}</span>
              <span>Imagem de Capa (Open Graph)</span>
            </li>
            <li :class="checklist.contentLengthOk ? 'item-pass' : 'item-fail'">
              <span class="item-icon">{{ checklist.contentLengthOk ? '✓' : '✗' }}</span>
              <span>Mínimo de 300 palavras no artigo</span>
            </li>
          </ul>
        </div>

        <!-- Google SERP Snippet Preview -->
        <div class="seo-card">
          <div class="seo-card__header">
            <span class="seo-card__title">Google SERP Preview</span>
            <div class="device-switcher">
              <button
                type="button"
                :class="{ 'device-btn--active': serpDevice === 'desktop' }"
                @click="serpDevice = 'desktop'"
              >
                💻 Desktop
              </button>
              <button
                type="button"
                :class="{ 'device-btn--active': serpDevice === 'mobile' }"
                @click="serpDevice = 'mobile'"
              >
                📱 Mobile
              </button>
            </div>
          </div>

          <div class="serp-preview" :class="`serp-preview--${serpDevice}`">
            <div class="serp-site-info">
              <div class="serp-favicon">S</div>
              <div class="serp-url-group">
                <span class="serp-domain">sedep.com.br</span>
                <span class="serp-breadcrumb">https://www.sedep.com.br › noticias › {{ form.slug || 'slug-do-artigo' }}</span>
              </div>
            </div>

            <h3 class="serp-title">
              {{ form.seo.metaTitle || form.title || 'Título do Artigo no Google' }}
            </h3>

            <p class="serp-description">
              {{ form.seo.metaDescription || form.excerpt || 'Descrição da notícia que será visualizada pelos usuários nos resultados de busca do Google...' }}
            </p>
          </div>
        </div>

        <!-- Social Media Share Card Preview -->
        <div class="seo-card">
          <div class="seo-card__header">
            <span class="seo-card__title">Social Share Card (Open Graph)</span>
          </div>

          <div class="social-preview-card">
            <div class="social-preview-img" :style="{ backgroundImage: `url(${form.seo.ogImage || form.coverImage})` }">
              <span v-if="!form.coverImage" class="no-img-text">Sem Imagem</span>
            </div>
            <div class="social-preview-content">
              <span class="social-preview-domain">SEDEP.COM.BR</span>
              <p class="social-preview-title">{{ form.seo.metaTitle || form.title || 'Título da Notícia' }}</p>
              <p class="social-preview-desc">{{ (form.seo.metaDescription || form.excerpt || 'Resumo do artigo...').slice(0, 100) }}...</p>
            </div>
          </div>
        </div>

        <!-- Configurações de Metatags e Schema.org -->
        <div class="seo-card">
          <div class="seo-card__header">
            <span class="seo-card__title">Configuração de Metatags & Schema</span>
          </div>

          <div class="seo-fields">
            <div class="form-group">
              <label class="field-label" for="seo-keyword">Palavra-Chave Foco</label>
              <input
                id="seo-keyword"
                v-model="form.seo.focusKeyword"
                type="text"
                class="input-text"
                placeholder="Ex: inteligencia artificial advocacia"
              />
            </div>

            <div class="form-group">
              <label class="field-label" for="seo-title">
                <span>Meta Title Customizado</span>
                <span class="char-count" :class="{ 'char-count--warning': (form.seo.metaTitle || '').length > 65 }">
                  {{ (form.seo.metaTitle || '').length }}/65
                </span>
              </label>
              <input
                id="seo-title"
                v-model="form.seo.metaTitle"
                type="text"
                class="input-text"
                :placeholder="`${form.title || 'Título'} | SEDEP`"
              />
            </div>

            <div class="form-group">
              <label class="field-label" for="seo-desc">
                <span>Meta Description Customizada</span>
                <span class="char-count" :class="{ 'char-count--warning': (form.seo.metaDescription || '').length > 160 }">
                  {{ (form.seo.metaDescription || '').length }}/160
                </span>
              </label>
              <textarea
                id="seo-desc"
                v-model="form.seo.metaDescription"
                rows="3"
                class="input-textarea"
                placeholder="Descrição otimizada para aumentar o CTR nos mecanismos de busca..."
              />
            </div>

            <div class="form-group">
              <label class="field-label" for="seo-schema">Tipo Estruturado Schema.org</label>
              <select id="seo-schema" v-model="form.seo.schemaType" class="input-select">
                <option value="NewsArticle">NewsArticle (Artigo de Notícia)</option>
                <option value="TechArticle">TechArticle (Artigo Técnico / Engenharia)</option>
                <option value="BlogPosting">BlogPosting (Post de Blog)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="field-label" for="seo-robots">Diretiva de Indexação Robots</label>
              <select id="seo-robots" v-model="form.seo.robots" class="input-select">
                <option value="index, follow">index, follow (Recomendado - Indexar no Google)</option>
                <option value="noindex, follow">noindex, follow (Não indexar, seguir links)</option>
                <option value="noindex, nofollow">noindex, nofollow (Privado / Oculto)</option>
              </select>
            </div>
          </div>
        </div>

      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps<{
  initialData?: any
  isEditMode?: boolean
}>()

const emit = defineEmits(['saved'])

const autoSlug = ref(!props.isEditMode)
const activeTab = ref<'write' | 'preview'>('write')
const serpDevice = ref<'desktop' | 'mobile'>('desktop')
const saving = ref(false)
const toast = ref({ visible: false, message: '', type: 'success' as 'success' | 'error' })
const contentAreaRef = ref<HTMLTextAreaElement | null>(null)

const form = ref({
  id: props.initialData?.id || '',
  title: props.initialData?.title || '',
  slug: props.initialData?.slug || '',
  category: props.initialData?.category || 'Inteligência Artificial',
  tags: props.initialData?.tags || ['Tecnologia', 'SEDEP'],
  excerpt: props.initialData?.excerpt || '',
  content: props.initialData?.content || '',
  coverImage: props.initialData?.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  status: props.initialData?.status || 'published',
  publishedAt: props.initialData?.publishedAt || new Date().toISOString(),
  seo: {
    metaTitle: props.initialData?.seo?.metaTitle || '',
    metaDescription: props.initialData?.seo?.metaDescription || '',
    focusKeyword: props.initialData?.seo?.focusKeyword || '',
    canonicalUrl: props.initialData?.seo?.canonicalUrl || '',
    robots: props.initialData?.seo?.robots || 'index, follow',
    ogImage: props.initialData?.seo?.ogImage || '',
    schemaType: props.initialData?.seo?.schemaType || 'NewsArticle',
  },
})

const tagsInput = ref(form.value.tags.join(', '))

function updateTags() {
  form.value.tags = tagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function onTitleInput() {
  if (autoSlug.value) {
    form.value.slug = generateSlug(form.value.title)
  }
}

const wordCount = computed(() => {
  const plainText = form.value.content.replace(/<[^>]*>/g, ' ').trim()
  if (!plainText) return 0
  return plainText.split(/\s+/).filter(Boolean).length
})

const readingTime = computed(() => {
  return Math.max(1, Math.ceil(wordCount.value / 200))
})

// Checklist de Auditoria SEO
const checklist = computed(() => {
  const kw = (form.value.seo.focusKeyword || '').toLowerCase().trim()
  const title = (form.value.title || '').toLowerCase()
  const metaTitle = (form.value.seo.metaTitle || form.value.title || '').toLowerCase()
  const metaDesc = (form.value.seo.metaDescription || form.value.excerpt || '').toLowerCase()
  const content = (form.value.content || '').toLowerCase()

  return {
    hasKeywordInTitle: kw ? title.includes(kw) || metaTitle.includes(kw) : false,
    hasKeywordInMeta: kw ? metaDesc.includes(kw) : false,
    hasKeywordInContent: kw ? content.includes(kw) : false,
    titleLengthOk: metaTitle.length >= 30 && metaTitle.length <= 65,
    metaDescLengthOk: metaDesc.length >= 100 && metaDesc.length <= 160,
    hasCoverImage: Boolean(form.value.coverImage),
    contentLengthOk: wordCount.value >= 250,
  }
})

// Score SEO Geral
const seoScore = computed(() => {
  let score = 0
  const c = checklist.value

  if (c.hasKeywordInTitle) score += 20
  if (c.hasKeywordInMeta) score += 15
  if (c.hasKeywordInContent) score += 15
  if (c.titleLengthOk) score += 15
  if (c.metaDescLengthOk) score += 15
  if (c.hasCoverImage) score += 10
  if (c.contentLengthOk) score += 10

  // Se não houver palavra chave definida, baseia em qualidade estrutural
  if (!form.value.seo.focusKeyword) {
    let altScore = 20
    if (c.titleLengthOk) altScore += 20
    if (c.metaDescLengthOk) altScore += 20
    if (c.hasCoverImage) altScore += 20
    if (c.contentLengthOk) altScore += 20
    return Math.min(85, altScore)
  }

  return Math.min(100, Math.max(0, score))
})

function getScoreClass(score: number): string {
  if (score >= 80) return 'score--good'
  if (score >= 50) return 'score--warning'
  return 'score--bad'
}

function insertTag(openTag: string, closeTag: string) {
  const el = contentAreaRef.value
  if (!el) {
    form.value.content += `${openTag}${closeTag}`
    return
  }

  const start = el.selectionStart
  const end = el.selectionEnd
  const text = el.value
  const selected = text.substring(start, end)
  const replacement = `${openTag}${selected}${closeTag}`

  form.value.content = text.substring(0, start) + replacement + text.substring(end)
  nextTick(() => {
    el.focus()
    el.setSelectionRange(start + openTag.length, start + openTag.length + selected.length)
  })
}

function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.value = { visible: true, message, type }
  setTimeout(() => { toast.value.visible = false }, 4000)
}

async function saveDraft() {
  const originalStatus = form.value.status
  form.value.status = 'draft'
  await saveArticle(false)
  if (form.value.status !== 'draft') {
    form.value.status = originalStatus
  }
}

async function saveArticle(redirect = true) {
  if (!form.value.title) {
    showToast('O título do artigo é obrigatório.', 'error')
    return
  }

  saving.value = true

  // Garante sincronização dos campos de SEO se estiverem vazios
  if (!form.value.seo.metaTitle) {
    form.value.seo.metaTitle = `${form.value.title} | SEDEP`
  }
  if (!form.value.seo.metaDescription) {
    form.value.seo.metaDescription = form.value.excerpt || form.value.title
  }
  if (!form.value.seo.ogImage) {
    form.value.seo.ogImage = form.value.coverImage
  }

  try {
    let result
    if (props.isEditMode && form.value.id) {
      result = await $fetch(`/api/admin/news/${form.value.id}`, {
        method: 'PUT',
        body: form.value,
      })
    } else {
      result = await $fetch('/api/admin/news', {
        method: 'POST',
        body: form.value,
      })
      // Atualiza o ID no form após criação para permitir saves subsequentes
      if (result?.id) form.value.id = result.id
    }

    emit('saved', result)
    const statusLabel = form.value.status === 'published' ? 'publicado' : 'salvo como rascunho'
    showToast(`Artigo ${statusLabel} com sucesso! ✓`)
    if (redirect) {
      setTimeout(() => navigateTo('/admin/noticias'), 1200)
    }
  } catch (error: any) {
    showToast(error?.data?.statusMessage || 'Erro ao salvar o artigo.', 'error')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.editor-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1500px;
  margin: 0 auto;
}

/* Header */
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: #0B1120;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.back-link {
  font-size: 0.8rem;
  color: #64748B;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 0.25rem;
}

.back-link:hover {
  color: #94A3B8;
}

.editor-page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.editor-header__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-selector {
  display: flex;
  background-color: #070B14;
  padding: 0.25rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.status-radio {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #94A3B8;
  cursor: pointer;
  transition: all 0.15s ease;
}

.status-radio input {
  display: none;
}

.status-radio--active {
  background-color: #1E293B;
  color: #F8FAFC;
}

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  transition: all 0.15s ease;
}

.btn-save:hover:not(:disabled) {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  transform: translateY(-1px);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-draft {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-draft:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.09);
  color: #E2E8F0;
  border-color: rgba(255, 255, 255, 0.2);
}

.btn-draft:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Toast */
.editor-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  max-width: 380px;
}

.editor-toast--success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #6EE7B7;
}

.editor-toast--error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #FCA5A5;
}

.editor-toast__icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}



/* Grid */
.editor-grid {
  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 1.5rem;
  align-items: start;
}

.editor-main-col, .editor-seo-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.editor-card, .seo-card {
  background-color: #0B1120;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.825rem;
  font-weight: 600;
  color: #CBD5E1;
}

.char-count {
  font-size: 0.75rem;
  color: #64748B;
  font-weight: normal;
}

.char-count--warning {
  color: #F87171;
  font-weight: bold;
}

.input-title {
  width: 100%;
  padding: 0.85rem 1rem;
  background-color: #070B14;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 1.25rem;
  font-weight: 700;
  outline: none;
  transition: all 0.15s ease;
}

.input-title:focus {
  border-color: #3B82F6;
}

.slug-control {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.slug-label {
  font-size: 0.75rem;
  color: #64748B;
}

.slug-input-wrapper {
  display: flex;
  align-items: center;
  background-color: #070B14;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  flex: 1;
}

.slug-prefix {
  font-size: 0.75rem;
  color: #64748B;
  font-family: monospace;
}

.input-slug {
  background: transparent;
  border: none;
  color: #60A5FA;
  font-family: monospace;
  font-size: 0.8rem;
  flex: 1;
  outline: none;
}

.btn-slug-toggle {
  background: transparent;
  border: none;
  color: #94A3B8;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
}

.input-text, .input-select, .input-textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  background-color: #070B14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #F8FAFC;
  font-size: 0.875rem;
  outline: none;
}

.input-text:focus, .input-select:focus, .input-textarea:focus {
  border-color: #3B82F6;
}

.cover-presets {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.presets-label {
  font-size: 0.75rem;
  color: #64748B;
}

.btn-preset {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
}

.btn-preset:hover {
  background-color: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
}

.cover-preview {
  margin-top: 0.75rem;
  border-radius: 8px;
  overflow: hidden;
  max-height: 180px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cover-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Editor Toolbar */
.editor-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.editor-tabs {
  display: flex;
  gap: 0.25rem;
}

.tab-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: transparent;
  border: 1px solid transparent;
  color: #94A3B8;
  cursor: pointer;
}

.tab-btn--active {
  background-color: rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.1);
}

.editor-toolbar {
  display: flex;
  gap: 0.35rem;
  background-color: #070B14;
  padding: 0.4rem;
  border-radius: 6px 6px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
}

.editor-toolbar button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #CBD5E1;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
}

.editor-toolbar button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
}

.content-editor-textarea {
  width: 100%;
  padding: 1rem;
  background-color: #070B14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 6px 6px;
  color: #F8FAFC;
  font-size: 0.95rem;
  line-height: 1.6;
  font-family: inherit;
  outline: none;
  resize: vertical;
}

.content-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #64748B;
}

.content-preview-box {
  background-color: #070B14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 1.5rem;
  min-height: 300px;
  color: #E2E8F0;
}

/* SEO Cards */
.seo-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.seo-card__title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.01em;
}

.seo-score-badge {
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.9rem;
}

.score--good {
  background-color: rgba(34, 197, 94, 0.15);
  color: #4ADE80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.score--warning {
  background-color: rgba(234, 179, 8, 0.15);
  color: #FACC15;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.score--bad {
  background-color: rgba(239, 68, 68, 0.15);
  color: #F87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.seo-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.seo-checklist li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.775rem;
}

.item-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
}

.item-pass {
  color: #E2E8F0;
}

.item-pass .item-icon {
  background-color: rgba(34, 197, 94, 0.2);
  color: #4ADE80;
}

.item-fail {
  color: #64748B;
}

.item-fail .item-icon {
  background-color: rgba(239, 68, 68, 0.15);
  color: #F87171;
}

/* SERP Preview */
.device-switcher {
  display: flex;
  gap: 0.25rem;
}

.device-switcher button {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: transparent;
  border: 1px solid transparent;
  color: #64748B;
  font-size: 0.7rem;
  cursor: pointer;
}

.device-btn--active {
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: #FFFFFF !important;
}

.serp-preview {
  background-color: #FFFFFF;
  color: #1F2937;
  padding: 1rem;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.serp-site-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.serp-favicon {
  width: 18px;
  height: 18px;
  background-color: #0A3D7C;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.serp-url-group {
  display: flex;
  flex-direction: column;
}

.serp-domain {
  font-size: 0.75rem;
  color: #202124;
  font-weight: 500;
}

.serp-breadcrumb {
  font-size: 0.65rem;
  color: #5F6368;
}

.serp-title {
  color: #1A0DAB;
  font-size: 1.05rem;
  font-weight: 400;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
  cursor: pointer;
}

.serp-title:hover {
  text-decoration: underline;
}

.serp-description {
  font-size: 0.8rem;
  color: #4D5156;
  margin: 0;
  line-height: 1.4;
}

/* Social Card */
.social-preview-card {
  background-color: #070B14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.social-preview-img {
  height: 140px;
  background-size: cover;
  background-position: center;
  background-color: #1E293B;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-img-text {
  font-size: 0.75rem;
  color: #64748B;
}

.social-preview-content {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.social-preview-domain {
  font-size: 0.65rem;
  color: #64748B;
  text-transform: uppercase;
  font-weight: 700;
}

.social-preview-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #F8FAFC;
  margin: 0;
  line-height: 1.3;
}

.social-preview-desc {
  font-size: 0.75rem;
  color: #94A3B8;
  margin: 0;
}

.seo-fields {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

@media (max-width: 1024px) {
  .editor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
