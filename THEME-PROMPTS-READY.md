# 🎨 THEME SYSTEM - AI PROMPT TEMPLATES

## 📁 Setup Complete!
- ✅ Theme branches created
- ✅ Switch scripts ready
- ✅ GitHub repository synced

## 🚀 How to Use:

### Step 1: Choose a theme
```bash
switch-theme apple-luxury
# or
git checkout theme-apple-luxury
```

### Step 2: Copy the prompt below
### Step 3: Paste it to any AI (ChatGPT, Claude, etc.)
### Step 4: Replace [YOUR_SITE_URL] with your GitHub Pages URL
### Step 5: Copy the AI's CSS output
### Step 6: Replace the content of book-style.css
### Step 7: Commit and push
```bash
git add book-style.css
git commit -m "Apply [theme-name] styling"
git push
```

### Step 8: View results and switch themes as needed!

---

## 🎨 THEME 1: Apple-Inspired Minimalist Luxury
**Branch:** `theme-apple-luxury`
**Use:** `switch-theme apple-luxury`

**Prompt to copy:**
```
Act as a Senior UX/UI Strategist from Apple's internal design team. Your task is to generate a complete CSS stylesheet that transforms the documentation website at [https://github.com/Deefunxion/draftV2/tree/theme-apple-luxury] into a premium, minimalist, and high-trust documentation experience. The final output must be clean, performant, and reflect Apple's core design principles.

Core Directives:

• Layout & Spacing: Implement a CSS Grid-based layout with generous whitespace. Use padding: clamp(40px, 8vw, 120px); for section spacing. Ensure a strong visual hierarchy where the content is the undisputed hero.
• Typography: Utilize a system font stack prioritizing 'SF Pro Display', 'Helvetica Neue', and other sans-serif fallbacks. Define a precise type scale using clamp() for fluid responsiveness. Headings must use font-weight: 600; and body text font-weight: 400; with letter-spacing: -0.015em; for improved readability.
• Color Palette: Enforce a strict monochromatic scheme. Use #FFFFFF for backgrounds, #F5F5F7 for subtle section differentiation, and #1D1D1F for all text. A single accent color #0071e3 should be used exclusively for primary links and interactive state changes.
• Interactivity & Animation: All transitions must be subtle and purpose-driven. Use transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);. Interactive elements on hover should have a minimal transform: translateY(-2px); and a soft box-shadow: 0 8px 24px rgba(0,0,0,0.08);.

Output Format: Provide a single, complete CSS file that replaces the current book-style.css. Include comments /* Critical: Navigation */ for essential viewport styles.
```

---

## 🧠 THEME 2: Conversion-Focused Psychological Nudge
**Branch:** `theme-conversion-psychology`
**Use:** `switch-theme conversion-psychology`

**Prompt to copy:**
```
Act as a Conversion Rate Optimization (CRO) specialist with expertise in behavioral psychology. Your mission is to generate a CSS stylesheet for the documentation website at [https://github.com/Deefunxion/draftV2/tree/theme-conversion-psychology] that systematically applies visual cues and psychological triggers to guide users towards engaging with the content and completing their learning journey.

Conversion Directives:

• Visual Hierarchy & Urgency: Primary navigation links must use a high-contrast background color (e.g., #FF7A00 or #28A745) that is used nowhere else. On hover, apply transform: scale(1.05); and an assertive box-shadow. For important sections, use a container with subtle attention-drawing styling.
• Progress & Trust Signals: Style chapter completion indicators with clear visual progress. Add 'Chapter Complete' visual cues using ::before pseudo-elements with content: '✓'; and distinct colors.
• Friction Reduction in Navigation: Navigation must have larger touch targets (minimum 44px), clear :focus states (border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,0.2);), and obvious visual feedback.
• Content Anchoring: Style chapter numbers with increased prominence, main content with clear visual separation, and use color psychology to indicate progress (green for completed, blue for current, gray for upcoming).

Output Mandate: Deliver a complete CSS file. Add comments explaining the psychological principle behind each major rule (e.g., /* Completion Principle */, /* Visual Hierarchy: Attention */).
```

---

