# Udacity memory game

This game was developed during the front-end web development nanodegree of Udacity. It is a final project to complete the nanodegree program.

## Used technologies

Technology        | Description
---               | ---
Git               | [Version control system.](https://git-scm.com/)
CSS3              | Cascade style sheet.
HTML5             | Hypertext markup language.
Javascript (ES6)  | Javascript (ES6).

## Logic of the game

- **index.html** is the main file of the project. It is a Graphical User Interface (GUI).

- Click on **index.html** file twice. When the web page loads, a modal appears immediately.

- Press **Star the game!** button;

- Now, the Timer will run; your stars in the Star rating will be in risk; and the Move counter will be prepared to you.

- Click on any card;

- The content of the clicked card will appear. And, the game must keep it.

- Click on another card;

- The content of the clicked card will appear too. And, the game must keep it for one second.

- The restart button will be disabled during the match verification. (This action solved a problem identified during the version two development.)

- The game must not allow clicking any card until the end of the match verification.

- The game will check the clicked cards.

- If the clicked cards contains the same figure:

- You will have played the game. Go ahead! The matched cards will leave the game. No click on them must have effects.

- If the clicked cards won't contains the same figure:

- The clicked cards will return to the starting position: their contents will be hidden after one second.

- When you get to combine all cards' figure: You will win the game!

- You can restart the game at any time. When you restart it, the Timer, Star rating and Move counter come back to initial state.

## Executing the code

This game was executed in the chrome web browser. And, on the emulators for mobile devices along the chrome browser.

## Validation

### Markup Validation Service from W3C

The code of this project was verified by Markup Validation Service from W3C.

#### HTML Validation Service from W3C

*Version 1 and 2.*
- No error was found.
- Three warnings about html section without headings.

*Version 3.*
- No error was found.
- Eight warnings about html section without headings.

#### CSS Validation Service from W3C

*Version 1 and 2.*
- No error messages were displayed.

*Version 3.*
- No error messages were displayed.

## Developer

-  Willian Coelho da Cunha

## Review and version

*Version 1. Review in September, 2018.*

*Version 2. Review in December, 2018.*

*Version 3. Review in April and in May, 2020.*

- Remove Bootstrap of this project.
- Remove Jquery of this project.
- Remove Google fonts of this project.
- Improve Javascript scripts, template HTML and CSS styles.
- Applay Block Element Modifier (BEM) methodology.
