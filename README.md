# StarTrekAdventuresRoll20

A branch from the original Roll20 Community Sheet of Star Trek Adventures. This is a custom sheet and is not officially supported.

Star Trek Adventures &trade; & &copy; 2017 CBS Studios Inc. &copy; 2017 Paramount Pictures Corp. STAR TREK and related marks and logos are trademarks of CBS Studios Inc. All Rights Reserved.

## Installation Instructions (Roll20 Pro Required)
1. Create a game in Roll20, or bring up the Game Settings screen of an existing one.
2. Set the Character Sheet Template to Custom.
3. Copy the contents of sheet/sheet.html into the HTML Layout.
4. Copy the contents of sheet/sheet.css into the CSS Styling.
5. Go to the API Scripts screen for your game.
6. Copy the contents of momthreat.js into the New Script. Name it momthreat.js.
7. Copy the contents of taskdice.js into the New Script. Name it taskdice.js.
8. Copy the contents of chaldice.js into the New Script. Name it chaldice.js.
9. Create a character sheet in the game, with the name "GMSheet".
10. In that sheet, under "Attributes & Abilities", add an Attribute called "Momentum".
11. Add another Attribute to that sheet called "Threat". These are used for storage by the global token system.

Start playing!

## FAQ
* *The fonts don't look right!*
  You're using Chrome or Firefox and have not allowed "Unsafe" Scripts (Mixed HTTPS and HTTP content) on the page. Click the little shield icon at the right end of the address bar.
  
* *I want to roll something without using the sheet. How do?*
  The command specifications for Challenge Rolls are:
  ```
  !chaldice {["dice":<dice>]}
  
  dice: Number of dice to throw. Positive Integer. Defaults to 2.
  ex: 
  !chaldice {} #Rolls 2 dice in a Challenge Roll.
  !chaldice {"dice":5} #Rolls 5 dice in a Challenge Roll.
  ```
  and Task Rolls are:
  ```
  !taskdice {"attr":<attr>,"attrv":<attrv>,"disc":<disc>,"discv":<discv>[,"dice":<dice>][,"cr":<cr>][,"focus":<focus>][,"diff":<diff>]}
  
  attr: Name of the attribute used in the roll. String.
  attrv: Value of the attribute used in the roll. Integer.
  disc: Name of the Discipline used in the roll. String.
  discv: Value of the attribute used in the roll. Integer.
  dice: Number of dice to throw. Positive Integer. Defaults to 2.
  cr: Lower bound of the Complication Range. Integer. Defaults to 20.
  focus: Whether or not Focus has been applied to the roll. Boolean. Defaults to False.
  diff: The Difficulty rating of the challenge. Integer. Defaults to 1.
  
  ex:
  !taskdice {"attr":"Command","attrv":2,"disc":"Conn","discv":6} #Rolls 2 dice in a Task Roll, with no focus, a difficulty of 1, complication range 20-20, and a target number of 8 (attrv+discv).
  !taskdice {"attr":"Fitness","attrv":5,"disc":"Medicine","discv":6,"focus":true,"cr":17,"diff":2,"dice":4} #Rolls 4 dice in a Task Roll, with focus applied, a difficulty of 2, complication range 17-20, and a target number of 11.
  ```
