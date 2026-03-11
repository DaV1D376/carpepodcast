// script.js

// Initial default data if localstorage is empty
const defaultGuests = [
  {
    name: "ENRICO ROSSIGNOLI",
    bio: "Enrico Rossignoli è il CEO e co-fondatore di Live Bomber una piattaforma e un'app che ha rivoluzionato il modo in cui vengono raccontati e seguiti gli sport dilettantistici e amatoriali in Italia (in particolar modo il calcio, il calcio a 8 e il padel).",
    imageUrl:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3Aj3LGDrJQ6muAq1AFLqy07zYqH%2Fhf_20260310_125243_6b4ac200-3e29-4fce-b046-4d2798982426.jpeg&w=1280&q=85",
    videoUrl: "https://youtu.be/qdaCi0gNcKs?si=Dy3GYxtCmMudIhx1",
  },
  {
    name: "LORENZO RUBINETTI",
    bio: "Lorenzo Rubinetti è un esperto allenatore di pallacanestro italiano (Allenatore Nazionale F.I.P., F.I.B.A. e Coach WABC) con una lunghissima carriera alle spalle. Negli anni ha allenato e fatto da responsabile tecnico per tantissime realtà, sia giovanili (maschili e femminili) che senior. Tra le squadre in cui ha militato ci sono la Virtus Basket Aprilia, l'HSC Roma Basket, la Stella Azzurra, il San Raffaele e la Polisportiva Battipagliese. Vanta anche prestigiose esperienze internazionali, essendo stato Assistant Coach nella SuperLeague femminile in Arabia Saudita (Al Qadsiah) e avendo collaborato nello staff tecnico della La Salle University a Philadelphia (in NCAA Division I)",
    imageUrl:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3Aj3LGDrJQ6muAq1AFLqy07zYqH%2Fhf_20260310_130115_2587c09c-c26e-4e5e-9009-80b4deeff7e1.jpeg&w=1280&q=85",
    videoUrl: "https://youtu.be/nB4Ro_AvgQ0?si=5eVMpBimTLtmcpVM",
  },
  {
    name: "MATTEO LAROSA",
    bio: "Matteo LaRosa è un ragazzo squisito con un passato tra calcio e basket. Ci ha raccontato le sue esperienze nel mondo dello sport, sia nei suoi primi anni in ambito cestistico che in ambito calcistico, crescendo.",
    imageUrl:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3Aj3LGDrJQ6muAq1AFLqy07zYqH%2Fhf_20260311_100701_313c92a9-8f15-4f9c-a3d1-ca8dbad9b4ab.jpeg&w=1280&q=85",
    videoUrl: "https://youtu.be/zgtL4ejM8Is?si=4qD-D3F9xibe549B",
  },
  {
    name: "EDOARDO TERENZI",
    bio: "Edoardo Terenzi è un dirigente sportivo dilettantistico, noto principalmente per essere il Presidente dei Blackreapers, una delle squadre più strutturate e attive all'interno della Lega Calcio a 8 (Lega C8) di Roma.",
    imageUrl:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3Aj3LGDrJQ6muAq1AFLqy07zYqH%2Fhf_20260311_095005_4d74e477-43ca-4a80-8bac-ab3c3d8b05a6.jpeg&w=1280&q=85",
    videoUrl: "https://youtu.be/3inQKTTrSyI?si=Idr2fHLnGTxe5YhF",
  },
  {
    name: "MATTIA PARADISI",
    bio: "Mattia Paradisi è il Presidente dell'Atletico Alberone, una delle formazioni più attive e conosciute all'interno della Lega Calcio a 8 (Lega C8) di Roma, che ha la sua casa sportiva presso il centro sportivo Atletico 2000",
    imageUrl:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3Aj3LGDrJQ6muAq1AFLqy07zYqH%2Fhf_20260311_101915_738f5c8d-123f-42e1-86a1-a9b374bec6c8.jpeg&w=1280&q=85",
    videoUrl: "https://youtu.be/D3yLbMrK5NU?si=xBq3ylbBih8rfoLh",
  },
];

const defaultStats = {
  ytSubs: 4000,
  ytViews: 29000,
  tkViews: 23000,
  hours: 160,
};

// ALWAYS use the default guests from this file as the base.
// This ensures that editing this file and pushing to GitHub updates the live site.
// Admin-added guests (from localStorage) are merged on top.
function getGuests() {
  let adminGuests = [];
  try {
    adminGuests = JSON.parse(localStorage.getItem("carpeAdminGuests")) || [];
  } catch (e) {
    adminGuests = [];
  }
  return [...adminGuests, ...defaultGuests];
}

