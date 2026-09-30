// ================= CONTACT FORM (Web3Forms) =================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const originalBtn = sendBtn.innerHTML;
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.textContent = "";
        formStatus.className = "form-status";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
            });

            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent = "Thank you! Your message has been sent successfully.";
                formStatus.classList.add("success");
                contactForm.reset();
            } else {
                throw new Error(result.message || "Something went wrong");
            }
        } catch (error) {
            formStatus.textContent = "Sorry, message could not be sent. Please try again or email me directly.";
            formStatus.classList.add("error");
            console.error("Form error:", error);
        } finally {
            sendBtn.disabled = false;
            sendBtn.innerHTML = originalBtn;
        }
    });
}