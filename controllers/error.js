exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    res,
    pageTitle: "Page Not Found",
    path: "/404",
    meta: "",
    scripts: [],
  });
};
