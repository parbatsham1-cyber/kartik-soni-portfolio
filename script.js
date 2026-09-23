document.getElementById("year").textContent = new Date().getFullYear();

const nav = document.querySelector(".nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

const onScrollNav = () => {
  if (!nav) return;
  nav.classList.toggle("is-scrolled", window.scrollY > 12);
};
onScrollNav();
window.addEventListener("scroll", onScrollNav, { passive: true });

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const revealTargets = [
    ...document.querySelectorAll(".hero-grid > *"),
    ...document.querySelectorAll(".section-head"),
    ...document.querySelectorAll(".card"),
    ...document.querySelectorAll(".about-grid > *"),
    ...document.querySelectorAll(".contact-inner > *"),
  ];

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    const siblings = el.parentElement
      ? [...el.parentElement.children].filter((c) => c.classList.contains("reveal"))
      : [];
    const idx = Math.max(0, siblings.indexOf(el));
    el.style.setProperty("--reveal-delay", `${Math.min(idx, 8) * 70}ms`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

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
  requestAnimationFrame(() => lightbox.classList.add("open"));
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  window.setTimeout(() => {
    if (!lightbox.classList.contains("open")) {
      lightbox.hidden = true;
      lightboxImg.removeAttribute("src");
    }
  }, 350);
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
