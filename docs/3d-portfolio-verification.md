# Explorable 3D studio verification · 2026-10-29

## Content

- Used the résumé last modified on 2026-10-09, newer than the September PDFs. Reviewed the source DOCX directly and compared project metrics, paper titles, roles, and dates.
- Included seven research/engineering projects and two coauthored papers. Kept fitting RMSE, simulation results, fixed-scenario experiments, and physical/logic validation scopes explicit.
- Verified GitHub account `gitcaka` and four public demo/repository pairs. Captured real screenshots. Helmet Vision uses its public login screen because the demo dashboard lacks a map key. All four links are labeled as static demos.
- No original résumé file, phone number, date of birth, or political affiliation is included in public assets.

## Validation performed

- TypeScript check and Sites production build passed. Three.js, OrbitControls and the room builder are loaded asynchronously. The build reports a large-chunk notice for the 3D library.
- The homepage is a full-viewport, procedural 3D room with 11 mapped objects, physical paper/card pickup and restoration, camera approach for project objects, four camera presets, day/night lighting and skyline, labels and an object directory. The previous exhibit component was removed.
- Desktop browser checks at 1440 × 1000: direct paper raycast, drag-and-return without accidental selection, all 11 readers, four Web demo screenshots/links, all four camera presets, English labels, Esc/close, and directory focus restoration.
- Mobile Chromium emulation at 390 × 844: two-finger pinch without selection, touch directory and reader, vertically scrollable résumé without horizontal overflow, English directory and 844 × 390 landscape. This is browser touch emulation, not a physical-phone test.
- Local production Worker tested on port 3001: real WebGL rendering, résumé pickup, project detail native navigation and return to homepage, reduced-motion selection/return, and forced WebGL-unavailable fallback with accessible directory and latest résumé. Normal runtime checks reported no page errors; forced WebGL failure is intentional.
- Verified return-animation locking with a rapid second directory selection, then a successful later selection. Cancellation during pickup and cancellation before the first animation frame both leave the room usable.
- Chinese résumé printed from inside the room reader to two A4 pages. Both pages were rendered and visually inspected; heading styles no longer inherit the project reader's large display size.
- All original routes remain; internal navigation uses native anchors. No new backend or private résumé upload was added.

The validation scripts, screenshots and print PDF are retained in `../output/playwright/` outside the deployable project. Key artifacts: `room-production-final.png`, `room-production-night.png`, `room-mobile-final.png`, `room-mobile-resume.png`, and `room-resume-print.pdf`.

## Publication state

The existing Sites project `appgprj_6a9334d2beb08191aac9725a9dcf62c5` returned `NOT_FOUND` from both site lookup and source-repository credential creation. No production update was made. The source, dependencies, and build are ready for publication when access to the existing project is restored. The existing project ID and public audience have not been replaced.
