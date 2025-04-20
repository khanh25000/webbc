document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
  const fileInput = document.getElementById("attachment");
  const fileName = document.querySelector(".file-name");

  if (fileInput && fileName) {
    fileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        fileName.textContent = this.files[0].name;
        fileName.classList.add("animate-fade-in-up");
        setTimeout(() => {
          fileName.classList.remove("animate-fade-in-up");
        }, 1000);
      } else {
        fileName.textContent = "Chưa có tệp nào được chọn";
      }
    });
  }
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });
      item.classList.toggle("active");
      const icon = this.querySelector(".faq-icon i");
      if (item.classList.contains("active")) {
        icon.style.animation = "bounce 0.5s ease";
        setTimeout(() => {
          icon.style.animation = "";
        }, 500);
      }
    });
  });
  const style = document.createElement("style");
  style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0) rotate(180deg);}
            40% {transform: translateY(-5px) rotate(180deg);}
            60% {transform: translateY(-2px) rotate(180deg);}
        }
    `;
  document.head.appendChild(style);
  const contactForm = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");
  const errorModal = document.getElementById("errorModal");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const studentId = document.getElementById("studentId").value.trim();
      const email = document.getElementById("email").value.trim();
      const department = document.getElementById("department").value;
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      if (
        !name ||
        !studentId ||
        !email ||
        !department ||
        !subject ||
        !message
      ) {
        showErrorModal("Vui lòng điền đầy đủ các trường bắt buộc.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showErrorModal("Vui lòng nhập địa chỉ email hợp lệ.");
        return;
      }
      const studentIdRegex = /^SV\d{5,}$/;
      if (!studentIdRegex.test(studentId)) {
        showErrorModal("Mã sinh viên không hợp lệ. Định dạng: SV12345");
        return;
      }
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<span>Đang gửi...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        showSuccessModal();
        contactForm.reset();
        fileName.textContent = "Chưa có tệp nào được chọn";
      }, 2000);
    });
  }
  function showSuccessModal() {
    if (successModal) {
      successModal.classList.add("show");
      applyModalAnimation(successModal);

      const closeBtn = successModal.querySelector(".modal-close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          successModal.classList.remove("show");
        });
      }
    }
  }

  function showErrorModal(message) {
    if (errorModal) {
      if (message) {
        const errorText = errorModal.querySelector("p");
        if (errorText) {
          errorText.textContent = message;
        }
      }

      errorModal.classList.add("show");
      applyModalAnimation(errorModal);

      const closeBtn = errorModal.querySelector(".modal-close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          errorModal.classList.remove("show");
        });
      }
    }
  }

  function applyModalAnimation(modal) {
    const modalContent = modal.querySelector(".modal-content");
    const modalIcon = modal.querySelector(".modal-icon i");

    if (modalContent) {
      modalContent.style.animation = "modalEnter 0.5s ease forwards";
    }

    if (modalIcon) {
      setTimeout(() => {
        modalIcon.style.animation = "modalIconScale 0.5s ease forwards";
      }, 300);
    }
    const modalStyle = document.createElement("style");
    modalStyle.textContent = `
            @keyframes modalEnter {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes modalIconScale {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
        `;
    document.head.appendChild(modalStyle);
  }
  window.addEventListener("click", function (e) {
    if (e.target === successModal) {
      successModal.classList.remove("show");
    }
    if (e.target === errorModal) {
      errorModal.classList.remove("show");
    }
  });
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;

    card.addEventListener("mouseenter", function () {
      this.classList.add("animate-float");

      const icon = this.querySelector(".card-icon");
      if (icon) {
        icon.style.transform = "rotateY(180deg)";
        icon.style.backgroundColor = "var(--primary-color)";
        icon.style.color = "white";
      }
    });

    card.addEventListener("mouseleave", function () {
      this.classList.remove("animate-float");

      const icon = this.querySelector(".card-icon");
      if (icon) {
        icon.style.transform = "rotateY(0)";
        icon.style.backgroundColor = "rgba(48, 102, 190, 0.1)";
        icon.style.color = "var(--primary-color)";
      }
    });
  });
  const buttons = document.querySelectorAll(".submit-btn, .modal-close-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        .submit-btn, .modal-close-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyle);
  const heroSection = document.querySelector(".contact-hero");

  if (heroSection) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      const heroOffset = heroSection.offsetTop;
      const distance = scrollPosition - heroOffset;

      if (distance < 500 && distance > -500) {
        heroSection.style.backgroundPosition = `center ${distance * 0.05}px`;
      }
    });
  }
  const formInputs = document.querySelectorAll("input, textarea, select");

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("input-focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("input-focused");
    });
    if (input.tagName.toLowerCase() === "textarea") {
      input.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    }
  });
  const inputStyle = document.createElement("style");
  inputStyle.textContent = `
        .input-focused {
            position: relative;
        }
        
        .input-focused::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-color);
            animation: inputFocus 0.3s ease forwards;
            transform-origin: left;
        }
        
        @keyframes inputFocus {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }
    `;
  document.head.appendChild(inputStyle);
  const requiredInputs = document.querySelectorAll(
    "input[required], textarea[required], select[required]"
  );

  requiredInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value.trim()) {
        addValidationIcon(this, true);
      } else {
        addValidationIcon(this, false);
      }
    });
  });

  function addValidationIcon(input, isValid) {
    const parent = input.parentElement;
    const existingIcon = parent.querySelector(".validation-icon");
    if (existingIcon) {
      parent.removeChild(existingIcon);
    }
    if (!input.value.trim()) return;
    const icon = document.createElement("span");
    icon.className = "validation-icon";
    icon.innerHTML = isValid
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-exclamation-circle"></i>';

    icon.style.position = "absolute";
    icon.style.right = "10px";
    icon.style.top = "50%";
    icon.style.transform = "translateY(-50%)";
    icon.style.color = isValid ? "var(--success-color)" : "var(--error-color)";
    icon.style.animation = "fadeIn 0.3s ease";
    parent.style.position = "relative";
    parent.appendChild(icon);
  }
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("input", function () {
      const email = this.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && emailRegex.test(email)) {
        addValidationIcon(this, true);
      } else if (email) {
        addValidationIcon(this, false);
      }
    });
  }
  const fadeInStyle = document.createElement("style");
  fadeInStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
  document.head.appendChild(fadeInStyle);

  const formGroups = document.querySelectorAll(".form-group");

  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea, select");
    const label = group.querySelector("label");

    if (input && label) {
      if (input.value.trim()) {
        label.classList.add("active");
      }
      input.addEventListener("focus", function () {
        label.classList.add("active");
      });
      input.addEventListener("blur", function () {
        if (!this.value.trim()) {
          label.classList.remove("active");
        }
      });
    }
  });
});
