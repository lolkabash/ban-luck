# Developing a classic Chinese New Year pastime - Ban Luck

## Project Brief

**MVP - Minimum Viable Product**
- Built with HTML, CSS and JavaScript
- Use Javascript for DOM manipulation
- Hosted on Github pages
- Commits to Github at least twice a day
- A README.md file with explanations of the game rules, a link to the live site, possible further implementations, etc.
- Be displayed in the browser
- Have some kind of user interaction via mouseclick

## Timeframe
1 week

## Technologies & Tools Used
- HTML
- CSS
- JavaScript
- Git & GitHub

## Description
Ever wanted to experience the thrill of your favourite CNY pastime anytime, anywhere? Now you can with this browser version of Ban Luck, or more formally known as "Chinese Blackjack"! The game was designed and implemented using HTML, CSS and JavaScript while attending the Software Engineering Immersive course at General Assembly.

I chose to recreate this game as although the premise of the game is inherently simple (i.e. getting your cards' points as close to 21 as possible without going over), there are actually so many different variations of it! The version of the game that I have implemented is based on the version that I play with my group of friends during our CNY gatherings each year. Therefore, you can view this game as a memory in a Pensieve, a small part of my life.

Enjoy :)

## Game Origin
Ban Luck was created as an alternative to the standard Casino Blackjack. It is played largely in South East Asia, especially during CNY as it is believed that the new year brings in fresh new luck.

Ban Luck makes the game of Blackjack to be easily played amongst friends, and also allows for various house rules to be created so every gathering of friends to play Ban Luck might just be that slight bit different!

## Deployment
The game is deployed on GitHub pages, and you can play the game here:
https://kenjiong.github.io/ban-luck/

## How to Play
### Start Screen

<img width="493" alt="Screenshot 2023-08-30 at 10 46 33 PM" src="https://github.com/kenjiong/ban-luck/assets/129886906/e74fe71f-a678-4818-b352-730476a14f6c">

At the start, the player is given a balance of $1,000, and it is up to the player how much of the $1,000 he/she wishes to bet. The bet must be a whole number between 1 and the player's balance, and trying to enter a number which is more than the player balance or an invalid input (e.g. 0, a negative number or something else other than a whole number) will trigger the relevant error messages.

The game rules are also available for reading by players who may be unfamiliar with Ban Luck. By clicking the "How to Play" button, the player can get a rough idea of the winning combinations before diving straight into the game. Once a valid bet is entered, the player can click the "Start Game" button to begin the round.

### Game Screen

<img width="384" alt="Screenshot 2023-08-30 at 10 57 01 PM" src="https://github.com/kenjiong/ban-luck/assets/129886906/4711feab-36ab-434b-a986-43ab2c54d11d">

After starting the game, the player is met with the Game Screen where both the dealer's hands and their hands are displayed. If the instant winning combinations are fulfilled, the round ends immediately with the relevant result displayed. If not, the player will see both his cards and one of the dealer's cards. The other dealer card is hidden until the round is over to keep the player guessing the dealer's hand value.

Below the player's hand, there are 3 buttons for the player to click. These are "Hit", "Stand" and "Run" respectively.

The "Hit" button draws another random card for the player. However, the button will be disabled once the player's hand value exceeds 21, or if the player has already drawn 5 cards.

The "Stand" button maintains the player's current hand. However, the button will be disabled if the player's hand value is less than 16, as 16 is the minimum required value for the player to participate.

The "Run" button allows the player to end the round without participating, keeping his/her bet and maintaining his/her balance in the process. The button only activates when the player's starting hand value is exactly 15.

### Result Displayed

<img width="402" alt="Screenshot 2023-08-30 at 11 12 46 PM" src="https://github.com/kenjiong/ban-luck/assets/129886906/ae41052e-2f8a-4b6d-9aba-bf560c73813f">

Once the round is over, the dealer's hidden card is then revealed and hand values are then compared. The result is then displayed below (whether a win, loss or draw for the player) and how much the player has lost or won. The player's balance is then updated accordingly.

The two buttons below the result are "Continue" and "Exit" respectively. For the "Continue" button, the player retains his new balance and returns to the Start Screen with the new balance. The player can then make a new bet and start another round of Ban Luck.

If the player chooses the "Exit" button, the game is essentially reset and the player returns to the Start Screen with a fresh new balance of $1,000 for him/her to ~~squander away~~ gamble to his/her heart's content!

### Game Rules

