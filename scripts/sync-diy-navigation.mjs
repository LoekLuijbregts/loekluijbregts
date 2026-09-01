import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const articleSlugs = [
  "communication-timing-published-beats-perfect",
  "business-more-valuable-than-proposition",
  "call-three-best-customers-before-positioning",
  "help-ideal-customers-buy-the-work-you-love",
  "customer-reviews-are-strategy-research",
  "earned-media-is-borrowed-trust",
  "build-proof-before-the-launch",
  "earned-media-roi-beyond-impressions",
  "creator-influencer-ugc-or-media-partner",
  "outdoor-creators-are-becoming-media-businesses",
  "followers-are-rented-customer-permission-is-owned",
  "lean-social-media-growth-stack-for-founders",
  "iphone-first-content-creation",
  "founder-led-linkedin-writing",
  "stop-asking-what-to-post-build-a-story-inventory",
  "personal-brand-is-transferable-trust",
  "ironman-maastricht-seven-months-of-focused-work",
  "when-the-founder-is-the-only-salesperson",
  "small-audience-that-acts",
  "teach-before-you-pitch",
  "generosity-is-a-growth-system",
  "gravaa-case-study",
  "pilot-cycles-case-study",
  "atta-2026-adventure-travel-review",
  "earned-media-cycling-tourism",
  "cycling-tourism-content-strategy",
  "social-media-marketing-cycling-brands",
  "eurobike-trade-show-marketing",
  "fractional-marketing-partner-cycling",
  "cycling-destination-marketing-dmo",
  "cycling-destination-marketing-europe",
  "adventure-cycling-marketing-international",
  "cycling-brand-marketing-netherlands",
  "loek-luijbregts-cyclist-endurance-athlete",
  "website-images-speed-seo-communication",
];

const files = [
  "diy/index.html",
  "diy/own-your-mail/index.html",
  ...articleSlugs.map((slug) => `${slug}/index.html`),
];

const navigation = `<nav class="standard-site-nav" aria-label="Hoofdnavigatie">
  <div class="nav-inner">
    <a class="brand mono" href="/" aria-label="Loek Luijbregts homepage"><span class="site-brand-logo"><img class="site-logo-full" src="/images/logo-primary-horizontal.png" alt="Loek Luijbregts" width="1800" height="432"><img class="site-logo-mark" src="/images/logo-mark.svg" alt="" width="128" height="128" aria-hidden="true"></span></a>
    <div class="nav-right">
      <div class="nav-links mono">
        <a href="/#aanpak">Aanpak</a>
        <a href="/#voorbeelden">Voorbeelden</a>
        <a href="/earned-media/">Earned Media</a>
        <a href="/#samenwerken">Samenwerken</a>
        <a href="/diy/" aria-current="page">DIY</a>
        <a href="/tools/">Tools</a>
      </div>
      <div class="lang-switch mono" aria-label="Taal kiezen">
        <a href="/" lang="nl" aria-current="page">NL</a>
        <a href="/en/" lang="en">EN</a>
      </div>
      <a class="btn btn-primary" href="/mkb-scan/">Gratis scan</a>
    </div>
  </div>
</nav>`;

for (const relativeFile of files) {
  const file = path.join(root, relativeFile);
  const source = fs.readFileSync(file, "utf8");
  const matches = source.match(/<nav\b[\s\S]*?<\/nav>/g);

  if (!matches || matches.length !== 1) {
    throw new Error(`${relativeFile}: verwacht precies één navigatieblok, vond ${matches?.length ?? 0}`);
  }

  const updated = source.replace(/<nav\b[\s\S]*?<\/nav>/, navigation);
  fs.writeFileSync(file, updated);
}

console.log(`Navigatie bijgewerkt in ${files.length} DIY-pagina's.`);
