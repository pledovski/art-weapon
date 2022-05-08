// content switcher ----------------------------------------------------------------
const prtcpnts_elem = document.querySelector(".participants--wrapper");
const tabs = document.querySelector(".tabs");
tabs.addEventListener("click", (e) => {
  prtcpnts_elem.querySelectorAll(".participants-list").forEach((el) => {
    el.classList.remove("visible");
  });

  document.querySelector(`.${e.target.id}`).classList.add("visible");
  tabs.querySelectorAll("li").forEach((el) => {
    el.classList.remove("active");
  });
  e.target.classList.add("active");
});
// prtcpnts_elem.addEventListener("click", () => {

// });
