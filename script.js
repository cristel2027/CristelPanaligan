const contactForm   = document.getElementById("contactForm");
const contactResult = document.getElementById("contactResult");

if (contactForm && contactResult) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const fullName = document.getElementById("fullName").value.trim();
    const email    = document.getElementById("email").value.trim();
    const message  = document.getElementById("message").value.trim();

    if (!fullName || !email || !message) {
      contactResult.textContent = "Please complete all the fields first, love. 💕";
      contactResult.classList.remove("active");
      contactResult.classList.add("warning");

      setTimeout(() => {
        contactResult.classList.remove("warning");
        contactResult.textContent = "";
      }, 1500);
      return;
    }

    contactResult.textContent = "Sending your message... 💌";
    contactResult.classList.remove("warning");
    contactResult.classList.add("active");

    const formData = new FormData();
    formData.append("name",    fullName);
    formData.append("email",   email);
    formData.append("message", message);

    fetch("https://formspree.io/f/mljjlngn", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    })
      .then(function (response) {
        if (response.ok) {
          contactResult.textContent =
            `Thank you, ${fullName}! Your message is on its way. I'll reply soon! 💜`;
          contactResult.classList.remove("warning");
          contactResult.classList.add("active");

          contactForm.reset();

          setTimeout(() => {
            contactResult.classList.remove("active");
            contactResult.textContent = "";
          }, 5000);
        } else {
          contactResult.textContent =
            "Oops! Something went wrong. Please try again.";
          contactResult.classList.remove("active");
          contactResult.classList.add("warning");

          setTimeout(() => {
            contactResult.classList.remove("warning");
            contactResult.textContent = "";
          }, 3000);
        }
      })
      .catch(function () {
        contactResult.textContent =
          "Network error. Please check your connection and try again.";
        contactResult.classList.remove("active");
        contactResult.classList.add("warning");

        setTimeout(() => {
          contactResult.classList.remove("warning");
          contactResult.textContent = "";
        }, 3000);
      });
  });
}