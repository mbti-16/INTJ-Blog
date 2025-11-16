// script.js
document.addEventListener('DOMContentLoaded', () => {
  const db = window.db;

  // -------------------------------------------------
  // عرض المقالات في صفحة "المقالات"
  // -------------------------------------------------
  const articleList = document.querySelector('.article-list');
  if (articleList) {
    getDocs(collection(db, 'articles')).then(querySnapshot => {
      articleList.innerHTML = '';
      querySnapshot.forEach(doc => {
        const { title, content, imageUrl, createdAt } = doc.data();
        const formattedDate = createdAt?.toDate().toLocaleDateString('ar-SA') || '';

        const card = `
          <article class="article-card">
            <h3>${title}</h3>
            <p>${content.substring(0, 100)}…</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="width:100%;height:auto;">` : ''}
            <small>${formattedDate}</small>
            <a href="article-detail.html?id=${doc.id}">قراءة المزيد</a>
          </article>`;
        articleList.insertAdjacentHTML('beforeend', card);
      });
    });
  }

  // -------------------------------------------------
  // عرض آخر المقالات في الصفحة الرئيسية
  // -------------------------------------------------
  const cardsContainer = document.querySelector('.cards');
  if (cardsContainer) {
    getDocs(collection(db, 'articles'), limit(3)).then(querySnapshot => {
      cardsContainer.innerHTML = '';
      querySnapshot.forEach(doc => {
        const { title, content, imageUrl } = doc.data();

        const card = `
          <article class="card">
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
            <h3>${title}</h3>
            <p>${content.substring(0, 80)}…</p>
            <a href="article-detail.html?id=${doc.id}">اقرأ المزيد</a>
          </article>`;
        cardsContainer.insertAdjacentHTML('beforeend', card);
      });
    });
  }

  // -------------------------------------------------
  // إرسال الرسائل من نموذج "تواصل"
  // -------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        timestamp: serverFieldValue('serverTimestamp')
      });

      alert('تم إرسال رسالتك! شكراً لتواصلك معنا.');
      contactForm.reset();
    });
  }
});
