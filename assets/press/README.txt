Full-resolution, downloadable assets. These are what press, content creators, and
collaborators will pull from the press kit.

Naming convention:
  screenshot-NN-name-1920x1080.png    Game screenshot, 1920×1080 PNG
  regulars-logo-transparent.png       Wordmark, transparent
  regulars-logo-dark.png              Wordmark composited on the brand dark background
  regulars-icon-transparent.png       Square icon, transparent
  regulars-keyart-1920x1080.png       Key art
  regulars-press-kit.zip              The full kit, all of the above bundled

Re-create the .zip whenever you update anything in this folder:
  cd Website/assets
  zip -r press/regulars-press-kit.zip press/ -x "press/regulars-press-kit.zip"
