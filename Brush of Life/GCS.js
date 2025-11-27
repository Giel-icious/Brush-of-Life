
(() => {
  // DOM refs — kuha ng elements na gagamitin
  const mastheadImg = document.getElementById("masthead-img");
  const pageEls = Array.from(document.querySelectorAll(".page"));
  const topLinks = document.querySelectorAll(".top-nav a");

  // showPage — palit active page gamit key
  function showPage(key) {
    const targetId = `page-${key}`;
    pageEls.forEach(p => p.classList.toggle("active", p.id === targetId));
    const active = document.getElementById(targetId);
    if (!active) return;
    const masthead = active.dataset.masthead;
    if (masthead) mastheadImg.src = masthead;
    document.body.classList.remove("theme-home","theme-aero","theme-terra","theme-hydro");
    document.body.classList.add(`theme-${key}`);
    const firstSection = active.querySelector(".section");
    if (firstSection) setActiveSection(active, firstSection.id);
  }

  // setActiveSection — switch visible section sa current page
  function setActiveSection(pageEl, sectionId) {
    pageEl.querySelectorAll(".section").forEach(sec => {
      sec.classList.toggle("active", sec.id === sectionId);
    });
    pageEl.querySelectorAll(".side-nav a").forEach(a => {
      const key = pageEl.id.replace("page-", "");
      const isActive = a.dataset.section && `${key}-${a.dataset.section}` === sectionId;
      a.classList.toggle("active", isActive);
    });
  }

  // Top nav events — switch page
  topLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // Side nav events — switch section
  document.querySelectorAll(".page .side-nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const pageEl = link.closest(".page");
      const key = pageEl.id.replace("page-", "");
      setActiveSection(pageEl, `${key}-${link.dataset.section}`);
    });
  });

  // Default view — Home muna
  showPage("home");
})();