## ⚡ THEME 3: Performance-First Core Web Vitals
**Branch:** `theme-performance-optimized`
**Use:** `switch-theme performance-optimized`

**Prompt to copy:**
```
Act as a Performance Engineer obsessed with Google's Core Web Vitals. Your sole objective is to refactor the CSS of the documentation website at [https://github.com/Deefunxion/draftV2/tree/theme-performance-optimized] to be exceptionally fast, efficient, and achieve a 'Good' score across LCP, INP, and CLS, without significantly altering the core readability.

Performance Mandates:

• CLS (Cumulative Layout Shift) Prevention: All content sections must have explicit dimensions and use CSS Grid with fixed track sizes. Any dynamic content must have pre-defined container sizes using min-height properties.
• LCP (Largest Contentful Paint) Optimization: Identify the LCP element (likely the main heading). Ensure its styles are minimal and placed at the very top of the CSS file. Use system fonts only for critical text. Web fonts for body text must use font-display: swap;.
• INP (Interaction to Next Paint) & Animation Efficiency: All animations must be limited to transform and opacity properties. Use will-change: transform, opacity; sparingly and only on actively animated elements. Remove any complex hover effects that could cause paint thrashing.
• Code Efficiency: Eliminate redundant selectors, consolidate utility classes, use efficient modern selectors over deeply nested ones. Minimize CSS file size while maintaining readability.

Output Requirement: Provide the refactored CSS with a commented 'Performance Report' section:
/* PERFORMANCE REPORT
   - Estimated CLS Reduction: Layout shifts eliminated through fixed dimensions
   - Estimated LCP Improvement: Critical path CSS prioritized
   - Key Changes: Removed complex animations, optimized selector efficiency
*/
```

---

## 🎬 THEME 4: Immersive Storytelling Cinematic
**Branch:** `theme-cinematic-storytelling`
**Use:** `switch-theme cinematic-storytelling`

**Prompt to copy:**
```
Act as a Creative Director specializing in digital brand experiences, like those created for Netflix or National Geographic documentaries. Your task is to generate a CSS stylesheet for the documentation website at [[YOUR_SITE_URL](https://github.com/Deefunxion/draftV2/tree/theme-cinematic-storytelling)] that transforms the reading experience into an immersive, cinematic journey while maintaining perfect legibility for educational content.

Core Directives:

• Layout & Visual Narrative: Implement full-width sections with dramatic typography. Use CSS Grid to position content in cinematic compositions. Text must never overlay busy areas; use high-contrast backgrounds (background: rgba(0, 0, 0, 0.8);) to ensure 4.5:1 contrast ratio minimum.
• Typography for Impact: Chapter headings should be large and impactful (font-size: clamp(2.5rem, 7vw, 4rem);) but body text must remain highly readable (font-size: clamp(16px, 1.8vw, 20px);) with line-height: 1.7;. Use dramatic font weights for hierarchy.
• Scroll-Triggered Visual Interest: Use CSS-only techniques like clip-path and transform on scroll position to create reveal effects. Focus on fade-ins and upward movement that enhance, not distract from, content consumption.
• Atmospheric Color Schemes: Use deep, rich colors that evoke learning and focus. Think library aesthetics with warm, inviting tones that encourage long reading sessions.

Output Mandate: Provide complete CSS with comments specifying the narrative purpose: /* Chapter Introduction: Setting the scene */.
```

---

## 📱 THEME 5: Mobile-First Social-Native
**Branch:** `theme-mobile-social`
**Use:** `switch-theme mobile-social`

**Prompt to copy:**
```
Act as a Mobile UX Architect. Your task is to generate a CSS stylesheet for the documentation website at [https://github.com/Deefunxion/draftV2/tree/theme-mobile-social] that completely redesigns it with a 'mobile-first' and 'social-native' approach, inspired by the intuitive interfaces of modern learning apps. The primary goal is speed, clarity on small screens, and gesture-friendly interactions.

Core Directives:

• Layout & Ergonomics: Design for one-handed use. Navigation must be in a sticky bottom bar (position: fixed; bottom: 0;) within thumb reach. Use single-column layout for all content with generous touch targets.
• Typography & Clarity: Use system UI fonts for maximum performance. All body text must be at least 18px on mobile. Headings should use significantly larger font-weight (700+) for clear separation without excessive size.
• Touch Targets: All interactive elements must have minimum 44px height with adequate spacing between them. Navigation items should have visual feedback on touch.
• Progressive Disclosure: Content should be organized in expandable sections, allowing users to focus on one chapter at a time. Use clear visual indicators for expandable content.
• Performance: No background images on large containers. Optimize for 3G networks. Animations should be minimal and CSS-only.

Output Mandate: Mobile-first CSS structure with mobile styles first, followed by @media (min-width: 768px) for larger screens.
```