Both the player and the dealer aspire to get the value of their cards as close to 21 as possible. Getting the enigmatic value of 21 is colloquailly known as "Blackjack". Going over 21 however, is known as a "bust" and players would have no chance of winning then. Players start with 2 cards each, and can draw up to a maximum of 5 cards each.

For the value of the cards, cards 2 - 10 hold their respective face values, whereas the picture cards (J, Q, K) each have a value of 10. The special Ace however, can have a value of 1 or 11 depending on the circumstances. Primarily, the Ace holds a value of 11, but if the total hand value exceeds 21 when Ace is being valued at 11, the Ace then activates its amazing special powers to lower its value to 1, to help avoid the player busting.

If the player's initial hand has a value of exactly 15, the player can choose to "zao" or run in Hokkien and not participate in the round. However, if the player's hand value is less than 16, the player is then forced to draw cards until the value is greater than 16. As for the dealer, he/she is unable to "run" even if the initial hand value is 15, given the advantage the dealer has in multi-player Ban Luck games. The dealer is also subject to the minimum value of 16, and is also forced to draw cards until the value is greater than 16. For this game however, the dealer is programmed to continue drawing until a minimum value of 17 is reached.

The player will always go first followed by the dealer. Here are the various ways the game can end and how much the player will win or lose:

| Player Wins  | Player Loses | Draw |
| ------------ | ------------ | ---- |
| pValue <= 21 and pValue > dValue: Player wins 1x Bet Amt | dValue <= 21 and dValue > pValue: Player loses 1x Bet Amt | pValue = dValue and both values are <= 21: Draw |
| pValue <= 21 and dValue > 21: Player wins 1x Bet Amt | dValue <= 21 and pValue > 21: Player loses 1x Bet Amt | pValue > 21 and dValue > 21: Draw |
| **Ban Luck** (Ace + 10/J/Q/K): Player wins 2x Bet Amt | dealer gets Ban Luck: Player loses 2x Bet Amt | player and dealer both obtain Ban Luck or Ban Ban: Draw |
| **Wu Long (5-Dragon)** (pValue <= 21 and player has 5 cards): Player wins 2x Bet Amt | dealer gets 5-Dragon/player misses 5-Dragon (pValue > 21 after drawing 5th card): Player loses 2x Bet Amt |
| **Ban Ban** (Ace + Ace): Player wins 3x Bet Amt | dealer gets Ban Ban: Player loses 3x Bet Amt |
| **Triple Seven** (player gets 3 7s): Player wins 7x Bet Amt | dealer gets Triple Seven: Player loses 7x Bet Amt |

**pValue = player's hand value and dValue = dealer's hand value*

## Initial Wireframe

![Ban-Luck1](https://github.com/kenjiong/ban-luck/assets/129886906/10994a6d-5898-4f68-a577-a46cc43f8d9a)

![Ban-Luck2](https://github.com/kenjiong/ban-luck/assets/129886906/15abf8c2-8e98-4fd1-9ba1-110e37cf45e9)

The wireframe and initial game rules were sketched out on paper as shown above. I decided to change from having 3 screens to 2 as having the end screen will deny the player the opportunity to see the dealer's hand being revealed. The winning conditions listed are largely the same, with some minor modifications.

Overall, the wireframe was helpful in getting an idea of how the game is supposed to look like, and allowed me to work towards generating how I envisioned the outlook of the game to be.

## Future Developments/Improvements

- Beautifying the game with more CSS
- Implementing an Ace value of 10 for specific scenarios
- Implementing multi-player capabilities so that the dealer can really flex his/her advantage

##Summary

As this was my very first time creating a web browser game, I am extremely glad that I managed to produce a playable game. However, creating the game would not be possible without the help of my instructors, as well as various resources that can be found on the internet. The CSS card library actually provided a great foundation for me to start building my web browser game from, and from there it was really just about tweaking the code to generate my Ban Luck version's game-ending scenarios.

##References and Resources

As I am completely new to JavaScript, there were plenty of concepts for me to learn and get used to. I also had to confirm that my version of Ban Luck was not too divergent from the norm and to implement the various game-ending conditions.

[Seedly's Guide to Ban Luck](https://blog.seedly.sg/guide-to-winning-ban-luck-blackjack-this-chinese-new-year-cny)
[Chinese Blackjack - Wikipedia](https://en.wikipedia.org/wiki/Chinese_Blackjack)

[CSS Card Library - Amazing looking cards!](https://replit.com/@SEIStudent/How-to-Use-CSS-Card-Library#index.html)
[Blackjack Game built in a different style](https://github.com/ImKennyYip/black-jack)

