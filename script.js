document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(card) {
  lightboxImg.src = card.dataset.full;
  lightboxImg.alt = card.dataset.title || "";
  lightboxTitle.textContent = card.dataset.title || "";
  lightboxDesc.textContent = card.dataset.desc || "";
  lightbox.hidden = false;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.removeAttribute("src");
}

document.querySelectorAll(".card").forEach((card) => {
  card.tabIndex = 0;
  card.addEventListener("click", () => openLightbox(card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(card);
    }
  });
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
