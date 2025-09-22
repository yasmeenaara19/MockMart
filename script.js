function showModal(modalId, btnId) {
  const modal = document.getElementById(modalId);
  const button = document.getElementById(btnId);

  if (!modal || !button) return;

  button.onclick = function () {
    // toggle visibility
    const isVisible = modal.style.display === "block";
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
    if (isVisible) return;

    modal.style.display = "block";

    // Get button position
    const rect = button.getBoundingClientRect();
    modal.style.top = rect.bottom + window.scrollY + "px";
    modal.style.left = rect.left + window.scrollX + "px";
  };

  // Close button inside modal
  const closeBtn = modal.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.onclick = () => (modal.style.display = "none");
  }
}

// Initialize modals
showModal("shoppingModal", "shoppingBtn");
showModal("deliveryModal", "openModalBtn");




// Category horizontal scroll
function scrollCategory(direction) {
  const container = document.getElementById("categoryList");
  container.scrollBy({
    left: direction * 200,
    behavior: "smooth"
  });
}

// Image slideshow (auto switch every 1 sec)
setInterval(() => {
  document.querySelectorAll(".slideshow").forEach(slideshow => {
    let slides = slideshow.querySelectorAll(".slide");
    let activeIndex = Array.from(slides).findIndex(img => img.classList.contains("active"));
    slides[activeIndex].classList.remove("active");
    let nextIndex = (activeIndex + 1) % slides.length;
    slides[nextIndex].classList.add("active");
  });
}, 1000);


// -----------------------------
// UNIVERSAL SLIDER FUNCTION
// -----------------------------
function createSlider(trackId) {
  let index = 0;
  const track = document.getElementById(trackId);

  function scroll(direction) {
    const card = track.querySelector(".card, .product-card"); 
    if (!card) return;

    const cardWidth = card.offsetWidth + 20; // card + gap
    index += direction;

    const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth);
    const maxIndex = track.children.length - visibleCards;

    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;

    track.style.transform = `translateX(${-index * cardWidth}px)`;
  }

  return scroll;
}

// -----------------------------
// CREATE SLIDERS
// -----------------------------
const scrollHeadphones = createSlider("sliderTrack");   // Headphones / TV / Fridge
const scrollQuickPicks = createSlider("productContainer"); // Quick Picks section

// Example: in HTML
// <button onclick="scrollHeadphones(-1)">‹</button>
// <button onclick="scrollHeadphones(1)">›</button>
// <button onclick="scrollQuickPicks(-1)">‹</button>
// <button onclick="scrollQuickPicks(1)">›</button>
