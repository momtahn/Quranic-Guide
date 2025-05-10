# Quranic Guide - AI-Powered Islamic Q&A

Quranic Guide is a Next.js web application designed to provide answers to questions about Islam, drawing insights from the Quran and the teachings of Prophet Muhammad (peace be upon him). It leverages Google's Generative AI (Genkit) to understand questions and formulate informative responses in multiple languages.

## Features

- **AI-Powered Answers:** Get answers to your questions about Islam based on the Quran and Sunnah.
- **Multi-language Support:** Ask questions and receive answers in various languages, including:
    - English (en)
    - Arabic (ar)
    - Urdu (ur)
    - Persian (Farsi) (fa)
    - Indonesian (id)
    - Turkish (tr)
    - French (fr)
    - Bengali (bn)
    - Malay (ms)
    - Hindi (hi)
    - (And more, as supported by the AI model)
- **Automatic Language Detection:** The AI attempts to detect the language of your question and respond accordingly. If the language is not supported or detection is unclear, it defaults to English.
- **Responsive Design:** Access the application seamlessly on various devices (desktop, tablet, mobile).
- **User Feedback:** Provide feedback on the helpfulness of the answers.
- **Educational Purpose:** Designed to offer guidance and knowledge, with a clear disclaimer that AI interpretations are not definitive religious rulings.

## Technologies Used

- **Next.js (App Router):** React framework for server-side rendering and static site generation.
- **TypeScript:** Superset of JavaScript for type safety.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **ShadCN/UI:** Re-usable UI components built with Radix UI and Tailwind CSS.
- **Genkit (Google AI):** Toolkit for building AI-powered applications, specifically using Google's Gemini models.
- **Lucide React:** Library for icons.
- **Geist Font:** Modern font for typography.
- **Firebase (Implied for Studio):** While not explicitly configured in the provided files for database/auth, Firebase Studio suggests potential integration.

## Project Structure

- `src/app/`: Main application code, following Next.js App Router conventions.
    - `page.tsx`: The main page component for the Quranic Guide.
    - `layout.tsx`: The root layout for the application.
    - `globals.css`: Global styles and Tailwind CSS theme configuration.
- `src/components/`: Reusable React components.
    - `quranic-guide/`: Components specific to the Quranic Guide feature (Header, QuestionForm, AnswerCard, etc.).
    - `ui/`: ShadCN UI components.
- `src/ai/`: Genkit AI-related code.
    - `flows/`: Genkit flows defining AI interactions.
        - `answer-questions.ts`: Flow for handling question answering.
        - `collect-feedback.ts`: Placeholder for feedback (currently UI-driven).
    - `genkit.ts`: Genkit initialization and configuration.
    - `dev.ts`: Development server script for Genkit.
- `src/hooks/`: Custom React hooks (e.g., `use-toast`, `use-mobile`).
- `src/lib/`: Utility functions (e.g., `cn` for class names).
- `public/`: Static assets.
- `next.config.ts`: Next.js configuration.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.
- `package.json`: Project dependencies and scripts.
- `.env`: Environment variables (create this file if it doesn't exist).

## Getting Started

### Prerequisites

- Node.js (version 18.x or later recommended)
- npm or yarn

### Setup and Installation

1.  **Clone the repository (if applicable) or ensure you have the project files.**

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project. You'll need to add your Google AI API key for Genkit to work.
    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```
    You can obtain a Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

The application consists of two main parts: the Next.js frontend and the Genkit backend for AI functionalities.

1.  **Start the Genkit Development Server:**
    This server handles the AI flows.
    ```bash
    npm run genkit:dev
    # or (for watching changes)
    npm run genkit:watch
    ```
    By default, the Genkit server usually starts on port `3400` and the Genkit UI on port `4000`.

2.  **Start the Next.js Development Server:**
    In a new terminal window, run:
    ```bash
    npm run dev
    ```
    This will start the Next.js application, typically on `http://localhost:9002` (as per `package.json`).

3.  **Open the application in your browser:**
    Navigate to `http://localhost:9002`.

### Building for Production

1.  **Build the Next.js application:**
    ```bash
    npm run build
    ```

2.  **Start the production server:**
    ```bash
    npm run start
    ```
    For a production deployment, you would typically deploy the output of `npm run build` (the `.next` folder) to a hosting provider that supports Next.js (e.g., Vercel, Netlify, Firebase Hosting). The Genkit flows would need to be deployed as a separate backend service (e.g., Cloud Functions, Cloud Run). Consult the Genkit documentation for deployment options.

## How to Use the Quranic Guide

1.  **Navigate to the main page.**
2.  **Type your question** about Islam into the input field.
    -   Example: "What is the significance of patience in Islam?"
    -   You can ask in any of the supported languages.
3.  **Click the "Ask" button.**
4.  The AI will process your question and provide an answer based on its knowledge of the Quran and the teachings of Prophet Muhammad (peace be upon him).
5.  The answer will be displayed, along with a disclaimer.
6.  You can provide feedback on whether the answer was helpful using the "Helpful" or "Not Helpful" buttons.

## Genkit AI Integration

-   **Flows:** The AI logic is encapsulated in Genkit flows located in `src/ai/flows/`. The primary flow for this application is `answer-questions.ts`.
-   **Prompts:** Within the flows, prompts are defined to instruct the AI model on how to process input and generate output. These prompts guide the AI to base its answers on Islamic texts and to handle language detection.
-   **Schema:** Zod schemas (`AnswerQuestionInputSchema`, `AnswerQuestionOutputSchema`) are used to define the expected input and output structures for the AI, ensuring data consistency.
-   **Configuration:** Genkit is initialized in `src/ai/genkit.ts`, specifying the Google AI plugin and the Gemini model to be used.

## Important Disclaimer

The answers provided by the Quranic Guide are generated by an AI model based on its training data, which includes the Quran and teachings of Prophet Muhammad (peace be upon him). While the AI strives to provide accurate and informative responses, these should be considered as interpretations for educational purposes only.

**They are NOT definitive religious rulings (fatwas).** For matters requiring religious rulings, always consult with qualified and knowledgeable Islamic scholars.

## Contributing

If you'd like to contribute to the project, please follow standard Git practices:
1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes with clear messages.
5.  Push your branch to your fork.
6.  Open a pull request to the main repository.

## License

This project is open-source. Please refer to the `LICENSE` file if one is provided, or assume standard open-source licensing if not specified. (Note: No LICENSE file was provided in the initial project structure).
```