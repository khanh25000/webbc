document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentNode;
      faqItem.classList.toggle("active");
    });
  });
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      console.log("Form submitted:", formValues);
      alert(
        "Cảm ơn bạn đã liên hệ với chúng tôi!\nChúng tôi sẽ phản hồi trong thời gian sớm nhất."
      );
      this.reset();
    });
  }
  const formInputs = document.querySelectorAll(
    "#contactForm input, #contactForm select, #contactForm textarea"
  );

  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.required && !this.value.trim()) {
        this.classList.add("error");
      } else {
        this.classList.remove("error");
      }
    });
  });
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
        this.classList.add("error");
      } else {
        this.classList.remove("error");
      }
    });
  }
});
