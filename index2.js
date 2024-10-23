// الحصول على العناصر
const colorPicker = document.getElementById('colorPicker');
const svgElements = document.querySelectorAll('.se');  // استهداف كل العناصر داخل الـ SVG

// تحديث لون كل عناصر الـ SVG عندما يختار المستخدم لون جديد
colorPicker.addEventListener('input', (event) => {
    const selectedColor = event.target.value;  // الحصول على اللون المختار
    
    // تكرار كل عنصر وتحديث خاصية 'fill' باللون الجديد
    svgElements.forEach((element) => {
        element.style.fill = selectedColor;
    });
});




// الحصول على القائمة المنسدلة والصور
const colorDropdown = document.getElementById('color-dropdown');
const images = document.querySelectorAll('.color-image');

// إضافة حدث تغيير عند اختيار لون من القائمة المنسدلة
colorDropdown.addEventListener('change', function() {
    const selectedColor = this.value;

    // إزالة التحديد من جميع الصور
    images.forEach(img => img.classList.remove('selected'));

    // تحديد الصورة المطابقة للون المختار
    document.querySelector(`.color-image[data-color="${selectedColor}"]`).classList.add('selected');
});

























const logoUploader = document.getElementById("logoUploader");
const userLogo = document.getElementById("userLogo");
const resizableContainer = document.querySelector('.resizable-container');
const rotateHandle = document.querySelector('.rotate-handle');
const resizeHandle = document.querySelector('.resize-handle');
let rotation = 0; // تتبع زاوية التدوير
let isDragging = false; // تتبع حالة السحب

// تحميل الصورة من المستخدم
logoUploader.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      userLogo.src = e.target.result; // تحديث الصورة الجديدة
      resizableContainer.style.display = "block"; // جعل الشعار مرئيًا
      resetLogoStyles(); // إعادة تعيين الأسلوب الافتراضي للشعار
    };
    reader.readAsDataURL(file); // قراءة الصورة كـ Data URL
  }
});

// إعادة تعيين الأسلوب الافتراضي للشعار
function resetLogoStyles() {
  userLogo.style.width = "100px"; // تعيين العرض الابتدائي
  userLogo.style.height = "100px"; // تعيين الارتفاع الابتدائي
  resizableContainer.style.top = "60%"; // ضبط الموضع العلوي للحاوية
  resizableContainer.style.left = "64%"; // ضبط الموضع الأيسر للحاوية
  resizableContainer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`; // ضبط التدوير والمركز
}

// تمكين السحب للشعار
userLogo.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDragging = true;
  let startX = e.clientX, startY = e.clientY;
  const initialLeft = resizableContainer.offsetLeft;
  const initialTop = resizableContainer.offsetTop;

  const onMouseMove = (e) => {
    if (!isDragging) return;

    let newLeft = initialLeft + (e.clientX - startX);
    let newTop = initialTop + (e.clientY - startY);

    const productRect = document.querySelector('.product').getBoundingClientRect();
    const logoRect = resizableContainer.getBoundingClientRect();

    const maxX = productRect.width - logoRect.width;
    const maxY = productRect.height - logoRect.height;

    newLeft = Math.min(Math.max(newLeft, 0), maxX);
    newTop = Math.min(Math.max(newTop, 0), maxY);

    resizableContainer.style.left = `${newLeft}px`;
    resizableContainer.style.top = `${newTop}px`;
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

// تمكين التدوير باستخدام مقبض التدوير
rotateHandle.addEventListener("mousedown", (e) => {
  e.preventDefault();
  e.stopPropagation(); // منع التداخل مع السحب
  const centerX = resizableContainer.offsetLeft + userLogo.clientWidth / 2;
  const centerY = resizableContainer.offsetTop + userLogo.clientHeight / 2;

  const onMouseMove = (e) => {
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    rotation = angle;
    resizableContainer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

// تمكين تغيير الحجم
resizeHandle.addEventListener("mousedown", (e) => {
  e.preventDefault();
  e.stopPropagation(); // منع التداخل مع السحب
  const startWidth = userLogo.clientWidth;
  const startHeight = userLogo.clientHeight;
  const startX = e.clientX;
  const startY = e.clientY;

  const onMouseMove = (e) => {
    let newWidth = startWidth + (e.clientX - startX);
    let newHeight = startHeight + (e.clientY - startY);

    // تحديد الحد الأدنى والحد الأقصى للحجم
    newWidth = Math.max(10, Math.min(100, newWidth));
    newHeight = Math.max(10, Math.min(100, newHeight));

    userLogo.style.width = `${newWidth}px`;
    userLogo.style.height = `${newHeight}px`;

    // تحديث موضع مقبض تغيير الحجم بعد تغيير الحجم
    resizeHandle.style.bottom = `-${(newHeight / 2) + 7}px`;
    resizeHandle.style.right = `-${(newWidth / 2) + 7}px`;
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});