const defaultStatsObj = defaultStats;
if (!localStorage.getItem("carpeStats")) {
  localStorage.setItem("carpeStats", JSON.stringify(defaultStats));
}

document.addEventListener("DOMContentLoaded", () => {
  // --- Stats Counter Animation & Loading ---
  // Always use defaultStats from this file so editing here updates the live site
  const stats = defaultStats;
  const statCards = document.querySelectorAll(".stat-card");

  if (statCards.length > 0) {
    // Map the loaded stats to the elements visually (assuming order: YT Subs, YT Views, TK Views, Hours)
    const keys = ["ytSubs", "ytViews", "tkViews", "hours"];

    statCards.forEach((card, index) => {
      const numEl = card.querySelector(".stat-number");
      if (numEl && keys[index]) {
        numEl.setAttribute("data-target", stats[keys[index]]);
      }
    });
  }

  const statNumbers = document.querySelectorAll(".stat-number");

  function formatNumber(num, suffix) {
    if (suffix) {
      return num + suffix;
    }
    if (num >= 1000) {
      return Math.floor(num / 1000) + "K";
    }
    return num.toString();
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);
      el.textContent = formatNumber(current, suffix);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatNumber(target, suffix);
      }
    }
    requestAnimationFrame(update);
  }

  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            card.classList.add("animated");
            const numberEl = card.querySelector(".stat-number");
            if (numberEl) animateCounter(numberEl);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.3 },
    );

    document.querySelectorAll(".stat-card").forEach((card) => {
      observer.observe(card);
    });
  }

  // --- Guest Modal Logic ---
  const guestModal = document.getElementById("guest-modal");
  const modalImage = document.getElementById("modal-image");
  const modalName = document.getElementById("modal-name");
  const modalBio = document.getElementById("modal-bio");
  const modalVideoLink = document.getElementById("modal-video-link");
  const modalClose = document.getElementById("modal-close");

  function openGuestModal(guest) {
    if (!guestModal) return;
    modalImage.src = guest.imageUrl;
    modalImage.alt = guest.name;
    modalName.textContent = guest.name;
    modalBio.textContent = guest.bio;

    if (guest.videoUrl && guest.videoUrl !== "#") {
      modalVideoLink.href = guest.videoUrl;
      modalVideoLink.style.display = "inline-block";
    } else {
      modalVideoLink.style.display = "none";
    }

    guestModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  function closeGuestModal() {
    if (!guestModal) return;
    guestModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeGuestModal);
  }
  if (guestModal) {
    // Close when clicking outside modal-content
    guestModal.addEventListener("click", (e) => {
      if (e.target === guestModal) closeGuestModal();
    });
  }

  // --- Index Page Logic ---
  const guestsGrid = document.getElementById("guests-grid");
  if (guestsGrid) {
    const guests = getGuests();
    guestsGrid.innerHTML = "";

    guests.forEach((guest) => {
      const card = document.createElement("div");
      card.className = "guest-card";
      const vidUrl = guest.videoUrl ? guest.videoUrl : "#";
      card.innerHTML = `
                <div class="guest-image-wrapper">
                    <img src="${guest.imageUrl}" alt="${guest.name}" class="guest-image" loading="lazy">
                </div>
                <h3 class="guest-name">${guest.name}</h3>
                <p class="guest-bio">${guest.bio}</p>
                <div class="guest-actions">
                    <button class="btn btn-outline guest-btn open-modal-btn">SCOPRI DI PIÙ</button>
                    <a href="${vidUrl}" class="btn btn-black guest-btn" ${vidUrl !== "#" ? 'target="_blank"' : ""}>GUARDA ORA</a>
                </div>
            `;
      guestsGrid.appendChild(card);

      // Wire up the open modal button
      const openModalBtn = card.querySelector(".open-modal-btn");
      if (openModalBtn) {
        openModalBtn.addEventListener("click", () => {
          openGuestModal(guest);
        });
      }
    });

    // Slider Controls
    const sliderContainer = document.getElementById("guests-slider-container");
    const prevBtn = document.getElementById("prev-guest");
    const nextBtn = document.getElementById("next-guest");

    if (prevBtn && nextBtn && sliderContainer) {
      const scrollAmount = 420; // card width + gap

      prevBtn.addEventListener("click", () => {
        sliderContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });

      nextBtn.addEventListener("click", () => {
        sliderContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    }
  }

  // --- Collab Form Logic ---
  const collabForm = document.getElementById("collab-form");
  if (collabForm) {
    collabForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = collabForm.querySelector("button");
      const originalText = btn.textContent;
      
      btn.textContent = "INVIO IN CORSO...";
      btn.style.opacity = "0.7";
      btn.disabled = true;

      try {
        const formData = new FormData(collabForm);
        const response = await fetch(collabForm.action, {
          method: collabForm.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          btn.textContent = "INVIATO!";
          btn.style.background = "#28a745";
          collabForm.reset();
        } else {
          btn.textContent = "ERRORE!";
          btn.style.background = "#dc3545";
        }
      } catch (error) {
        btn.textContent = "ERRORE!";
        btn.style.background = "#dc3545";
      } finally {
        btn.style.opacity = "1";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "var(--gradient-warm)";
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  // --- Admin Page Logic ---
  const addGuestForm = document.getElementById("add-guest-form");
  const adminGuestsList = document.getElementById("admin-guests-list");

  function renderAdminList() {
    if (!adminGuestsList) return;
    const guests = getGuests();
    adminGuestsList.innerHTML = "";

    if (guests.length === 0) {
      adminGuestsList.innerHTML =
        '<p style="color: #888;">Nessun ospite presente.</p>';
      return;
    }

    guests.forEach((guest, index) => {
      const item = document.createElement("div");
      item.style.cssText =
        "display: flex; justify-content: space-between; align-items: center; padding: 15px; border: 1px solid #ddd; background: #fff; border-radius: 4px;";
      item.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${guest.imageUrl}" alt="Avatar" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
                    <div>
                        <strong style="font-family: var(--font-heading);">${guest.name}</strong>
                    </div>
                </div>
                <button class="btn btn-outline delete-btn" data-index="${index}" style="padding: 8px 15px; font-size: 12px; border-color: #dc3545; color: #dc3545;">ELIMINA</button>
            `;
      adminGuestsList.appendChild(item);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        if (confirm("Sei sicuro di voler eliminare questo ospite?")) {
          let guests =
            JSON.parse(localStorage.getItem("carpeAdminGuests")) || [];
          guests.splice(index, 1);
          localStorage.setItem("carpeAdminGuests", JSON.stringify(guests));
          renderAdminList(); // Re-render
        }
      });
    });
  }

  if (adminGuestsList) {
    renderAdminList();
  }

  if (addGuestForm) {
    addGuestForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("guest-name").value;
      const bio = document.getElementById("guest-bio").value;
      let imageUrl = document.getElementById("guest-image").value;
      const videoUrl = document.getElementById("guest-video").value;

      // Simple check and fallback if image url is totally broken or empty
      if (!imageUrl) {
        imageUrl =
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop";
      }

      const newGuest = { name, bio, imageUrl, videoUrl };

      let guests = [];
      try {
        guests = JSON.parse(localStorage.getItem("carpeAdminGuests")) || [];
      } catch (e) {
        guests = [];
      }

      // Add to beginning of array so it shows up first
      guests.unshift(newGuest);
      localStorage.setItem("carpeAdminGuests", JSON.stringify(guests));

      const btn = addGuestForm.querySelector("button");
      const originalText = btn.textContent;
      btn.textContent = "AGGIUNTO!";
      btn.style.background = "#28a745";
      btn.style.color = "white";

      renderAdminList(); // Update the list below

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "var(--col-black)";
        addGuestForm.reset();
      }, 2000);
    });
  }

  // --- Admin Stats Form Logic ---
  const statsForm = document.getElementById("stats-form");
  if (statsForm) {
    const adminStats =
      JSON.parse(localStorage.getItem("carpeStats")) || defaultStats;

    // Populate current values
    document.getElementById("stat-yt-subs").value = adminStats.ytSubs;
    document.getElementById("stat-yt-views").value = adminStats.ytViews;
    document.getElementById("stat-tk-views").value = adminStats.tkViews;
    document.getElementById("stat-hours").value = adminStats.hours;

    statsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newStats = {
        ytSubs: parseInt(document.getElementById("stat-yt-subs").value),
        ytViews: parseInt(document.getElementById("stat-yt-views").value),
        tkViews: parseInt(document.getElementById("stat-tk-views").value),
        hours: parseInt(document.getElementById("stat-hours").value),
      };

      localStorage.setItem("carpeStats", JSON.stringify(newStats));

      const btn = statsForm.querySelector("button");
      const originalText = btn.textContent;
      btn.textContent = "SALVATO CON SUCCESSO!";
      btn.style.background = "#28a745";

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "var(--col-black)";
      }, 2000);
    });
  }
});
