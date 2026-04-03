# UWF Neuroscience Research Cluster — Website Prototype v2.1

**University of West Florida | Hal Marcus College of Science & Engineering**

> **DRAFT — Internal review only. Not approved for public distribution.**
> Contact: rguttmann@uwf.edu

---

## What's New in v2.1

- All six faculty profiled in full with verified credentials from biosketches and CVs
- James Arruda removed from all content
- UWF web governance compliance review integrated (see section below)
- WCAG 2.1 AA accessibility built in throughout (deadline: April 24, 2026)
- Seven publications with verified DOIs/PMIDs
- Six grant cards with accurate funding amounts and mechanisms
- Mobile-responsive layout tested to 320px
- Reduced-motion media query throughout (canvas, animations, counters)
- Print stylesheet included
- `aria-` attributes and semantic landmark roles throughout

---

## UWF Brand Colors Used

| Color | Hex | Use |
|-------|-----|-----|
| UWF Blue (Primary) | `#004C97` | Navigation, section accents, cards, buttons |
| UWF Green | `#007A33` | Active indicators, NeuroNauts section, CTA buttons |
| Pine Green | `#215732` | NeuroNauts section background |
| UWF Blue Dark | `#002850` | Hero, team section backgrounds |
| UWF Blue Deep | `#001830` | Footer, grants section |

All colors sourced from UWF Brand Guidelines at `uwf.edu/brand/color/`.

---

## UWF Web Governance Compliance Notes

The following items require action or approval before this site can go live on `uwf.edu` or any subdomain.

### Items That Need UMC Approval

| Element | Governance Requirement | Status |
|---------|----------------------|--------|
| Custom CSS (`styles.css`) | Writing custom CSS requires UMC approval per Section 5.4 | **Needs approval** |
| Custom JS (`app.js`) | Custom JavaScript requires UMC vetting per Section 5.4 | **Needs approval — submit to websupport@uwf.edu** |
| Google Fonts embed | External scripts require UMC and ITS review for GDPR and performance | **Needs review** |
| Neural canvas animation | iFrame/script content requires UMC accessibility and responsiveness vetting | **Needs review** |
| Contact section | Forms should use Wufoo per UWF policy — replace placeholder with Wufoo embed | **Action needed** |
| Subdomains (e.g., neuroscience.uwf.edu) | Must be approved jointly by UMC and ITS before setup | **Needs joint meeting** |

### Items That Are Straightforward Compliance

| Element | Status |
|---------|--------|
| UWF Blue and Green brand colors | ✅ Compliant — sourced from official brand guidelines |
| WCAG 2.1 AA target | ✅ Built in — DubBot scan still required before launch |
| AP style throughout | ✅ Compliant |
| External links open in new tab with `rel="noopener noreferrer"` | ✅ Compliant |
| `aria-label`, `role`, `aria-hidden` throughout | ✅ Implemented |
| `prefers-reduced-motion` support | ✅ Implemented — animations disabled for users who prefer it |
| No UWF logo used | ✅ Compliant — nautilus motif is an original SVG, not official logo |
| Print stylesheet | ✅ Included |
| No copyrighted external images | ✅ Compliant — avatar initials only; headshots to be sourced from UWF Photography Library |

### For the T4 CMS Migration

When moving from GitHub Pages to T4:

1. **Replace the custom `<header>` and `<nav>`** with UWF's global header/footer template. The top bar and navbar in this prototype are placeholders.
2. **Contact form**: Use Wufoo (recommended by UWF policy). Free accounts available. Submit form questions to websupport@uwf.edu.
3. **Faculty headshots**: Source from UWF Photography Library (`uwfphotos.smugmug.com`) or commission through UWF Creative Services. Replace the 2-letter avatar initials in `.member-avatar` elements.
4. **Navigation**: The custom 7-link nav is within UWF's recommended limit. Integrate into the HMCSE college nav structure.
5. **Publications**: Consider integration with UWF's BePress/Esploro institutional repository (`ircommons.uwf.edu`) for auto-updating publication lists.
6. **Events**: Any NeuroNauts or cluster events should be submitted to the UWF Event Calendar (`events.uwf.edu`). RSS feeds can pull those events into the page.
7. **Analytics**: Do NOT add a separate Google Analytics code — use UWF's centralized Google Analytics framework. Contact websupport@uwf.edu.
8. **Social media**: If the cluster creates social accounts, they must comply with `uwf.edu/brand/social-media/`.

---

## Faculty Featured (7 of 7)

| Faculty | Dept | Role |
|---------|------|------|
| Rodney Guttmann, Ph.D. | Biology, HMCSE | Cluster Director / PI |
| Shusen Pu, Ph.D. | Math & Statistics, HMCSE | Co-Founder, Computational Lead |
| Peter Cavnar, Ph.D. | Biology / Associate Dean, HMCSE | Co-Founder, Cell Biology |
| Daudet Ilunga Tshiswaka, Ph.D. | Public Health, Usha Kundu College of Health | Co-Founder, Public Health |
| Vanessa Rainey, Ph.D. | Psychology, Usha Kundu College of Health | Cognitive/Developmental Neuroscience |
| Lisa Blalock, Ph.D. | Psychology, Usha Kundu College of Health | Applied Cognition |
| Youngil Lee, Ph.D. | Kinesiology, HMCSE | Exercise Neuroscience |

---

## Publications (10, with sources)

All publications verified against CVs, biosketches, and DOIs provided by faculty. No fabricated or unverified citations included.

---

## Deployment

### GitHub Pages (current prototype)
1. Create a GitHub repository
2. Upload `index.html`, `styles.css`, `app.js`
3. Go to **Settings > Pages > Source: main branch / root**
4. Live in ~60 seconds at `https://[username].github.io/[repo-name]/`

### uwf.edu / T4 CMS (production)
Contact websupport@uwf.edu and meet jointly with UMC and ITS to:
- Determine whether this is a new page within an existing department section OR a new subdomain
- Obtain T4 account access (maximum 2 direct web managers per department)
- Complete Web Manager Training and DubBot enrollment
- Schedule accessibility audit before launch (WCAG 2.1 AA required by April 24, 2026)

---

## Design Vision

This prototype represents the level of visual ambition requested for the production site. The key design commitments:

- **UWF brand-forward**: UWF Blue (`#004C97`) and Green (`#007A33`) throughout, deep navy backgrounds
- **Institutional top bar**: Mirrors UWF college site convention for parent institution identification
- **Science-forward typography**: Playfair Display (serif) for headings, Source Sans 3 for body, JetBrains Mono for metadata/tags
- **Accessibility first**: All color contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- **Marketing voice**: Written for public audiences — prospective students, community partners, funders — not for internal academic audiences

### What Needs Customization Before Launch
- Faculty headshots (replace initials avatars)
- Contact form (replace placeholder with Wufoo embed)
- UWF global header/footer template integration
- DubBot accessibility scan and remediation
- UMC approval for custom CSS and JS

---

*Questions: rguttmann@uwf.edu | Web Governance: websupport@uwf.edu | 850.474.2212*
