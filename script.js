document.addEventListener("DOMContentLoaded", () => {
  // 🌸 Floating hearts
  const heartsContainer = document.getElementById("hearts");
  if (heartsContainer) {
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 3 + 3 + "s";
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }
    setInterval(createHeart, 300);
  }

  // 🌼 Floating flowers
  const flowersContainer = document.getElementById("flowers");
  if (flowersContainer) {
    function createFlower() {
      const flower = document.createElement("div");
      flower.classList.add("flower");
      flower.style.left = Math.random() * 100 + "vw";
      flower.style.animationDuration = Math.random() * 3 + 4 + "s";
      flowersContainer.appendChild(flower);
      setTimeout(() => flower.remove(), 7000);
    }
    setInterval(createFlower, 500);
  }

  // 💘 Valentine question page logic
  const valentineName = localStorage.getItem("valentineName") || "you";
  const question = document.getElementById("valentineQuestion");
  if (question) {
    question.textContent = `💖 Can I be your Valentine, ${valentineName}? 💖`;
  }

  // 📝 Typing effect
  const h1 = document.querySelector("h1");
  if (h1 && h1.textContent === "...") {
    const text = `💖 Can I be your Valentine, ${valentineName}? 💖`;
    let i = 0;
    h1.textContent = "";
    function type() {
      if (i < text.length) {
        h1.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  // 😆 No button fly away
  const noButton = document.getElementById("noButton");
  if (noButton) {
    noButton.addEventListener("click", () => {
      noButton.style.transition = "all 1s ease";
      noButton.style.transform = `translate(${getRandomDirection()}) rotate(720deg)`;
      noButton.style.opacity = 0;
      noButton.disabled = true;
    });
  }

  function getRandomDirection() {
    const x = (Math.random() > 0.5 ? 1 : -1) * (500 + Math.random() * 500);
    const y = - (300 + Math.random() * 300);
    return `${x}px, ${y}px`;
  }

  // ✅ Go to question logic (used on name.html)
  const nameInput = document.getElementById('nameInput');
  if (nameInput) {
    window.goToQuestion = function () {
      const name = nameInput.value.trim();
      if (!name) {
        alert("Please enter a name!");
        return;
      }
      localStorage.setItem("valentineName", name);
      window.location.href = "question.html";
    };
  }

  // ✅ YES button → valentine.html
  const yesButton = document.getElementById("yesButton");
  if (yesButton) {
    yesButton.addEventListener("click", () => {
      window.location.href = "valentine.html";
    });
  }

  // 💌 LET’S DATE Page Logic
const dateForm = document.getElementById("dateForm");
const cardContainer = document.getElementById("cardContainer");

if (dateForm && cardContainer) {
  let savedCards = JSON.parse(localStorage.getItem("valentineDates")) || [];

  // Load existing cards
  savedCards.forEach((entry, index) => {
    createCard(entry, index);
  });

  dateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const place = document.getElementById("place").value;
    const activity = document.getElementById("activity").value;

    const newCard = { date, time, place, activity };
    savedCards.push(newCard);
    localStorage.setItem("valentineDates", JSON.stringify(savedCards));

    createCard(newCard, savedCards.length - 1);
    dateForm.reset();

    // 🎉 Confetti!
    if (typeof confetti === "function") {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    }
  });

  function createCard({ date, time, place, activity }, index) {
  const card = document.createElement("div");
  card.className = "bg-pink-100 border-l-4 border-pink-500 p-4 rounded-lg shadow transition-opacity duration-500 opacity-0";

  card.innerHTML = `
    <div class="relative">
      <h2 class="text-xl font-semibold text-pink-600 mb-1">💖 Our Date Plan</h2>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Place:</strong> ${place}</p>
      <p><strong>Activity:</strong> ${activity}</p>

      <div class="flex justify-between items-center mt-4">
        <div class="flex gap-2">
          <button class="download-btn text-sm bg-pink-200 px-3 py-1 rounded hover:bg-pink-300">⬇️ PDF</button>
          <button class="share-btn text-sm bg-blue-200 px-3 py-1 rounded hover:bg-blue-300">📤 Share</button>
        </div>
        <button class="delete-btn absolute bottom-2 right-2" title="Delete">
          <img src="images/delete-icon.png" alt="Delete" class="w-5 h-5 opacity-60 hover:opacity-100 transition">
        </button>
      </div>
    </div>
  `;
  function rebuildCards() {
  cardContainer.innerHTML = "";
  savedCards.forEach((entry, i) => {
    createCard(entry, i);
  });
}

  cardContainer.appendChild(card);
  requestAnimationFrame(() => {
    card.classList.remove("opacity-0");
  });

  // ✅ Add event for download button
  card.querySelector(".download-btn").addEventListener("click", () => {
    const content = `💖 Our Date Plan\nDate: ${date}\nTime: ${time}\nPlace: ${place}\nActivity: ${activity}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `DatePlan-${date}.txt`;
    link.click();
  });

  // ✅ Add event for share button
  card.querySelector(".share-btn").addEventListener("click", () => {
    const text = `💌 Our Date Plan:\nDate: ${date}\nTime: ${time}\nPlace: ${place}\nActivity: ${activity}`;
    if (navigator.share) {
      navigator.share({
        title: "Our Date Plan 💖",
        text: text
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard! Paste in Messenger or Telegram 💬");
      });
    }
  });

   // ✅ Attach delete logic
  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    savedCards.splice(index, 1);
    localStorage.setItem("valentineDates", JSON.stringify(savedCards));
    rebuildCards();
  });
}
}

});

// 📥 Handle download as PDF
card.querySelector('.download-btn').addEventListener('click', () => {
  const content = `
    Our Date Plan 💖
    --------------------
    Date: ${date}
    Time: ${time}
    Place: ${place}
    Activity: ${activity}
  `;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `DatePlan-${date}.txt`;
  link.click();
});

// 📤 Handle share
card.querySelector('.share-btn').addEventListener('click', () => {
  const text = `💌 Our Date Plan:\nDate: ${date}\nTime: ${time}\nPlace: ${place}\nActivity: ${activity}`;

  if (navigator.share) {
    navigator.share({
      title: "Our Date Plan 💖",
      text: text
    });
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard! Now paste it in Messenger or Telegram 💬");
    });
  }
});

/// ⬇ Fade in when page loads
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("fade-out");
});

// ⬇ Function to fade out and navigate
function fadeToPage(url) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = url;
  }, 500); // Match with CSS transition time
}