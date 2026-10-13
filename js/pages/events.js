/* Events page: story scroller and the "more events" panel. */
document
  .querySelectorAll("[data-more-events]")
  .forEach((button) => button.addEventListener("click", BWAW.mor));
if (!BWAW.reducedMotion()) BWAW.story();
