export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/dashboard"],
    },
    sitemap: "https://dreampetambala.in/sitemap.xml",
  };
}
