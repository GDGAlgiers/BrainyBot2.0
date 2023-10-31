# Techpoint Commands

This section contains a set of commands specifically designed for Techpoint sessions. These commands assist in managing and documenting Techpoint sessions, enabling users to add notes, resources, and more.

## Table of Contents

- [note](#note)
- [off_note](#off_note)
- [off_res](#off_res)
- [res](#res)
- [techpoint](#techpoint)

---

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
