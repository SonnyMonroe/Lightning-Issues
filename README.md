# GitHub Issue Creator

**GitHub Issue Creator** is an AI-powered tool designed to streamline the open-source contribution process. By simply providing a GitHub repository URL, the application analyzes the project's structure, existing issues, and potential gaps to generate professional, ready-to-post issues.

## 🚀 Benefits for Developers

*   **Overcome Writer's Block:** struggling to articulate a bug report or feature request? Let the AI draft it for you.
*   **Standardize Contributions:** Ensures all created issues follow a professional structure with clear headers, steps, and reasoning.
*   **Save Time:** Automates the "analysis to issue" pipeline. No need to manually copy-paste templates or format markdown.
*   **Discover Opportunities:** Finds potential improvements or refactoring opportunities in repositories that you might have missed.

## ✨ Features

*   **AI-Powered Analysis:** Uses Google Gemini 2.5 Flash to understand the repository's purpose and tech stack.
*   **Smart Suggestions:** Automatically suggests Bugs, Features, Refactoring, or Documentation issues based on repo analysis.
*   **Project Goals Integration:** Custom input to tell the AI exactly what you want to achieve (e.g., "Improve accessibility").
*   **TODO Scanner:** Detects `// TODO` and `// FIXME` comments in the code and converts them into actionable issues.
*   **One-Click Posting:** Generates a pre-filled link to the GitHub "New Issue" page—no copy-pasting required.
*   **Markdown Preview:** View exactly how the issue will look on GitHub before you create it.
*   **Dark & Light Mode:** Fully responsive UI that adapts to your preferred theme.

## 🛠️ Built With

*   **Frontend:** React 19, Tailwind CSS, Lucide Icons
*   **AI:** Google Gemini API (@google/genai)
*   **Deploy:** Google Cloud Run