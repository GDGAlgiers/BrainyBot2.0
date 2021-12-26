[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/GDGAlgiers/BrainyBot">
    <img src="images/Brainy.jpg" alt="Brainy" width="280" height="280" >
  </a>

  <h3 align="center">Brainy Bot</h3>

  <p align="center">
The Repository for Brainy Bot made with Discord Py
    <br />
    <br />
    <a href="https://github.com/GDGAlgiers/BrainyBot">View Demo</a>
    ·
    <a href="https://github.com/GDGAlgiers/BrainyBot/issues">Report Bug</a>
    ·
    <a href="https://github.com/GDGAlgiers/BrainyBot/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Brainy is a free, open source multipurpose discord bot made by Python it lives in Our GDG Algiers Server. Brainy offers many cool features. 


### Built With

* [Python](https://www.python.org/)
* [DiscordPy ](https://discordpy.readthedocs.io/en/stable/)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Befor you begin you need to install python and configure A virtual environment if you are in **Windows** you can just use `Conda` 
* Python [Ubuntu]
  ```sh
  $ sudo apt-get install python3 python3-pip
  ```
* VirtualEnv 
  ```sh
  $ pip install virtualenv
  ```

### Installation

1. Clone the repo and cd to it
   ```sh
    $ git clone https://github.com/GDGAlgiers/BrainyBot.git 
    $ cd BrainyBot
   ```
2. Create VirtualEnv & Activate environment
   ```sh
    $ virtualenv env 
    $ source env/bin/activate
   ```
3. Install Requirements
   ```sh
    $ pip install -r requirements
   ```

<!-- USAGE EXAMPLES -->
## Usage

1. First you have to create a discord application and get an Application token check out the [documentation](https://discord.com/developers/docs/intro)
2. Set your application token in the configuration files  
3. Running The bot
   ```sh
    $ python bot.py 
   ```



<!-- PROJECT STRUCTURE -->
## Project-Structure
The project is split into multiple categories `cogs` where each category will hold a set of commands here are the current structure :
Karma has a lot of features, with **5 main categories**:


*   👩‍💼 **General**: `serverinfo`, `ping`, `server` and **1** more! 
*   🤖 **Mod**: `announce` 
*   👻 **Fun**: `tweet`, `advice`
*   ✉️ **Help**: `help`
*   👑 **Owner**: `shutdown`, `say`, `embed`


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

GDG Algiers - [@gdg_algiers](https://twitter.com/gdg_algiers) - gdg.algiers@esi.dz

Project Link: [https://github.com/GDGAlgiers/BrainyBot](https://github.com/GDGAlgiers/BrainyBot)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/GDGAlgiers/BrainyBot.svg?style=for-the-badge
[contributors-url]: https://github.com/GDGAlgiers/BrainyBot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GDGAlgiers/BrainyBot.svg?style=for-the-badge
[forks-url]: https://github.com/GDGAlgiers/BrainyBot/network/members
[stars-shield]: https://img.shields.io/github/stars/GDGAlgiers/BrainyBot.svg?style=for-the-badge
[stars-url]: https://github.com/GDGAlgiers/BrainyBot/stargazers
[issues-shield]: https://img.shields.io/github/issues/GDGAlgiers/BrainyBot.svg?style=for-the-badge
[issues-url]: https://github.com/GDGAlgiers/BrainyBot/issues
[license-shield]: https://img.shields.io/github/license/GDGAlgiers/BrainyBot.svg?style=for-the-badge
[license-url]: https://github.com/GDGAlgiers/BrainyBot/blob/master/LICENSE.txt
