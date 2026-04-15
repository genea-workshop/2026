
# Instructions for editing the website
You can edit the website in two ways: in your browser via Github codespaces, or locally.

## Local Development
**Install NVM (Node.js Version Manager):**
- **Windows:**  
  Download and run the [NVM for Windows installer](https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe).

- **macOS / Linux:**  
  Follow the instructions in the [official NVM repository](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

## Editing in the Browser 
Visit [this link](https://github.dev/genea-workshop/leaderboard/tree/test) to set up a Codespaces environment. This will give you access to a full-blown VS Code editor in your browser. Magic! 

**NOTE:** Please close the codespace site once you're done editing. There is an hour-based usage quota of 120 hours per month.

# Set Up Node.js and Install Dependencies
Regardless of whether you are developing locally or using Codespaces, you need to set up Node.js: 

```bash
nvm install 20.19.5
nvm use 20.19.5
npm install
```

# Launch Development Server
Start a development server with the following command:
```
npm run dev
```

You should see an output like
```
@nagyrajmund ➜ /workspaces/leaderboard (test) $ npm run dev

> genea-leaderboard@0.0.0 dev
> vite


  VITE v5.4.21  ready in 318 ms

  ➜  Local:   http://localhost:5173/leaderboard/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Click on the localhost link to view your local deployment of the website. (Yes, this works in Codespaces as well.)
Any code changes will automatically update the local website.

# Deploy Changes to the Live Website
Just commit and push your changes to the repository, and the website will be automatically updated by the configured Github Actions workflow.
