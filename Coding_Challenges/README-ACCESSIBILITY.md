# Accessibility improvements

This site follows WCAG 2.2 AA best practices where practical for a small static site.

Highlights
- Landmarks and navigation
  - Each page uses semantic regions: <header>, <nav>, <main>, <footer>
  - A Skip to content link is available and targets <main> (which is focusable via tabindex="-1")
  - Current nav item uses aria-current="page"
- Images and media
  - Decorative brand logo uses empty alt ("")
  - Content images include descriptive alt text; gallery images are lazy-loaded
  - Figures include captions where helpful
- Keyboard and focus
  - Consistent :focus-visible outline across links, buttons, inputs, controls
  - Hover-only effects have focus-visible equivalents
  - Disabled demo anchors are removed from tab order (tabindex="-1")
  - Gallery images are keyboard activatable (Enter/Space) and open an accessible lightbox dialog with focus trap and Escape to close
  - Map toolbar (CSS-only) labels are enhanced to behave like real buttons with role="button", keyboard activation, and aria-pressed/expanded state
- Forms
  - Inputs have labels, helpful autocomplete attributes, and a polite aria-live note that indicates the demo behavior on submit
- Motion and performance
  - All reveal animations respect prefers-reduced-motion
  - Images use loading="lazy" where appropriate

Quick test checklist
- Keyboard only
  - Press Tab from top of page: the Skip link appears; pressing Enter moves focus to the main heading
  - Navigate the navbar, buttons, cards, and gallery items; focus is always visible
  - On the Projects page, press Enter on a gallery image to open the lightbox; use Tab to move between previous/next/close and Esc to exit
  - On the Map page, use Tab to reach the toolbar; press Enter/Space on Map/Satellite/Terrain, Zoom, and Layer controls; the state updates and is announced via aria-pressed where relevant
- Screen reader
  - Verify that decorative images (logo) are skipped
  - Confirm headings are in a reasonable outline (one H1 per page; H2/H3 nested)
  - Navigate by landmarks to jump to Main, Navigation, and Footer

Notes
- The map is a CSS-only mock; interactive labels control hidden inputs. JS adds keyboard semantics to the labels. If Javascript is disabled, basic label activation still works with a mouse, but keyboard behavior is best with JS enabled.
