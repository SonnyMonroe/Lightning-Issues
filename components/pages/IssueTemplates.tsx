import React, { useState } from 'react';
import { FileText, Copy, Check, Bug, Lightbulb, Shield, Heart, Book, Hammer, Zap, Accessibility, CircleHelp, Palette, Wrench, FileCode, GitPullRequest } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  filename: string;
  icon: any;
  content: string;
  color: string;
}

export const IssueTemplates: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const templates: Template[] = [
    {
      id: 'bug',
      title: 'Bug Report',
      description: 'Standard template for reporting bugs with reproduction steps.',
      filename: '.github/ISSUE_TEMPLATE/bug_report.md',
      icon: Bug,
      color: 'text-red-400',
      content: `---
name: 🐛 Bug Report
about: Create a report to help us improve
title: "[BUG] "
labels: bug
assignees: ''

---

## 🐛 Bug Description
A clear and concise description of what the bug is.

## 🔁 Reproduction Steps
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## 🤔 Expected Behavior
A clear and concise description of what you expected to happen.

## 📸 Screenshots
If applicable, add screenshots to help explain your problem.

## 🖥️ Environment
 - OS: [e.g. macOS, Windows]
 - Browser [e.g. Chrome, Safari]
 - Version [e.g. 22]

## 📋 Additional Context
Add any other context about the problem here.`
    },
    {
      id: 'feature',
      title: 'Feature Request',
      description: 'Suggest an idea for this project.',
      filename: '.github/ISSUE_TEMPLATE/feature_request.md',
      icon: Lightbulb,
      color: 'text-amber-400',
      content: `---
name: ✨ Feature Request
about: Suggest an idea for this project
title: "[FEATURE] "
labels: enhancement
assignees: ''

---

## 💡 Feature Description
A clear and concise description of what the problem is. Ex: I'm always frustrated when [...]

## 🚀 Proposed Solution
A clear and concise description of what you want to happen.

## 🔄 Alternatives Considered
A clear and concise description of any alternative solutions or features you've considered.

## 📋 Additional Context
Add any other context or screenshots about the feature request here.`
    },
    {
      id: 'pr',
      title: 'Pull Request Template',
      description: 'Standard checklist for submitting code changes.',
      filename: '.github/PULL_REQUEST_TEMPLATE.md',
      icon: GitPullRequest,
      color: 'text-purple-400',
      content: `## 🚀 Description
Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context.

Fixes # (issue)

## 🛠️ Type of change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update

## ✅ Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works`
    },
    {
      id: 'contributing',
      title: 'CONTRIBUTING.md',
      description: 'Guidelines for communicating with the project.',
      filename: 'CONTRIBUTING.md',
      icon: Heart,
      color: 'text-pink-400',
      content: `# Contributing to Project Name

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct
This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?
1. Fork the repo
2. Create a new branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request`
    },
    {
      id: 'security',
      title: 'Security Policy',
      description: 'Instructions for reporting vulnerabilities.',
      filename: 'SECURITY.md',
      icon: Shield,
      color: 'text-green-400',
      content: `# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a reported vulnerability, what to expect if the vulnerability is accepted or rejected, etc.`
    },
    {
      id: 'docs',
      title: 'Docs Improvement',
      description: 'Report missing or incorrect documentation.',
      filename: '.github/ISSUE_TEMPLATE/docs.md',
      icon: Book,
      color: 'text-blue-400',
      content: `---
name: 📝 Documentation Update
about: Report missing or incorrect documentation
title: "[DOCS] "
labels: documentation
assignees: ''

---

## 📚 Area of Documentation
Link to the specific page or section.

## ✏️ Suggested Change
Describe what is wrong or missing, and how it should be corrected.

## 🗣️ Tone/Language
Is the language unclear, too technical, or grammatically incorrect?

## 📋 Additional Context
Add any other context about the documentation issue here.`
    },
    {
      id: 'refactor',
      title: 'Refactor Request',
      description: 'Propose code cleanup or structural changes.',
      filename: '.github/ISSUE_TEMPLATE/refactor.md',
      icon: Hammer,
      color: 'text-indigo-400',
      content: `---
name: 🔨 Refactor Request
about: Propose code cleanup or structural changes
title: "[REFACTOR] "
labels: refactor
assignees: ''

---

## 🧶 Code Snippet / Component
Link to the file or component that needs refactoring.

## 📉 Current Implementation
Why is the current code problematic? (e.g. complexity, performance, readability)

## 📈 Proposed Improvement
Describe how you would refactor this code.

## 🧪 Testing Strategy
How will you ensure this refactor doesn't break existing functionality?`
    },
    {
      id: 'performance',
      title: 'Performance Issue',
      description: 'Report slow loading times or bottlenecks.',
      filename: '.github/ISSUE_TEMPLATE/performance.md',
      icon: Zap,
      color: 'text-yellow-400',
      content: `---
name: ⚡ Performance Issue
about: Report slow loading times or bottlenecks
title: "[PERF] "
labels: performance
assignees: ''

---

## 🐌 Bottleneck Description
Describe where the application feels slow or unresponsive.

## ⏱️ Metrics (if available)
- Load time:
- FPS:
- Memory usage:

## 🔁 Reproduction Steps
1. Navigate to...
2. Perform action...

## 🖥️ Environment
- Device:
- Network condition (3G/4G/Wifi):`
    },
    {
      id: 'accessibility',
      title: 'Accessibility Report',
      description: 'Report issues regarding a11y compliance.',
      filename: '.github/ISSUE_TEMPLATE/accessibility.md',
      icon: Accessibility,
      color: 'text-pink-500',
      content: `---
name: ♿ Accessibility Report
about: Report issues regarding a11y compliance
title: "[A11Y] "
labels: accessibility
assignees: ''

---

## 🔦 Issue Description
Describe the accessibility barrier (e.g., missing alt text, poor contrast, keyboard trap).

## 🌍 Standard Violation
Reference WCAG success criteria if known (e.g., WCAG 2.1 AA 1.4.3 Contrast).

## 🛠️ Proposed Fix
How should this element be modified?

## 📱 Assistive Technology
Which screen reader or tool were you using? (e.g., VoiceOver, NVDA)`
    },
    {
      id: 'question',
      title: 'Question / Discussion',
      description: 'Ask a general question about the codebase.',
      filename: '.github/ISSUE_TEMPLATE/question.md',
      icon: CircleHelp,
      color: 'text-teal-400',
      content: `---
name: ❓ Question
about: Ask a general question about the codebase
title: "[QUESTION] "
labels: question
assignees: ''

---

## 🙋 Question
What would you like to know?

## 🕵️ Context
Why do you need this information? Are you trying to build a feature or understand a pattern?

## 📝 Code Snippets
If referring to specific code, please paste it here.`
    },
    {
      id: 'design',
      title: 'Design Task',
      description: 'UI/UX improvements or visual changes.',
      filename: '.github/ISSUE_TEMPLATE/design.md',
      icon: Palette,
      color: 'text-fuchsia-400',
      content: `---
name: 🎨 Design Task
about: UI/UX improvements or visual changes
title: "[DESIGN] "
labels: design
assignees: ''

---

## 🖼️ Component / Screen
Which part of the UI needs work?

## 🖌️ Design Spec
Link to Figma/Sketch file or screenshot of the desired look.

## 📏 Requirements
- Colors:
- Typography:
- Spacing:

## 📱 Responsiveness
How should this look on mobile vs desktop?`
    },
    {
      id: 'chore',
      title: 'Chore / Maintenance',
      description: 'Routine tasks, updates, or config changes.',
      filename: '.github/ISSUE_TEMPLATE/chore.md',
      icon: Wrench,
      color: 'text-gray-400',
      content: `---
name: 🔧 Chore
about: Routine tasks, updates, or config changes
title: "[CHORE] "
labels: chore
assignees: ''

---

## 🧹 Task Description
What maintenance task needs to be performed?

## 🎯 Goal
What is the benefit of this chore? (e.g., cleaner build logs, faster CI)

## 📎 References
Links to dependencies or docs.`
    },
    {
      id: 'coc',
      title: 'Code of Conduct',
      description: 'Standards for community behavior.',
      filename: 'CODE_OF_CONDUCT.md',
      icon: Shield,
      color: 'text-emerald-400',
      content: `# Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members`
    },
    {
      id: 'readme',
      title: 'README Structure',
      description: 'A robust structure for your main README.',
      filename: 'README.md',
      icon: FileCode,
      color: 'text-sky-400',
      content: `# Project Name

Short description of the project.

## 🚀 Features
- Feature 1
- Feature 2

## 📦 Installation
\`\`\`bash
npm install
\`\`\`

## 🔧 Usage
\`\`\`javascript
const app = require('app');
app.start();
\`\`\`

## 🤝 Contributing
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License
MIT`
    },
    {
      id: 'test',
      title: 'Test Case',
      description: 'Request for a new unit or integration test.',
      filename: '.github/ISSUE_TEMPLATE/test_case.md',
      icon: FileCode,
      color: 'text-lime-400',
      content: `---
name: 🧪 Test Case
about: Request for a new unit or integration test
title: "[TEST] "
labels: test
assignees: ''

---

## 🎯 Target Component
Which component or function needs testing?

## 🔢 Test Scenarios
1. Input A -> Expected Output B
2. Error Case C -> Expected Error D

## 🛠️ Testing Tools
- Jest / Vitest
- React Testing Library / Cypress

## 📈 Coverage Goal
What edge cases should this test cover?`
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-github-text mb-6">
          GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-github-accent to-purple-400">Issue Templates</span>
        </h2>
        <p className="text-github-secondary text-lg max-w-2xl mx-auto">
          Copy and paste these professional templates into your repository's <code className="bg-github-border/30 px-1 rounded text-sm">.github/ISSUE_TEMPLATE/</code> folder to standardize contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="group flex flex-col bg-github-card border border-github-border rounded-xl p-6 hover:border-github-accent/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${template.color.replace('text', 'bg')}/10 ${template.color}`}>
                <template.icon size={24} />
              </div>
              <button
                onClick={() => handleCopy(template.id, template.content)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  copiedId === template.id 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-github-border/20 text-github-secondary hover:bg-github-accent/10 hover:text-github-accent border border-transparent'
                }`}
              >
                {copiedId === template.id ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy
                  </>
                )}
              </button>
            </div>

            <h3 className="text-lg font-bold text-github-text mb-2 group-hover:text-github-accent transition-colors">
              {template.title}
            </h3>
            
            <p className="text-sm text-github-secondary mb-4 flex-1">
              {template.description}
            </p>

            <div className="mt-auto">
              <div className="text-xs font-mono text-github-secondary bg-github-page p-2 rounded border border-github-border truncate" title={template.filename}>
                {template.filename}
              </div>
            </div>
            
            <div className={`absolute top-0 right-0 w-24 h-24 ${template.color.replace('text', 'bg')}/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150`} />
          </div>
        ))}
      </div>
    </div>
  );
};