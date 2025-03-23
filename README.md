# Getting Started with DainAI

This DainAI tool allows users to easily create songs based on prompts they provide to the agent.

## Installation

1. **Install DAIN CLI** using the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):

    ```bash
    npm install -g @dainprotocol/cli
    ```

2. **Install ngrok** using the package manager [brew](https://docs.brew.sh/Installation):

    ```bash
    brew install ngrok
    ```

## Setup

Once you have installed the dependencies, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/mawerb/DainButterflyDJ.git
    ```

2. Navigate to the `src` directory:

    ```bash
    cd src
    ```

3. **Start the server** by running:

    ```bash
    node server.js
    ```

4. In a separate terminal window, run **ngrok** in the `src` directory to expose your local server:

    ```bash
    ngrok http 3000
    ```

    This will generate a publicly accessible URL. Copy this URL.

5. **Set environment variables** by adding the following in your terminal:

    ```bash
    export ROUTE=<NEW_ROUTE>
    export DAIN_API_KEY=<DAIN_API_KEY>
    export SONG_API_KEY=<SUNO_API_KEY>
    ```

    Replace `<NEW_ROUTE>`, `<DAIN_API_KEY>`, and `<SUNO_API_KEY>` with the appropriate values.

6. Lastly, start the development server:

    ```bash
    npm run dev
    ```

    Paste the URL you copied earlier into Dain's Service URL input box and get creative with your song prompts!
