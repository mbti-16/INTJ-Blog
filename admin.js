
    // ====== 4. منطق لوحة التحكم (admin.html) ======
    
    // هذه الوظيفة ستنفذ فقط في صفحة admin.html
    if (document.body.classList.contains('admin-page')) {
        
        // **كلمة مرور بسيطة (للتجربة - يجب استخدام نظام المصادقة لـ Firebase للأمان)**
        // لغرض التدريب، سنستخدم المصادقة (Auth) عبر البريد وكلمة المرور.
        // **ملاحظة أمنية:** يجب عليك إنشاء حساب مستخدم في Firebase Authentication أولاً
        // (على سبيل المثال: admin@intjblog.com / 123456)
        const ADMIN_EMAIL = "abubakrkhlfallh@gmail.com"; 
        const ADMIN_PASSWORD = "197913"; 
        
        const loginContainer = document.getElementById('admin-login');
        const dashboardContainer = document.getElementById('admin-dashboard');
        const loginForm = document.getElementById('login-form');
        const logoutBtn = document.getElementById('logout-btn');
        const articleForm = document.getElementById('add-article-form');
        const messagesList = document.getElementById('messages-list');
        

        // التحقق من حالة المصادقة عند تحميل الصفحة
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // المستخدم مسجل الدخول
                showDashboard();
                fetchMessages(); // جلب الرسائل بمجرد تسجيل الدخول
            } else {
                // المستخدم غير مسجل الدخول
                showLogin();
            }
        });
        
        function showDashboard() {
            if(loginContainer && dashboardContainer) {
                loginContainer.style.display = 'none';
                dashboardContainer.style.display = 'block';
            }
        }
        
        function showLogin() {
             if(loginContainer && dashboardContainer) {
                loginContainer.style.display = 'block';
                dashboardContainer.style.display = 'none';
            }
        }

        // تسجيل الدخول
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
                    // onAuthStateChanged سيعالج باقي العملية
                } catch (error) {
                    alert("فشل تسجيل الدخول. تأكد من إعداد حساب المسؤول بشكل صحيح في Firebase Auth.");
                    console.error("Login Error: ", error);
                }
            });
        }
        
        // تسجيل الخروج
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await signOut(auth);
                // onAuthStateChanged سيعالج باقي العملية
                alert("تم تسجيل الخروج بنجاح.");
            });
        }

  // إضافة مقال
  articleForm.addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const summary = document.getElementById('summary').value;
    await addDoc(collection(db, 'articles'), {
      title,
      content,
      summary,
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
