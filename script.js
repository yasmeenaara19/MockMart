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


// Card slider scroll

let index = 0;
const track = document.getElementById("sliderTrack");

function scrollCards(direction) {
  const cardWidth = track.children[0].offsetWidth + 20; // card + margin
  index += direction;
  const maxIndex = track.children.length - 3; // show 3 cards at a time
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;
  track.style.transform = `translateX(${-index * cardWidth}px)`;
}

// Optional: auto scroll the product list every 3 sec
const tracks = document.querySelectorAll(".slider-track, #productContainer");

tracks.forEach(track => {
  let scrollAmount = 0;
  setInterval(() => {
    if (track.scrollWidth > track.clientWidth) {
      scrollAmount += 300; // scroll by 300px
      if (scrollAmount >= track.scrollWidth - track.clientWidth) {
        scrollAmount = 0; // reset to start
      }
      track.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  }, 3000);
});

