# eclass-enhance
This is a browser extension for eclass, which removes pop-ups and gives it a modern look. *subjective*
*For optimal results use Firefox :)*

##  ![](https://img.shields.io/badge/Firefox-70.0+-orange?style=flat-square) ![](https://img.shields.io/badge/Safari-14.0+-skyblue?style=flat-square) 


### Installation (pre-complied):

> Installation for firefox:
>
> Download the [eclass-enhance.xpi](https://github.com/Aayush9029/eclass-enhance/releases/download/1.1/eclass-enhance.xpi)
> Go to Settings > Add-ons > Install add-on from a file
> 
> Then select the eclass-enhance.xpi file :)
>


---
### Custom Installation: 
#### Firefox

1. Clone the repo `git clone https://github.com/Aayush9029/eclass-enhance.git`
2. In Firefox: Open the about:debugging page, click "This Firefox" (in newer versions of Firefox), click "Load Temporary Add-on", then select any file in your extension's directory.


#### Safari 
1. Installation for safari (requires Xcode)
2. Go to [Safari-Releases](https://github.com/Aayush9029/eclass-enhance/releases/tag/v0.5)
3.  Follow the instructions

---




### Build the extension on your own:

```bash
# Installing web-ext 
npm install --global web-ext

# Verifying the installation
web-ext --version

# Cloning the repo
git clone https://github.com/Aayush9029/eclass-enhance.git

# Change directory to the folder
cd eclass-enhance

# Runs the web-ext command (opens browser)
web-ext run

```



### To Do
- [x] add precompiled binary links
- [ ] complie for chromium / chrome.
- [ ] add settings page, disable / enable certain features.
- [x] make link hover more prominent
- [x] DARK MODE!!
- [x] add more visual enhancements
- [ ] add custom css injection feild