---

## ♿ THEME 6: Accessibility-First Inclusive Design
**Branch:** `theme-accessibility-wcag`
**Use:** `switch-theme accessibility-wcag`

**Prompt to copy:**
```
Act as a Senior Accessibility Specialist. Your mandate is to audit and rewrite the CSS for the documentation website at [https://github.com/Deefunxion/draftV2/tree/theme-accessibility-wcag] to ensure it is fully compliant with WCAG 2.2 Level AA standards, creating an inclusive learning experience for all users, including those with disabilities. Aesthetics must serve, not hinder, accessibility.

Core Accessibility Directives:

• Color & Contrast: All text content must meet minimum contrast ratio of 4.5:1. Interactive elements must meet 3:1 contrast ratio. Provide alternative, compliant color variables. Information must never be conveyed by color alone.
• Focus Management: All interactive elements must have highly visible :focus-visible states using outline: 3px solid #0066CC; with outline-offset: 2px; for keyboard navigation clarity.
• Typography & Spacing: Base font-size must be relative (1rem) to allow user scaling. Text must have line-height of at least 1.5 and generous paragraph spacing for cognitive accessibility.
• Navigation Clarity: Remove any hover-dependent functionality. All navigation must be keyboard accessible with clear focus indicators and logical tab order.
• Screen Reader Optimization: Structure content with proper heading hierarchy (h1→h2→h3). Use semantic HTML elements that work with assistive technology.

Output Mandate: Provide WCAG-compliant CSS with comments referencing specific success criteria: /* Addresses WCAG 1.4.3 Contrast (Minimum) */.
```

---

## ✨ THEME 7: Micro-Interaction Engagement
**Branch:** `theme-micro-interactions`
**Use:** `switch-theme micro-interactions`

**Prompt to copy:**
```
Act as a UX Interaction Designer. Your goal is to enhance the documentation website at [https://github.com/Deefunxion/draftV2/tree/theme-micro-interactions] by generating a CSS stylesheet focused on creating meaningful and intuitive micro-interactions. Every interaction must provide clear, immediate feedback to enhance the learning experience without being distracting.

Core Interaction Directives:

• Stateful Navigation: Design navigation that clearly communicates current location.
  - Default: Clean, clear labels
  - Hover: Subtle lift (transform: translateY(-2px);) indicating interactivity
  - Active/Current Page: Distinct styling with visual indicator
  - Visited Sections: Subtle visual indication of completed reading
• Reading Progress Indicators: Visual progress bars or indicators that show reading completion for each chapter. These should update based on scroll position using CSS-only techniques where possible.
• Content Reveal Animations: When users scroll to new sections, content should have subtle entrance animations (opacity: 0 to 1 with transform: translateY(20px) to translateY(0)). 
• Interactive Feedback: All clickable elements should provide immediate visual confirmation. Use swift animations (duration: 0.2s - 0.3s) with natural easing (cubic-bezier(0.4, 0, 0.2, 1)).

Output Mandate: Complete CSS with commented sections for each interaction type: /* Navigation States */, /* Progress Indicators */, /* Content Reveals */.
```

---

## 🌌 THEME 8: 3D-Inspired Future-Proof
**Branch:** `theme-3d-futuristic`
**Use:** `switch-theme 3d-futuristic`

