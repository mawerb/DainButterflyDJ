# Getting Started with DainAI

This DainAI tool allows users to easily create songs based on prompts they provide to the agent.

## Installation

1. **Install DAIN CLI** using the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):

    ```bash
    npm install -g @dainprotocol/cli
    ```

2. **Install ngrok**:
    - **macOS**: Use the package manager [brew](https://docs.brew.sh/Installation):

        ```bash
        brew install ngrok
        ```

    - **Windows**: Download the installer from [ngrok](https://ngrok.com/download) and follow the installation instructions.

## Setup

Once you have installed the dependencies, follow these steps:

### 1. Clone the repository:
    git clone https://github.com/mawerb/DainButterflyDJ.git
    npm ci

### 2. Navigate to the `src` directory:
    cd src

### 3. Start the server by running:
    node server.js

### 4. Run **ngrok** to expose your local server:

- **macOS**: In a separate terminal window, run **ngrok** in the `src` directory:

    ```bash
    ngrok http 3000
    ```

- **Windows**: In a separate terminal window, run **ngrok** in the `src` directory:

    ```powershell
    ngrok http 3000
    ```

This will generate a publicly accessible URL. Copy this URL.

### 5. Set environment variables:

- **macOS**: Run the following commands in your terminal:

    ```bash
    export ROUTE=<NEW_ROUTE>
    export DAIN_API_KEY=<DAIN_API_KEY>
    export SONG_API_KEY=<SUNO_API_KEY>
    ```

    Replace `<NEW_ROUTE>`, `<DAIN_API_KEY>`, and `<SUNO_API_KEY>` with the appropriate values.

- **Windows**: Run the following commands in PowerShell:

    ```powershell
    $env:ROUTE="<NEW_ROUTE>"
    $env:DAIN_API_KEY="<DAIN_API_KEY>"
    $env:SONG_API_KEY="<SUNO_API_KEY>"
    ```

    Replace `<NEW_ROUTE>`, `<DAIN_API_KEY>`, and `<SUNO_API_KEY>` with the appropriate values.

### 6. Start the development server:
    npm run dev
    
### 7. Paste the URL you copied earlier into Dain's Service URL input box and get creative with your song prompts!
