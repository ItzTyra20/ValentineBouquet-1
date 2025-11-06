# Open project folder
cd /home/tyra/projects/ValentineBouquet-1

# Open VS Code terminal
code .

# Install dependencies (first time / after changes)
npm install

# Development testing (fast iteration)\
npm start
    Launches the app without packaging.
    Stop with Ctrl + C.
    Changes to HTML/CSS/JS/assets take effect after restart.

# Optional: auto-reload on changes
// package.json -> scripts
"start:watch": "nodemon --exec 'electron-forge start' ."
npm run start:watch

# Fix asset paths for packaged app

All images / gifs / icons must be in assets/.

In HTML, reference them like:
<img src="assets/bouquet.gif" alt="Bouquet">

# Prepare temp folder for packaging
sudo mkdir -p /home/codespace/tmp2
sudo chmod 777 /home/codespace/tmp2

# Build the .deb (packaged app)
npm run make
Creates the distributable in:
out/make/deb/x64/valentineflowers_1.0.0_amd64.deb

# Install the .deb
sudo apt install ./out/make/deb/x64/valentineflowers_1.0.0_amd64.deb

# Run the installed app
valentineflowers

# Optional: Forge config for including assets

In forge.config.js:
packagerConfig: {
  asar: true,
  extraResource: ['assets']   // ensures assets are included in .deb
},

# Notes / tips

Always keep assets in assets/ and fix paths in HTML/JS.

For testing changes, use npm start. Only build .deb when ready to test installed version.

If you add new images, rebuild .deb to include them.

