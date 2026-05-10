export default function sitemap() {
  const base = "https://dreampetambala.in";
  const now = new Date();

  return [
    "",
    "/products",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
