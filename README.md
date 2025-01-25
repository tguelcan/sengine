
[Live Demo](https://sengine-tau.vercel.app)

# AI Search Application

## Description

This is an AI-powered search application built with **Svelte** and the **Vercel AI SDK**, providing an efficient and customizable search experience. It uses **Tavily**, a powerful tool built for integrating Vercel AI SDK functionality, and is configured to work with **Claude** as the default AI model. The application is flexible and can also support other AI models with minimal adjustments.

This project delivers a fast, intelligent, and modern AI search solution that can be deployed on Vercel, leveraging scalable and serverless capabilities to handle various use cases.

---
![screenshot](static/screenshot1.png)
![screenshot](static/screenshot2.png)

## Tech Stack

### **Core Technologies**

1. **[Svelte](https://svelte.dev/):** A highly reactive and lightweight JavaScript framework, enabling faster development and reactivity.
2. **[Vercel AI SDK](https://vercel.com):** Used to integrate AI-based functionalities seamlessly into the application.
3. **[Tavily](https://www.npmjs.com/package/@tavily/core):** Search engine api.
4. **[DaisyUI](https://daisyui.com):** CSS component library for Tailwind CSS
### **AI Models**

- **Deepseek**: The default AI model used for the search functionality.
- **Claude**: Another example model which is included
- **Extensible with Other Models**: The AI integration is not limited to Claude; other models can be configured as per the requirements.

---

## Features

- **Powerful AI Search**: Delivers intelligent, precise, and quick search capabilities.
- **Extensibility**: Switch from Claude to other AI models based on project requirements.
- **Modern Tech Stack**: Built using Svelte and optimized for Vercel deployments.
- **Serverless Scalability**: Deployed on Vercel for fast, serverless infrastructure handling.

---

## Prerequisites

Before setting up the project, ensure the following requirements are met:

1. **Node.js** is installed on your system. (Recommended: Latest LTS version)
2. A [Vercel account](https://vercel.com/) is ready for deployment. You can also use another deploment methods.
3. An **API key** for accessing the **Tavily AI SDK** and a API Key for your AI Model.
4. If you want to work with credits, set up a redis database

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tguelcan/sengine
cd ai-search-app
```

### 2. Install Dependencies

After navigating to the project directory, install the required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Duplicate the `.env.example` file and rename it to `.env`. Then configure your environment variables:

```bash
# Required API Key for Tavily
TVLY_API_KEY=<your-tavily-api-key>

# REDIS_URL is required for credit use if desired.
KV_URL=<your-redis-db-url>

# - AI MODELS
ANTHROPIC_API_KEY=<your-anthropic-key>
# OR
DEEPSEEK_API_KEY=<your-deepseek-key>
# OR other like openai...
```

Make sure to replace `<your-tavily-api-key>` with your actual Tavily API key. Additional variables, if needed, are listed in the `.env.example` file.

---

## Getting Started

Start the development server locally:

```bash
npm run dev
```

The application will be available at: http://localhost:5173

---

## Building for Production

To create a production-ready build of your application:

```bash
npm run build
```

You can preview the production build using:

```bash
npm run preview
```

---

## Environment Variables

The application uses environment variables to manage API keys and other sensitive information. Below is the required variable:

- `TVLY_API_KEY`: API key for accessing Tavily and the Vercel AI SDK.

Ensure all required variables are properly configured in the `.env` file before running or deploying the application.

---

## Extending AI Models

Although Claude is the default model, this project supports other AI models via the Vercel AI SDK. To switch or add models, extend the integration in the `src/lib` files as needed.

---

## Contributing

Contributions to the project are welcome! To contribute:

1. **Fork the Repository** on GitHub.
2. Create a feature branch:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. Commit your changes and push to the branch.
4. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

For any issues or inquiries, feel free to open an [issue](https://github.com/tguelcan/sengine/issues) or contact the repository owner directly.
