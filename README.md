# Campusly Student Portal

A responsive, static student portal made with HTML, CSS, and vanilla JavaScript.

## Run locally
Open `index.html` in a browser. No build tools, server, or database are required.

## Publish with GitHub Pages
1. Create a GitHub repository and upload `index.html`, `style.css`, and `script.js` to the repository root.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. Wait for GitHub Pages to publish the site. Your URL will appear in the Pages settings.

## Demo data and limitations
The student name, ID, classes, grades, and announcements are sample content. Profile edits are saved only in the current browser using `localStorage`; they are not sent to a school system and will not sync across devices. Replace the sample content in `index.html` before using this as a real school portal. A static GitHub Pages site cannot provide secure authentication, shared student records, or private server-side data.
