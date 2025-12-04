# Frequently Asked Questions

## Why am I getting an error when trying to generate issues?
The most common reasons for errors are:
1.  **Invalid URL:** Ensure the URL matches the format `https://github.com/owner/repo`.
2.  **Private Repository:** The AI cannot access private repositories. Please ensure the repo is **Public**.
3.  **API Limits:** High traffic might temporarily rate-limit the AI service. Wait a minute and try again.

## Can I use this on a Private Repository?
**No.** The application uses Google Search and public scraping methods to analyze the codebase. It cannot access repositories that require authentication.

## Why didn't the "Scan for TODOs" find anything?
*   The repository might not have any `TODO` or `FIXME` comments indexed by Google Search yet.
*   The search query might be restricted by `robots.txt` on GitHub side for very new code.

## The generated issue link doesn't work!
*   Ensure you are logged into GitHub in your browser.
*   Some repositories disable the "Issues" tab. If the repo doesn't allow issues, the link will result in a 404 page on GitHub.

## How does the AI know about the code?
It uses Google Search Grounding to read the public repository pages, READMEs, and indexed code snippets to understand the context and generate relevant suggestions.