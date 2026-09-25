# Reactor - A Python TUI app to run bots locally for [Defector!](https://defector.hackclub.com)
 Reactor is a simple, easy to use app to test your Defector bots! 
 It helps to find bugs, download the source of other bots, and have your bot compete against the top bots on the leaderboard all without ever publishing your bot to the site!
 ## Installation
 Make sure you have python 3 installed, then  just run `py -m pip reactor_mindstormpro3` in your terminal!
  After installing, make sure you restart your terminal.  

 ## Usage
Run `reactor`, let it load for up to 15 seconds, and then the TUI (text-based user interface) should appear.
### The buttons
There are 3 main buttons in the app.
 * The `Run Reactor` button,
 * The `Select Bot` button,
 * And the `Refresh Bots` Button.

The `Run Reactor` button... well... runs the reactor! It takes all bots currently loaded, pairs them up against eachother and runs them, and then graphs the results in a table.
The `Select Bot` button allows you to select a bot in the current working directory or any subdirectories and load it, so it can be ran against the other loaded bots.
The `Refresh Bots` button fetches the latest bots from the leaderboard and loads them, so they can be ran. (you don't need to load your own local bot to run, you just need to refresh the bots so there is something to run in the first place)
