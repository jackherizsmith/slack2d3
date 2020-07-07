# slack2d3

An experiment in asking robots to represent emotions.

Using Dialogflow's Slack integration, Glitch as a temporary server and database, and d3 to interpret user data.

The database has three fields:
- Emotion - one of eight categories (not including 'other')
- Original emotion - the original word that was categorised
- Date and time it was expressed 