**Prompt to copy:**
```
Act as a Forward-Thinking UI Designer preparing an educational platform for the next wave of spatial computing and immersive learning. Generate a CSS stylesheet for the documentation at [https://github.com/Deefunxion/draftV2/tree/theme-3d-futuristic] that creates a sense of depth and spatial hierarchy using current CSS properties, while remaining perfectly readable on standard screens.

Core Directives:

• Perceived Depth & Layers: Use transform: translateZ() and perspective on containers to create depth. Content cards should lift towards the user on interaction (transform: translateZ(20px);) with realistic shadows. Text must remain on the closest layer for clarity.
• Spatial Navigation: Create floating navigation panels that appear to exist in 3D space. Use subtle rotation effects (transform: rotateY(5deg);) on hover that immediately revert to avoid disorientation.
• Content Layering: Organize information in visual layers - background context, main content, and interactive elements - each with distinct z-index and visual treatment.
• Clarity Maintained: Despite 3D effects, all text must remain perfectly flat and high-contrast. 3D effects apply only to containers and backgrounds, never to readable content.
• Future-Ready Interactions: Design interactions that would naturally translate to AR/VR interfaces while working perfectly on current devices.

Output Mandate: Complete CSS with comments explaining 3D techniques and their purpose: /* Creates depth illusion without affecting readability */.
```

---

## 🔧 THEME 9: Data-Driven Modular System
**Branch:** `theme-modular-variables`
**Use:** `switch-theme modular-variables`

**Prompt to copy:**
```
Act as a Senior Frontend Architect designing a highly adaptable documentation system. Your task is to create a CSS stylesheet for [https://github.com/Deefunxion/draftV2/tree/theme-modular-variables] built entirely on CSS Custom Properties (Variables) and modular components, allowing for easy theming and future customization while maintaining excellent readability.

Core Architectural Directives:

• Global Design Tokens: Define all design decisions as CSS variables at :root: colors (--primary-color, --text-color, --background), fonts (--font-family-heading, --font-family-body), spacing (--space-unit), and layout (--content-width, --line-height-body).
• Component-Based Modularity: Structure CSS into clear component blocks (.chapter-header, .content-section, .navigation-menu). Each component should be self-contained and reusable across different page layouts.
• Theme Variations: Create different theme modes using CSS classes on <body> (e.g., .theme-high-contrast, .theme-large-text) that override the root variables for different user needs.
• Scalable Typography: Use CSS clamp() functions for all font sizes to ensure perfect scaling across devices while maintaining hierarchy.
• Maintainable Structure: Organize CSS in logical sections with clear commenting. The system should be easily modifiable by future developers.

Output Mandate: Provide variable-based CSS with example theme overrides:
/* EXAMPLE: High-Contrast Theme
   body.theme-high-contrast {
     --text-color: #000000;
     --background: #FFFFFF;
     --primary-color: #0000FF;
   }
*/
```

---

## 🌿 THEME 10: Sustainability-Focused Natural
**Branch:** `theme-eco-natural`
**Use:** `switch-theme eco-natural`

**Prompt to copy:**
```
Act as a Brand Designer for an environmentally conscious educational platform like Khan Academy or Coursera's sustainability courses. Generate a CSS stylesheet for [https://github.com/Deefunxion/draftV2/tree/theme-eco-natural] that visually communicates connection to nature, sustainability, and mindful learning while ensuring perfect readability and calm user experience.

Core Design Directives:

• Natural Color Palette: Implement earth-inspired colors: warm whites (#F9F7F4), sage greens (#8FB69B), warm grays (#6B6B6B), and deep forest (#2F4F2F) for text. Avoid synthetic or overly bright colors that feel artificial.
• Organic Typography & Layout: Use humanist fonts with natural, readable characteristics. Text should flow naturally with generous line spacing (line-height: 1.6) and comfortable paragraph spacing that encourages mindful reading.
• Sustainable Interactions: Minimal, purposeful animations that don't waste energy. Focus on subtle, meaningful feedback rather than flashy effects. All transitions should feel natural and calming.
• Biophilic Design Elements: Use CSS to create subtle patterns or textures that evoke natural materials (paper, wood grain) through subtle background patterns or organic shapes using CSS clip-path.
• Mindful Reading Experience: Design for focused, distraction-free learning with generous whitespace and calm, non-aggressive visual hierarchy.

Output Mandate: CSS with comments explaining the connection to natural design principles: /* Sage green promotes calm focus and learning */.
```

