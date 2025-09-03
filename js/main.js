/* footer 연도 넣기 */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

/* 요소들 참조 */
const sections = document.querySelectorAll("main .section");
const navLinks = document.querySelectorAll(".nav-link");
const themeBtn = document.getElementById("themeToggle");

/* 스크롤 스파이 동작 */
function updateActiveNavOnScroll() {
  let current = "";
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  }

  for (let j = 0; j < navLinks.length; j++) {
    const link = navLinks[j];
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === "#" + current) {
      link.classList.add("active");
    }
  }
}

/* 스크롤 이벤트 등록 */
window.addEventListener("scroll", function() {
  updateActiveNavOnScroll();
});

/* 초기 호출 */
updateActiveNavOnScroll();

/* 테마 초기값 로드 */
(function() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      if (themeBtn) themeBtn.textContent = "☀️ Toggle Theme";
    } else {
      if (themeBtn) themeBtn.textContent = "🌙 Toggle Theme";
    }
  } catch (e) {
    if (themeBtn) themeBtn.textContent = "🌙 Toggle Theme";
  }
})();

/* 테마 토글 버튼 */
if (themeBtn) {
  themeBtn.addEventListener("click", function() {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {}
      themeBtn.textContent = "🌙 Toggle Theme";
      themeBtn.setAttribute("aria-pressed", "false");
    } else {
      document.body.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {}
      themeBtn.textContent = "☀️ Toggle Theme";
      themeBtn.setAttribute("aria-pressed", "true");
    }
  });
}

/* 내비게이션 클릭 시 스무스 스크롤 */
for (let k = 0; k < navLinks.length; k++) {
  (function(link) {
    link.addEventListener("click", function(e) {
      const href = link.getAttribute("href");
      if (href && href.indexOf("#") === 0) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const top = target.offsetTop - 20;
          window.scrollTo({
            top: top,
            behavior: "smooth"
          });
        }
      }
    });
  })(navLinks[k]);
}
