[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
   <a href="https://github.com/GDGAlgiers/BrainyBot2.0"><img src="images/brainy.PNG" height="auto" width="200" style="border-radius:50%"></a>
  <h3 align="center">BrainyBot 2.0</h3>

  <p align="center">
The Repository for BrainyBot 2.0 made with 
    <a href="https://discordjs.guide/">discord.js</a>
    <br />
    <br />
    <a href="https://github.com/GDGAlgiers/BrainyBot2.0">View Demo</a>
    ·
    <a href="https://github.com/GDGAlgiers/BrainyBot2.0/issues">Report Bug</a>
    ·
    <a href="https://github.com/GDGAlgiers/BrainyBot2.0/issues">Request Feature</a>
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
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <a href="#project-categories-structure">Project Categories Structure</a>
      <ul>
        <li><a href="#general">General</a></li>
        <li><a href="#mod">Mod</a></li>
        <li><a href="#fun">Fun</a></li>
        <li><a href="#help">Help</a></li>
        <li><a href="#owner">Owner</a></li>
        <li><a href="#techpoint">TechPoint</a></li>
      </ul>
    </li>
    <li><a href="#join-our-community">Join our community</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<a name="about-the-project"></a>

# About The Project

Brainybot 2.0 is a free, open source multipurpose discord bot made by J it lives in Our GDG Algiers Server. Brainy offers many cool features.

<a name="built-with"></a>

### Built With

- [node.js](https://nodejs.org/)
- [discord.js](https://discordjs.guide/)

<!-- GETTING STARTED -->

<a name="getting-started"></a>

# Getting Started

To get a local copy up and running follow these simple steps.

<a name="installation"></a>

### Installation

1. Clone the repo and cd to it

```sh
git clone https://github.com/GDGAlgiers/BrainyBot2.0.git
cd BrainyBot2.0
```

2. Install Requirements

```sh
npm install
```

<!-- USAGE EXAMPLES -->

<a name="usage"></a>

# Usage

1. First you have to create a discord application and get an Application token, client id and guild id, check out the [documentation](https://discordjs.guide/#before-you-begin)
2. Setup `config.json`

```sh
cp config.json.template config.json
```

3. Set your application token in the `config.json`
4. Running The bot

```sh
npm run start
```

Or Running in development mode

```sh
npm run dev
```

<!-- PROJECT CATEGORIES STRUCTURE -->

<a name="project-categories-structure"></a>

# Project Categories Structure

The project is split into multiple categories where each category will hold a set of commands here are the current structure with **6 main categories**:

<a name="general"></a>

<details>
  <summary>👩‍💼 General </summary>

`ping`, `poll`, `is_spot_open` and `open_spot`

# General Commands

This section contains a set of general commands that provide various functionalities in a Discord server. These commands serve different purposes, including checking the bot's ping, creating interactive polls, and managing the GDG Algiers spot.

## Table of Contents

- [ping](#ping)
- [poll](#poll)
- [is_spot_open](#is_spot_open)
- [open_spot](#open_spot)

---

<a name="ping"></a>

## ping

**Description:** Get the bot's ping.

**Usage:**

/ping

**Functionality:**
- Provides information about the bot's API latency and message latency, helping users determine the bot's responsiveness.

**Examples:**
1. `/ping`
   - This command retrieves and provides information about the bot's latency.

---

<a name="poll"></a>

## poll

**Description:** Create a poll where members can vote.

**Usage:**

/poll question="Your question" options="Option 1, Option 2, ..."

**Functionality:**
- Allows users to create polls with questions and multiple options, enabling members to vote and interact with the poll using buttons.

**Examples:**
1. `/poll question="What's your favorite color?" options="Red,Blue,Green"`
   - This command creates a poll with the question "What's your favorite color?" and options "Red," "Blue," and "Green."

---

<a name="is_spot_open"></a>

## is_spot_open

**Description:** Check if the GDG Algiers spot is open.

**Usage:**

/is_spot_open

**Functionality:**
- Provides information about the current status of the GDG Algiers spot, indicating whether it's open or closed.

**Examples:**
1. `/is_spot_open`
   - This command checks and provides the current status of the GDG Algiers spot.

---

<a name="open_spot"></a>

## open_spot

**Description:** Open or close the GDG Algiers spot.

**Usage:**

/open_spot

**Functionality:**
- Allows authorized users to toggle the status of the GDG Algiers spot between open and closed, with interactive buttons for easy control.

**Examples:**
1. `/open_spot`
   - This command allows authorized users to change the status of the GDG Algiers spot.

---

These general commands provide various functionalities in your Discord server, enhancing interaction and management.

---

</details>

<a name="mod"></a>

<details>
  <summary>🤖 Mod </summary>

`announce`

# Mods Commands

This section contains a set of commands specifically designed for moderators and administrators in your Discord server. These commands provide advanced functionality for managing and maintaining your server.

## Table of Contents

- [announce](#announce)

---

<a name="announce"></a>

## announce

**Description:** Announce a message in a specific channel.

**Usage:**

/announce channel_name:{channel_name}

**Parameters:**
- `channel_name` (required): Name of the channel where you want to make the announcement. (Available channel types: Text and News)

**Functionality:**
- Allows moderators and administrators to make announcements in a specific channel.
- Moderators can specify the target channel for the announcement.
- The announcement can include text content and images attached in a single message.
- Generates an embed with the attached image and the specified text.
- Sends the announcement to the specified channel with GDG Algiers branding.
- Notifies the user once the announcement is successful.

**Examples:**
1. `/announce channel_name:general`
   - This command announces a message in the "general" channel.

---

The "announce" command empowers moderators and administrators to efficiently make announcements in designated channels, enhancing server communication and information sharing.

---

</details>

<a name="fun"></a>

<details>
  <summary>👻 Fun </summary>

`tweet`, `dadjoke`, `photo`, `advice`, `bigtxt`

# Fun Commands

This section contains a set of fun commands that allow you to enjoy various activities with the bot. These commands are designed to add some entertainment and humor to your server.

## Table of Contents

- [tweet](#tweet)
- [dadjoke](#dadjoke)
- [photo](#photo)
- [advice](#advice)
- [bigtxt](#bigtxt)

---

<a name="tweet"></a>

## tweet

**Description:** You can tweet as someone else to troll others.

**Usage:**

/tweet account:{account} text:{text}


**Parameters:**
- `account` (required): Enter the tweeter user's account.
- `text` (required): The content of your tweet.

**Functionality:**
- Allows you to create a tweet with a specified Twitter account and text.
- Generates an image of the tweet using the provided information.
- Embeds the tweet image in a message and replies to the user.

**Examples:**
1. `/tweet account:Brainy text:This is a hilarious tweet!`
   - This command creates a tweet from the "Brainy" account with the text "This is a hilarious tweet!" and displays the tweet image.

---

<a name="dadjoke"></a>

## dadjoke

**Description:** Get a dad joke from a funny bot :)

**Usage:**

/dadjoke


**Functionality:**
- Retrieves a random dad joke from a collection of jokes.
- Creates a message embed with the dad joke and additional information.
- Replies to the user with the dad joke and bot information.

**Examples:**
1. `/dadjoke`
   - This command retrieves and provides a random dad joke from the bot.

---

<a name="photo"></a>

## photo

**Description:** Get a photo from pixels.com

**Usage:**

/photo [query:{search query}]


**Parameters:**
- `query` (optional): The search query (e.g., "nature," "ocean," "tigers," "pears," etc.). If not provided, the default query is "nature."

**Functionality:**
- Retrieves a photo from pixels.com based on the provided or default search query.
- Creates a message embed with the photo and additional information.
- Replies to the user with the photo and bot information.

**Examples:**
1. `/photo`
   - This command retrieves and provides a random photo from pixels.com with the default search query, "nature."

2. `/photo query:tigers`
   - This command retrieves and provides a random photo of tigers from pixels.com.

---

<a name="advice"></a>

## advice

**Description:** Get an advice from a wise bot :)

**Usage:**

/advice


**Functionality:**
- Generates a random piece of advice from the wise bot.
- Creates a message embed with the advice and additional information.
- Replies to the user with the advice and bot information.

**Examples:**
1. `/advice`
   - This command generates and provides a random piece of advice.

---

<a name="bigtxt"></a>

## bigtxt

**Description:** Write Big Text

**Usage:**

/bigtxt text:{text}


**Parameters:**
- `text` (required): The word or text you want to display in big text format.

**Functionality:**
- Converts the provided `text` into a big text format by replacing each character with a corresponding emoji.
- The big text is then displayed as reactions.

**Examples:**
1. `/bigtxt text: hello`
   - This command converts the word "hello" into big text format using emojis and displays it as reactions.

---

Feel free to explore and have fun with these commands. They are designed to add some entertainment to your server and provide a good laugh!

---

</details>

<a name="help"></a>

<details>
  <summary>✉️ Help </summary>

`help`

# Help Commands

This section contains a set of commands related to providing help and information to users in your Discord server. The "help" command is a key feature in this category, allowing users to access information about available commands.

## Table of Contents

- [help](#help)

---

<a name="help"></a>

## help

**Description:** Display a list of available commands for this user.

**Usage:**

/help

**Functionality:**
- Generates a list of available commands organized by categories.
- Displays standard commands from categories like "fun," "general," and more.
- Includes additional commands for users with specific roles, such as "Lead," "moderator," "Co-Manager," or "owner."

**Examples:**
1. `/help`
   - This command displays a list of available commands based on categories and user roles.

---

The "help" command provides a helpful overview of available commands, making it easier for users to discover and access the bot

---

</details>

<a name="owner"></a>

<details>
  <summary>👑 Owner </summary>

`embed`, `say`, `shutdown`

# Owner Commands

This section contains a set of commands exclusively available to the owners or administrators of the Discord bot. These commands provide powerful tools for managing and controlling the bot's behavior.

## Table of Contents

- [embed](#embed)
- [say](#say)
- [shutdown](#shutdown)

---

<a name="embed"></a>

## embed

**Description:** The bot will say anything you want, but within embeds.

**Usage:**

/embed args:{text}

**Parameters:**
- `args` (required): The text you want the bot to say within an embed.

**Functionality:**
- Exclusive to bot owners, this command allows you to create an embed with the specified text content.
- The embed is displayed in the channel, with customization options such as color and title.
- Enhances the visual presentation of messages within the server.

**Examples:**
1. `/embed args:This is an important announcement!`
   - This command creates an embed with the text "This is an important announcement!" for the bot owners to share in the server.

---

<a name="say"></a>

## say

**Description:** The bot will say anything you want.

**Usage:**

/say args:{text}

**Parameters:**
- `args` (required): The text you want the bot to say.

**Functionality:**
- Reserved for bot owners, this command enables you to make the bot send a message with the specified text content.
- The bot repeats the provided text in the server channel.
- A useful tool for administrators to communicate important messages.

**Examples:**
1. `/say args:Hello, everyone!`
   - This command makes the bot say "Hello, everyone!" in the server channel for the bot owners.

---

<a name="shutdown"></a>

## shutdown

**Description:** Shutting down. Bye! :wave:

**Usage:**

/shutdown

**Functionality:**
- Exclusively available to bot owners, this command initiates the shutdown process for the bot.
- The bot replies with a farewell message and proceeds to shut down.
- An essential command for administrators to control the bot's operation.

**Examples:**
1. `/shutdown`
   - This command triggers the bot's shutdown process with a farewell message for the bot owners.

---

These owner commands provide powerful tools for the administrators or owners to manage the bot, send customized messages, and control the bot's operation within the server.

---

</details>

<a name="techpoint"></a>

<details>
  <summary>👨‍💻 TechPoint </summary>

`note`, `off_note`, `off_res`, `res` and `techpoint`

# Techpoint Commands

This section contains a set of commands specifically designed for Techpoint sessions. These commands assist in managing and documenting Techpoint sessions, enabling users to add notes, resources, and more.

## Table of Contents

- [note](#note)
- [off_note](#off_note)
- [off_res](#off_res)
- [res](#res)
- [techpoint](#techpoint)

---

<a name="note"></a>

## note

**Description:** Add a note

**Usage:**

/note note:{content}

**Parameters:**
- `note` (required): The content of the note you want to add.

**Functionality:**
- This command allows users to add notes to the current Techpoint session.
- A Techpoint session must be active for note-taking.
- The note is added to the session, helping users keep track of important information.

**Examples:**
1. `/note note:Remember to explore the new API feature.`
   - This command adds a note with the content "Remember to explore the new API feature" to the active Techpoint session.

---

<a name="off_note"></a>

## off_note

**Description:** Add an off note

**Usage:**

/off_note note:{content}

**Parameters:**
- `note` (required): The content of the off note you want to add.

**Functionality:**
- Users can add off notes to the current Techpoint session using this command.
- Similar to regular notes, off notes are used to document session-related information.
- An active Techpoint session is required for off note-taking.

**Examples:**
1. `/off_note note:Discuss the upcoming project deadline.`
   - This command adds an off note with the content "Discuss the upcoming project deadline" to the active Techpoint session.

---

<a name="off_res"></a>

## off_res

**Description:** Add an off resource

**Usage:**

/off_res link:<link> description:{description}

**Parameters:**
- `link` (required): The link to the resource you want to add.
- `description` (required): A description of the resource.

**Functionality:**
- Users can add off resources to the current Techpoint session with this command.
- Off resources may include links and descriptions related to session topics.
- An active Techpoint session is necessary for off resource sharing.

**Examples:**
1. `/off_res link:https://example.com/whitepaper description:Read the whitepaper for more details.`
   - This command adds an off resource with the link "https://example.com/whitepaper" and the description "Read the whitepaper for more details" to the active Techpoint session.

---

<a name="res"></a>

## res

**Description:** Add a resource.

**Usage:**

/res link:<link> description:{description}

**Parameters:**
- `link` (required): The link to the resource you want to add.
- `description` (required): A description of the resource.

**Functionality:**
- This command allows users to add resources to the current Techpoint session.
- Resources may include links and descriptions related to session topics.
- An active Techpoint session is required for resource sharing.

**Examples:**
1. `/res link:https://example.com/tutorial description:Check out the tutorial for in-depth guidance.`
   - This command adds a resource with the link "https://example.com/tutorial" and the description "Check out the tutorial for in-depth guidance" to the active Techpoint session.

---

<a name="techpoint"></a>

## techpoint

**Description:** Launch the session.

**Usage:**

/techpoint session_title:{title}

**Parameters:**
- `session_title` (required): The title of the Techpoint session.

**Functionality:**
- This command is used to initiate a Techpoint session.
- Only members with the "moderator" role can launch a Techpoint session.
- Upon launching, the session title is set, and an initial message is sent to the designated channel.

**Examples:**
1. `/techpoint session_title:Advanced JavaScript Concepts`
   - This command initiates a Techpoint session with the title "Advanced JavaScript Concepts."

---

These Techpoint commands are specifically designed for Techpoint sessions, allowing users to take notes, share resources, and manage session-related information effectively.

---

</details>

<a name="join-our-community"></a>

<!-- JOIN OUR COMMUNITY -->

# Join our community

Join us in the [GDG Algiers' Community Discord](https://discord.com/invite/7EvsP7eemQ) and post your question there.

<!-- CONTRIBUTING -->

<a name="contributing"></a>

# Contribution Guidelines

Thank you for considering contributing to the BrainyBot 2.0 project. We welcome contributions from the community to make this project even better. Please take a moment to review our `CONTRIBUTION.md` file where the Contribution Guidelines are listed there.

# License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

<a name="contact"></a>

# Contact

GDG Algiers - [@gdg_algiers](https://twitter.com/gdg_algiers) - gdg.algiers@esi.dz

Project Link: [https://github.com/GDGAlgiers/BrainyBot2.0](https://github.com/GDGAlgiers/BrainyBot2.0)

<br />

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/GDGAlgiers/BrainyBot2.0.svg?style=for-the-badge
[contributors-url]: https://github.com/GDGAlgiers/BrainyBot2.0/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GDGAlgiers/BrainyBot2.0.svg?style=for-the-badge
[forks-url]: https://github.com/GDGAlgiers/BrainyBot2.0/network/members
[stars-shield]: https://img.shields.io/github/stars/GDGAlgiers/BrainyBot2.0.svg?style=for-the-badge
[stars-url]: https://github.com/GDGAlgiers/BrainyBot2.0/stargazers
[issues-shield]: https://img.shields.io/github/issues2.0/GDGAlgiers/BrainyBot2.0.svg?style=for-the-badge
[issues-url]: https://github.com/GDGAlgiers/BrainyBot2.0/issues
[license-shield]: https://img.shields.io/github/license/GDGAlgiers/BrainyBot2.0.svg?style=for-the-badge
[license-url]: https://github.com/GDGAlgiers/BrainyBot2.0/blob/master/LICENSE.txt
