# FinvestAI - Financial Assistant for Indian Investors

FinvestAI is a GenAI-powered financial assistant that helps Indian investors increase financial literacy and discover suitable investment products.

## Features

- AI-powered financial assistant using Google's Gemini API
- Interactive SIP and lumpsum investment calculator
- Curated learning resources for financial education
- Investment product discovery and comparison
- Glossary of financial terms for beginners

## Deployment Instructions for Render

### Prerequisites

- A Render account (https://render.com)
- A Google Gemini API key (https://ai.google.dev/)

### Step 1: Set Up Environment Variables

When deploying on Render, you'll need to set the following environment variables:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `NODE_ENV`: Set to `production`
- `PORT`: Render will set this automatically

### Step 2: Deploy on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 20 or higher
4. Add the environment variables mentioned above
5. Deploy the application

### Step 3: Verify Deployment

Once deployed, you can access your application at the URL provided by Render. The application should be fully functional with all features working correctly.

## Local Development

To run the application locally:

1. Clone the repository
2. Copy `.env.example` to `.env` and add your Gemini API key
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## Tech Stack

- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: Express, Node.js
- **AI**: Google Gemini API
- **Data Storage**: In-memory storage (for prototype)

## License

MIT