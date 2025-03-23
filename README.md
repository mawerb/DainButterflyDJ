# Getting Started

This DainAI tool allows users to be able to easily create songs based off prompts they provide to the agent.

## Installation
Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install DAIN CLI.

```bash
npm install -g @dainprotocol/cli
```

## Setup
Once you have installed dependencies, from the src directory open three separate terminals and type the following commands in order:
```bash
git clone https://github.com/mawerb/DainButterflyDJ.git
```
Once in the project's directory
```bash
cd src
node server.js
```

```bash
cd src
nkrog http 3000
```
This will create a publicly accessible version of your localhost server. 
Copy the new URL route and DainAPI/SUNO key onto your .env by running the following code on your terminal 
```bash
export ROUTE=<NEW_ROUTE>
```
example for <NEW_ROUTE>: https://1dd2-134-139-201-5.ngrok-free.app
```bash
export DAIN_API_KEY=<DAIN_API_KEY>
```
```bash
export SONG_API_KEY=<SUNO_API_KEY>
```
Lastly, run the command and paste the link into Dain's Service URL input box
```bash
npm run dev
```



