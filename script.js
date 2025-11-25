// script.js
// ====== تهيئة Supabase ======
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://jydidgltemleeubnyihq.supabase.co';
// يجب استخدام المفتاح العام (Anon Key) هنا بدلاً من المفتاح السري!
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5ZGlkZ2x0ZW1sZWV1Ym55aWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTc1MzksImV4cCI6MjA3OTU5MzUzOX0.3uAFr-ofM5z2gp-A1HYISAAer4WrGDqy8IW9FXf7bjQ'; //Placeholder

const supabase = createClient(supabaseUrl, supabaseKey);
// =============================


document.addEventListener('DOMContentLoaded', () => {

  // ------
  // عرض المقالات في صفحة "المقالات" (Articles)
  // ------
  const articleList = document.querySelector('.article-list');
  if (articleList) {
    // جلب كل المقالات
    supabase
      .from('articles')
      .select('id, title, summary, content, image_url, created_at')
      .order('created_at', { ascending: false })
      .then(({ data: articles, error }) => {
        if (error) {
          console.error("خطأ في جلب المقالات لصفحة المقالات:", error);
          articleList.innerHTML = '<p>حدث خطأ في تحميل المقالات.</p>';
          return;
        }

        articleList.innerHTML = '';
        if (articles.length === 0) {
           articleList.innerHTML = '<p>لا توجد مقالات منشورة حاليًا.</p>';
           return;
        }

        articles.forEach(article => {
          // يتم تخزين التاريخ كـ ISO String في Supabase
          const formattedDate = article.created_at ? new Date(article.created_at).toLocaleDateString('ar-SA') : '';

          const card = `
            <article class="article-card">
              <h3>${article.title}</h3>
              <p>${article.summary}</p>
              ${article.image_url ? `<img src="${article.image_url}" alt="${article.title}" style="width:100%;height:auto;">` : ''}
              <small>${formattedDate}</small>
              <a href="article-detail.html?id=${article.id}">قراءة المزيد</a>
            </article>`;
          articleList.insertAdjacentHTML('beforeend', card);
        });
      });
  }

  // ------------
  // عرض آخر المقالات في الصفحة الرئيسية (Home Page)
  // ------------
  const cardsContainer = document.querySelector('.cards');
  if (cardsContainer) {
    // جلب آخر 3 مقالات
    supabase
      .from('articles')
      .select('id, title, summary, image_url')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data: articles, error }) => {
        if (error) {
          console.error("خطأ في جلب آخر المقالات للصفحة الرئيسية:", error);
          cardsContainer.innerHTML = '<p>حدث خطأ في تحميل المقالات.</p>';
          return;
        }

        cardsContainer.innerHTML = '';
        if (articles.length === 0) {
           cardsContainer.innerHTML = '<p>لا توجد مقالات منشورة حاليًا.</p>';
           return;
        }

        articles.forEach(article => {
          const card = `
            <article class="card">
              ${article.image_url ? `<img src="${article.image_url}" alt="${article.title}">` : ''}
              <h3>${article.title}</h3>
              <p>${article.summary}</p>
              <a href="article-detail.html?id=${article.id}">اقرأ المزيد</a>
            </article>`;
          cardsContainer.insertAdjacentHTML('beforeend', card);
        });
      });
  }

  // -------
  // إرسال الرسائل من نموذج "تواصل" (Contact Form)
  // -------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const { data, error } = await supabase
        .from('messages') // يفترض وجود جدول 'messages'
        .insert([
          { 
            name: name, 
            email: email, 
            message: message, 
            created_at: new Date().toISOString() 
          }
        ]);

      if (error) {
        console.error("خطأ في إرسال الرسالة:", error);
        alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
      } else {
        alert('تم إرسال رسالتك! شكراً لتواصلك معنا.');
        contactForm.reset();
      }
    });
  }
});

