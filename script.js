/* ================= MENU TOGGLE ================= */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
}

/* ================= FADE ON SCROLL ================= */
const animatedElements = document.querySelectorAll(".fade-up, .fade-down");
window.addEventListener("scroll", () => {
    animatedElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
});

/* ================= ANIMATED COUNTERS ================= */
const counters = document.querySelectorAll(".counter");
let counterStarted = false;
function startCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = target / 120;
        const updateCount = () => {
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
}
window.addEventListener("scroll", () => {
    const statsSection = document.getElementById("stats");
    if (!statsSection) return;
    const top = statsSection.getBoundingClientRect().top;
    if (top < window.innerHeight - 100 && !counterStarted) {
        startCounters();
        counterStarted = true;
    }
});

/* ================= DONATION TAB SWITCHING ================= */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all buttons
            tabButtons.forEach(b => b.classList.remove("active"));
            // Hide all tab contents
            tabContents.forEach(tab => tab.style.display = "none");

            // Activate clicked button & content
            btn.classList.add("active");
            document.getElementById(btn.getAttribute("data-tab")).style.display = "block";
        });
    });
}

/* ================= TOAST NOTIFICATION ================= */
const toast = document.getElementById("toast");
function showToast(message) {
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
}

/* ================= BITCOIN COPY ================= */
const copyBtn = document.getElementById("copyBtn");
const btcAddress = document.getElementById("btcAddress");
if (copyBtn && btcAddress) {
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(btcAddress.innerText.trim());
        showToast("Bitcoin address copied!");
    });
}

/* ================= PAYPAL COPY ================= */
const copyPaypalBtn = document.getElementById("copyPaypalBtn");
const paypalAccount = document.getElementById("paypalAccount");
if (copyPaypalBtn && paypalAccount) {
    copyPaypalBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(paypalAccount.innerText.trim());
        showToast("PayPal account copied!");
    });
}

/* ================= BITCOIN TRANSACTION FORM ================= */
const txForm = document.querySelector(".tx-form");
if (txForm) {
    txForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you! Your transaction ID has been received.");
        txForm.reset();
    });
}

/* ================= SUGGESTED DONATION AMOUNTS (OPTIONAL) ================= */
const suggestedAmounts = document.querySelectorAll(".cards .card");
suggestedAmounts.forEach(card => {
    card.addEventListener("click", () => {
        const amount = card.innerText.replace(/[^\d]/g, "");
        // Copy to clipboard for user convenience (BTC or PayPal)
        navigator.clipboard.writeText(amount);
        showToast(`Suggested donation $${amount} copied!`);
    });
});