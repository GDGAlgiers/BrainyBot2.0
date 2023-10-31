# Owner Commands

This section contains a set of commands exclusively available to the owners or administrators of the Discord bot. These commands provide powerful tools for managing and controlling the bot's behavior.

## Table of Contents

- [embed](#embed)
- [say](#say)
- [shutdown](#shutdown)

---

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
