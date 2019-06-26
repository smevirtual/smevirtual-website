## SME Virtual Network Website

[![Build Status](https://dev.azure.com/smevirtual/smevirtual-website/_apis/build/status/smevirtual.smevirtual-website?branchName=master)](https://dev.azure.com/smevirtual/smevirtual-website/_build/latest?definitionId=3&branchName=master)
<a href="https://github.com/smevirtual/smevirtual-website/blob/master/LICENSE">
<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="The SME Virtual Network website source is released under The MIT License." />
</a>

This repository contains the source code for the official homepage of the SME
Virtual Network found at [smevirtual.com](https://www.smevirtual.com).

The mission of the SME Virtual Network is to energize, mobilize and engage the
global engineering and manufacturing community by bringing together industry,
researchers, professionals and students to solve shared problems and
relentlessly work to shrink the [skills gap](https://www2.deloitte.com/us/en/pages/manufacturing/articles/boiling-point-the-skills-gap-in-us-manufacturing.html).

We embrace the accessibility and connectivity of the Internet to launch immersive
virtual events, unique learning experiences and always-on conversations. The SME
Virtual Network is completely volunteer-powered.

Read more about SME at [sme.org](http://www.sme.org/).

### Development Prerequisites

There are several prerequisites need to be installed on your development
machine prior to working with this codebase.

**Developers should use macOS or Linux to work with this codebase. Issues
encountered using Windows are not considered bugs at this time.**

1.  Install Node.js version 10.0 or greater.

    See [this page](https://nodejs.org/en/download/).

    For macOS development machines, installing Node.js with [Homebrew](https://brew.sh/)
    is recommended.

2.  Install Yarn.

    See [this page](https://yarnpkg.com/en/docs/install).

3.  Install Hugo.

    See [this page](https://gohugo.io/getting-started/quick-start/).

    For macOS development machines, installing Hugo with [Homebrew](https://brew.sh/)
    is recommended.

4.  Install Git Large File Storage

    Git Large File Storage (or Git LFS) allows large binary assets like media source files to be managed by Git.

    See [this page](https://git-lfs.github.com/) for installation instructions. If you are on macOS, installing via [Homebrew](https://brew.sh/) is recommended.

### Development Quick Start

For a freshly cloned repository, run:

```bash
yarn install
```

Once all of the above prerequisites are installed, the following commands are
now available:

| Command               | Description                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn run build:dev`  | Build project in development mode. Development mode artifacts that are generated are suitable for easier debugging.                                |
| `yarn run build:prod` | Build project in production mode.                                                                                                                  |
| `yarn run clean`      | Delete the `/dist` folder which holds the generated artifacts from the build process.                                                              |
| `yarn run serve:dev`  | Build project artifacts in development mode and run a development browser that will automatically refresh when source files are changed and saved. |
| `yarn run serve:prod` | Build project artifacts in production mode and launch a basic, local HTTP server without automatic reloading.                                      |

### Hosting Environment

This project is set up to deploy to [GitHub Pages](https://pages.github.com/).
However, there is no reason that this project cannot be deployed to
another hosting service of your choosing.

### Community Participation Guidelines

The SME Virtual Network is committed to providing a friendly, safe and welcoming
environment for all. Please take a moment to read our
<a href="https://github.com/smevirtual/community-guidelines/blob/master/README.md">Community Participation Guidelines</a>.

### Contributing

See the [Contributing Guidelines](.github/CONTRIBUTING.md) document.

### License

All of the code in this repository is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
A copy of this license is included in the root of this repository.

### SME Logos and Branding

While this project is permissively licensed, the [SME](http://www.sme.org/) logos
and brands which are part of this codebase are not. SME logo and brand usage
is only allowed by the SME and authorized parties connected to the SME (e.g.
like regional chapters).

If you fork this project for use by your own website or web application, you
must not use SME logos or brands inappropriately. Please see the
[SME Branding Guidelines](http://www.sme.org/sme-logo/) for when a SME logo
can be used and what conditions are attached to SME logos and brands.
