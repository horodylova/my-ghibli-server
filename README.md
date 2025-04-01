## Ghibli-Style Image Generator ##

A web application for generating Studio Ghibli-style images using the OpenAI API. Users can enter a text description of a scene, and the application will create a corresponding image in Hayao Miyazaki's anime style.
Technology Stack

**Backend**: Node.js + Express
**API**: OpenAI API for image generation

Project Structure

```
Copyghibli-image-generator/
│
├── config/                # Configuration files
│   └── openai.js          # OpenAI API settings
│
├── controllers/           # Controllers
│   └── imageController.js # Image generation request handler
│
├── public/                # Static files
│   └── index.html         # Main application page
│
├── routes/                # API routes
│   └── api.js             # API route definitions
│
├── utils/                 # Helper functions
│
├── views/                 # View templates (if used)
│
├── .env                   # Environment variables (not included in repository)
├── .gitignore             # Files excluded from Git
├── server.js              # Main server file
└── package.json           # Project dependencies
```

**Installation**

Clone the repository:

bashCopygit clone https://github.com/yourusername/ghibli-image-generator.git
cd ghibli-image-generator

Install dependencies:

bashCopynpm install

Create a .env file and add the necessary environment variables:

CopyPORT=3000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key
Running the Project
To run in development mode:

```
bashCopynode server.js
```

After successful startup, the server will be available at: http://localhost:3000

**API Endpoints**

```
GET /api/status
```
Check API status.

Example response:

```
jsonCopy{
  "status": "ok",
  "message": "API is working correctly",
  "version": "1.0.0"
}
```

POST /api/generate-image

**Generates an image based on a text description.***
Request body:
jsonCopy{
  "prompt": "A girl in a red dress standing in a field of flowers, with mountains and a flying castle on the horizon"
}
```

Example response:

```
jsonCopy{
  "success": true,
  "imageUrl": "https://example.com/generated-image.png"
}
```

**Setting up OpenAI API**

Register at OpenAI and get an API key.
Add the key to your .env file:

CopyOPENAI_API_KEY=your_api_key_here
 
**Author**
Author
Svitlana Horodylova - [[My LinkedIn](https://www.linkedin.com/in/svitlana-horodylova/)]
