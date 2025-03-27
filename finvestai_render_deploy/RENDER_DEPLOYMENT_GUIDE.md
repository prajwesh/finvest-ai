# Render Deployment Guide for FinvestAI

This guide provides step-by-step instructions for deploying this application on Render.com without errors.

## Deployment Steps

### 1. Create a New Web Service

- Log in to your Render account
- Click "New +" and select "Web Service"

### 2. Configure the Web Service

- **Name**: Choose a name (e.g., "finvestai")
- **Select your deployment method**: 
  - Choose "Upload" and upload this zip file
  - OR connect to your GitHub repository if you pushed this code there

### 3. Set Build and Start Commands

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Runtime Environment**: Node

### 4. Add Environment Variables

- Click "Environment" tab or scroll down to "Environment Variables" section
- Add the following:
  - Key: `GEMINI_API_KEY`
  - Value: (Your Google Gemini API key)
- Add the following:
  - Key: `NODE_ENV`
  - Value: `production`

### 5. Deploy!

- Click "Create Web Service"
- Wait for the build to complete

## Troubleshooting

If you encounter any deployment issues:

1. **Check the Logs**: Click on "Logs" in the Render dashboard to see detailed error information
2. **Verify Environment Variables**: Make sure your API key is correctly set
3. **Check Build Output**: Review the build logs for any npm errors

## Important Notes

- This package uses a special structure with a root package.json and src directory to match exactly what Render expects
- DO NOT change the folder structure or file locations
- The application should build successfully and run without errors

## After Deployment

Once successfully deployed, your app will be accessible at `https://your-app-name.onrender.com`