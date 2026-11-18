let cart = JSON.parse(localStorage.getItem('souqna_cart')) || [];

// دالة تسجيل الدخول
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('souqna_user', username);
    alert('👋 مرحباً بك يا ' + username + ' في متجر سوقنا!');
    window.location.href = 'index.html';
}

// عرض اسم المستخدم في القائمة إذا كان مسجلاً
function checkUser() {
    const user = localStorage.getItem('souqna_user');
    const navLinks = document.querySelectorAll('nav');
    if (user && navLinks.length > 0) {
        navLinks.forEach(nav => {
            // تحديث رابط تسجيل الدخول ليظهر اسم المستخدم
            const loginLink = nav.querySelector('a[href="login.html"]');
            if (loginLink) {
                loginLink.innerText = '👤 ' + user;
            }
        });
    }
}

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    localStorage.setItem('souqna_cart', JSON.stringify(cart));
    alert('✅ تمت إضافة "' + name + '" إلى السلة بنجاح!');
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; font-size:18px; color:#64748b; padding: 20px;">السلة فاضية حالياً.. ارجع لصفحة المنتجات واتسوق على راحتك! 🛍️</p>';
        if (totalElement) totalElement.innerText = '0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <div class="product" style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 15px 20px; margin-bottom: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h3>${item.name}</h3>
                <p>السعر: ${item.price.toLocaleString()} جنيه</p>
                <button onclick="removeFromCart(${index})" style="background-color: #ef4444; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer;">حذف</button>
            </div>
        `;
    });

    if (totalElement) totalElement.innerText = total.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('souqna_cart', JSON.stringify(cart));
    renderCart();
}

// دالة إتمام الشراء مع الدفع الوهمي
function checkout() {
    if (cart.length === 0) {
        alert('⚠️ السلة فاضية! أضف منتجات أولاً عشان تتمم الطلب.');
        return;
    }

    const addressInput = document.getElementById('delivery-address');
    const paymentSelect = document.getElementById('payment-method');
    
    const address = addressInput ? addressInput.value.trim() : '';
    const paymentMethod = paymentSelect ? paymentSelect.value : 'كاش';

    if (address === '') {
        alert('⚠️ لو سمحت أدخل عنوان التوصيل أولاً!');
        return;
    }

    const user = localStorage.getItem('souqna_user') || 'عميلنا العزيز';

    alert(`🎉 تم استلام طلبك بنجاح يا ${user}!\n\n📍 عنوان التوصيل: ${address}\n💳 طريقة الدفع: ${paymentMethod}\n\nشكراً لتسوقك من متجر سوقنا 🛒`);
    
    cart = [];
    localStorage.removeItem('souqna_cart');
    if (addressInput) addressInput.value = '';
    renderCart();
}

window.onload = function() {
    checkUser();
    renderCart();
};