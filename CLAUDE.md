# Fish Fry Cashier Calculator

## Project Overview
A touch-friendly cashier calculator PWA for volunteer-run fish fry events. Designed for speed and simplicity on mobile phones and tablets in potentially poor lighting conditions.

## GitHub Repository
https://github.com/ehallick/fishfry

## Tech Stack
- Single HTML file (`index.html`) with embedded CSS and JavaScript
- Service worker (`sw.js`) for offline reliability
- No build tools, no dependencies, no server component
- Hosted on GitHub Pages

## Key Files
- `index.html` - The complete app (HTML + CSS + JS in one file)
- `sw.js` - Service worker for offline caching

## Design Requirements
These requirements are non-negotiable for the use case:

### Touch & Speed
- Large, pressable buttons (min 44px touch targets)
- Minimal taps to complete a transaction
- Visual feedback on all interactions (press states)

### Readability
- High contrast (dark text on light backgrounds)
- Minimum 18px font sizes
- Change due amount must be prominently displayed (currently 56px)

### Workflow
1. Tap menu items to add to order
2. Tap items in receipt list to remove (for mistake correction)
3. Tap quick-pay button OR enter custom amount
4. See change due
5. Tap reset for next customer

### Responsive Layout
- Desktop/tablet landscape: side-by-side (menu left, receipt right)
- Phone portrait: stacked (menu top, receipt bottom)
- Must work in both orientations

## Menu Configuration
The menu is defined at the top of the `<script>` section in `index.html`:

```javascript
const menuItems = [
    { name: "2 Pc. Fish Dinner", price: 16 },
    { name: "Shrimp Dinner", price: 15 },
    { name: "1 Pc. Fish, 3 Pc. Shrimp", price: 17 },
    { name: "1 Pc. Fish", price: 6 },
    { name: "Dessert", price: 1 }
];
```

This should remain easy for non-technical volunteers to edit.

## Quick Pay Logic
Dynamically generates payment buttons based on total:
- Exact amount (always shown)
- Next multiple of $5 (if different from exact)
- Next multiple of $10 (if different from above)
- Next multiple of $20 (if different from above)

Example: Total $21 shows buttons for $21 (Exact), $25, $30, $40

## Service Worker Versioning
When updating the app, bump the version in `sw.js`:
```javascript
const CACHE_NAME = 'fishfry-cashier-v1';  // increment version number
```
This forces browsers to fetch the updated version.

## Deployment
- Hosted on GitHub Pages
- Volunteers receive a link, load it once while online
- App works offline after initial load (service worker caches assets)

## Future Enhancement Ideas (Not Yet Implemented)
- Quantity buttons (e.g., "x2" for two of the same item)
- Order history/sales totals for end-of-night reconciliation
- Sound feedback on button presses
- Print receipt capability
