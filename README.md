
# 🚀 Resume Bullet Point Generator

Transform simple resume descriptions into impactful, ATS-friendly bullet points.

## 📌 Overview

Resume Bullet Point Generator helps job seekers create stronger resume content by converting basic descriptions into professional, achievement-oriented bullet points. The tool encourages the use of action verbs, measurable impact, and recruiter-friendly language.

🔗 **Live Demo:** [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)  
🏆 **Built for:** [Digital Heroes](https://digitalheroesco.com)  
👩‍💻 **Built by:** Samriddhi Shrivastava · samriddhi1422@gmail.com

## ✨ Features

- Generate professional resume bullet points
- ATS-friendly suggestions
- Strong action verb recommendations
- Impact-focused writing guidance
- Responsive and modern UI
- Real-time input and output

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| AI Model | LLaMA 3.3 70B via Groq API |
| API | NodeJs |
| Deployment | Vercel (free Hobby plan) |


## 📂 Project Structure

```
resumebulletpoint/
├── public/                  # Static assets
├── server/                  
│   └── index.js          # Calls Groq API, 
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Top nav with Digital Heroes badge
│   │   ├── ToneSelector.jsx # Pill buttons for tone selection
│   │   └── BulletCard.jsx   # Individual bullet with copy button
│   ├── App.jsx              # Main app, state, and API call logic
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind imports + base styles
├── .gitignore
├── eslint.config.js
├── index.html               # Vite HTML entry point
├── package.json
├── package-lock.json
├── vite.config.js           # Vite configuration
└── README.md
```


## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/samriddhi1422/ResumeBullet.git
````

2. Navigate to the project directory

```bash
cd resumebulletpoint
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open in browser

```
http://localhost:5173
```

## 🎯 Example

**Input**

```
Made a website for a college event
```

**Output**

```
Developed and deployed a responsive event website that improved event visibility and streamlined participant registration.
```



## 👩‍💻 Author

**Samriddhi Shrivastava**

* GitHub: https://github.com/samriddhi1422



```
```
