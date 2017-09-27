# StarTrekAdventuresRoll20

A branch from the original Roll20 Community Sheet of Star Trek Adventures. This is a custom sheet that requires a Pro level account for script support and is not officially supported.

Star Trek Adventures &trade; & &copy; 2017 CBS Studios Inc. &copy; 2017 Paramount Pictures Corp. STAR TREK and related marks and logos are trademarks of CBS Studios Inc. All Rights Reserved.

## Installation Instructions (Roll20 Pro Required)
1. Create a game in Roll20, or bring up the Game Settings screen of an existing one.
2. Set the Character Sheet Template to Custom.
3. Copy the contents of sheet/sheet.html into the HTML Layout.
4. Copy the contents of sheet/sheet.css into the CSS Styling.
5. Go to the API Scripts screen for your game.
6. Copy the contents of scripts/momthreat.js into the New Script tab. Name it momthreat.js. Save the script.
7. Copy the contents of scripts/taskdice.js into the New Script tab. Name it taskdice.js. Save the script.
8. Copy the contents of scripts/chaldice.js into the New Script tab. Name it chaldice.js. Save the script.  
***The remainder of the instructions may be completed by any GM in the game.***
10. Generate a Momentum rollable table, filled with 7 icons (available under images/momentum). Order matters if you want the script to bark the right value.
11. Generate a Threat rollable table, filled with 21 icons (available under images/threat). Again, order matters if you want the script to bark the right value. **(This may expand, as I dont know the common levels of threat in the game yet)**

Start playing!

## FAQ
* *The fonts don't look right!*  
  You're using Chrome or Firefox and have not allowed "Unsafe" Scripts (Mixed HTTPS and HTTP content) on the page. Click the little shield icon in the address bar, and either "Disable Protection for now" (Firefox), or "Load unsafe scripts" (Chrome). You will have to do this every time you open roll20. Nothing I can do about it, problem's on Roll20's end.
  
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

* *How do I use the tokens?*  
  In roll20, go to your rollable tables, and click the "Token" option. Move/resize the token as you wish. Whenever you change one of the tokens (by right clicking it, choosing Multi-Value, and then Choose Side), all of the tokens of the same type will change. (Note: The script currently assumes that any multisided token that is not a Momentum token is a Threat token, and will change it accordingly.)
  

## CharInACan ***Optional***
There is an additional script, charinacan.js, in the scripts folder. This is (as the name implies) a Character In A Can roller, primarily intended for GM use to stir up random NPCs. It will generate a character for you, using the tables outlined in Chapter 5 of the Core Rulebook.

The command specification for CharInACan is:

```
!charinacan {["generation":<gen>][[,]"full":<full>][[,]"public":<public>]}

gen: The available races are defined by generation. Available values are "TNG","TOS", and "ENT". Defaults to "TNG". String.
full: If true, will generate a Gender (Male/Female) and Experience level (Young/Experienced/Veteran). Defaults to false. Boolean.
public: If true, will publish the result to all players. If false, will whisper. Defaults to false. Boolean.

ex:
!charinacan {} # Generates a TNG character with unspecified Gender or Experience, and whispers it to the person invoking the command.
!charinacan {"generation":"ENT","full":true,"public":true} # Generates an Enterprise era character, with a gender and Experience level, and publishes it to general chat.
```