document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbClose = document.getElementById("lbClose");

function openLb(card) {
  lbImg.src = card.dataset.full;
  lbImg.alt = card.dataset.title || "";
  lbTitle.textContent = card.dataset.title || "";
  lbDesc.textContent = card.dataset.desc || "";
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
}
function closeLb() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => openLb(card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLb(card);
    }
  });
  card.tabIndex = 0;
});
lbClose.addEventListener("click", closeLb);
lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLb();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLb();
});
