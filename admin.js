// admin.js
document.addEventListener('DOMContentLoaded', () => {
  const db = window.db;
  const ADMIN_PASSWORD = 'Abubakr#.7'; // يمكنك تخزينه في Firestore أو Environment Variable
  const loginSection = document.getElementById('login-section');
  const dashboard = document.getElementById('dashboard');
  const loginBtn = document.getElementById('login-btn');
  const passInput = document.getElementById('admin-pass');
  const articleForm = document.getElementById('article-form');
  const messagesList = document.getElementById('messages-list');

  loginBtn.addEventListener('click', () => {
    if (passInput.value === ADMIN_PASSWORD) {
      loginSection.style.display = 'none';
      dashboard.style.display = 'block';
      loadMessages();
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  });

  // إضافة مقال
  articleForm.addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageUrl = document.getElementById('imageUrl').value;
    await addDoc(collection(db, 'articles'), {
      title,
      content,
      imageUrl,
      createdAt: serverFieldValue('serverTimestamp')
    });
    alert('تم نشر المقال!');
    articleForm.reset();
  });

  // عرض الرسائل
  async function loadMessages() {
    const querySnapshot = await getDocs(collection(db, 'messages'));
    messagesList.innerHTML = '';
    querySnapshot.forEach(doc => {
      const { name, email, message, timestamp } = doc.data();
      const li = document.createElement('li');
      li.textContent = `${name} (${email}) - ${timestamp?.toDate().toLocaleString('ar-SA') || ''}: ${message}`;
      messagesList.appendChild(li);
    });
  }
});