---

## 📰 THEME 11: Editorial Magazine Layout
**Branch:** `theme-editorial-magazine`
**Use:** `switch-theme editorial-magazine`

**Prompt to copy:**
```
Act as the Art Director of a prestigious educational magazine like Harvard Business Review or Scientific American. Generate a CSS stylesheet for [https://github.com/Deefunxion/draftV2/tree/theme-editorial-magazine] that transforms the documentation into an elegant, editorial layout that makes complex information feel accessible and engaging.

Core Directives:

• Sophisticated Typography: Use an elegant serif font (like Playfair Display or Georgia) for headings, paired with a highly readable sans-serif for body text. Implement a precise typographic scale that guides the reader through complex information.
• Editorial Grid System: Implement a sophisticated CSS Grid system that allows for dynamic, magazine-style layouts. Use asymmetrical layouts where appropriate, but maintain clear reading flows.
• Pull Quotes & Highlights: Style important concepts as elegant pull quotes or highlighted sections that break up long content and emphasize key learning points.
• Chapter & Section Design: Design chapter introductions like magazine feature articles, with impactful headings and elegant initial letter treatments using CSS ::first-letter pseudo-elements.
• Premium Reading Experience: Focus on creating a luxurious, thoughtful reading experience that makes educational content feel prestigious and important.

Output Mandate: Complete CSS with comments identifying different editorial design patterns: /* Magazine-style chapter introduction */, /* Pull quote for key concepts */.
```

---

## 🎯 THEME 12: Nielsen-Norman Clarity Focus
**Branch:** `theme-usability-clarity`
**Use:** `switch-theme usability-clarity`

**Prompt to copy:**
```
Act as a UX Designer following the principles of Jakob Nielsen and Don Norman. Your only goal is to refactor the CSS for the documentation website at [https://github.com/Deefunxion/draftV2/tree/theme-usability-clarity] to be maximally clear, intuitive, and friction-free for learning. Remove all ambiguity and unnecessary visual noise. Functionality and educational effectiveness are the only metrics of success.

Core Usability Directives:

• Eliminate Ambiguity: Every interactive element must look exactly like what it does. Navigation must be obviously clickable, current page clearly indicated. Use classic blue underlined links for maximum recognition.
• Radical Simplicity: Reduce visual elements to absolute minimum needed for clear information hierarchy. Remove any decoration that doesn't serve the learning process. Focus on typography and spacing as primary design tools.
• Obvious Navigation: Simple, always-visible navigation with clear labels. No hidden menus or fancy interactions that could confuse learners. Use familiar patterns that require zero learning curve.
• Legibility is Sacred: All text must be high-contrast and generously sized. All line lengths must be optimal for reading (45-75 characters). No exceptions for aesthetic reasons.
• Learning-Focused Layout: Design specifically for educational content consumption. Clear chapter progression, obvious reading flow, minimal cognitive load for navigation.

Output Mandate: Provide refactored CSS with comments justifying simplifications: /* REMOVED: Decorative animations - distracted from learning content */.
```

---

## 🛠️ Quick Commands Summary:

```bash
# View all available themes
git branch -a | findstr theme-

# Switch to any theme
switch-theme [theme-name]
# Examples:
switch-theme apple-luxury
switch-theme mobile-social
switch-theme 3d-futuristic

# Return to main
git checkout main

# Check current branch
git branch

# See what's changed
git status
```

## 📋 Workflow Checklist:

1. ✅ Pick a theme from the list above
2. ✅ Run: `switch-theme [theme-name]`
3. ✅ Copy the prompt for that theme
4. ✅ Replace [YOUR_SITE_URL] with your actual URL
5. ✅ Paste prompt into ChatGPT/Claude/etc.
6. ✅ Copy the AI's CSS output
7. ✅ Replace content in book-style.css
8. ✅ Commit: `git add . && git commit -m "Apply [theme] styling"`
9. ✅ Push: `git push`
10. ✅ Refresh browser to see changes!

## 🎨 Ready to experiment!
Each theme is completely isolated - experiment freely without breaking anything!
