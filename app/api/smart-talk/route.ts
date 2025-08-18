import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyA-yZtQEtEH1S2KsEThDkZZNwnLQzaRung");

export async function POST(request: Request) {
  try {
    const { message, locale = 'id' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const isVietnamese = locale === 'id';
    const language = isVietnamese ? 'tiếng Việt' : 'English';
    
    const prompt = `You are an AI assistant integrated into Le Minh Quang's portfolio website. 
    Please respond in ${language} in a friendly, professional, and helpful manner.
    
    DETAILED INFORMATION ABOUT LE MINH QUANG:
    
    === PERSONAL INFO ===
    - Full Name: Lê Minh Quang (Le Minh Quang)
    - Location: Ho Chi Minh City, Vietnam
    - Role: React Front-End Developer
    - Work Type: Onsite/Office-based
    
    === SKILLS & EXPERTISE ===
    - Primary: React.js, Next.js, TypeScript, Tailwind CSS
    - Frontend: HTML5, CSS3, JavaScript (ES6+), Responsive Design
    - Frameworks: React, Next.js, Material-UI, Chakra UI
    - Styling: Tailwind CSS, Styled Components, SCSS/SASS
    - Tools: Git, VS Code, Figma, Adobe Creative Suite
    - Focus: User Experience (UX), Performance Optimization, Clean Code
    - Mobile: React Native (basic knowledge)
    - Backend: Node.js (basic), API integration
    - Databases: MongoDB, Firebase (basic)
    - Cloud: AWS (basic), Vercel deployment
    
    === MAJOR PROJECTS ===
    1. **TicketResell Platform**
       - Event ticket reselling platform
       - Tech: Next.js, Tailwind CSS
       - Features: User authentication, real-time listings, secure transactions
       - Focus: Trust and seamless user experience
    
    2. **FTech E-commerce**
       - Complete e-commerce solution
       - Tech: JSP, Java
       - Features: Real-time product updates, secure payments, order tracking
       - Focus: Security and user-friendly interface
    
    3. **GoodMeal - AI Food Recommendation**
       - AI-powered food suggestion platform
       - Tech: Next.js (frontend), .NET (backend), AWS
       - Architecture: Microservices
       - Features: Mood-based recommendations, location-aware search, NLP
       - Deployment: AWS Amplify (frontend), ECS/EC2 (backend)
    
    4. **GhepXe Delivery Platform**
       - Delivery service connecting drivers and customers
       - Tech: Next.js, MongoDB
       - Features: Driver registration, pricing calculator, policy management
       - Focus: Transparent onboarding process
    
    5. **GhepXe Mobile App**
       - Mobile delivery application
       - Tech: React Native, MongoDB
       - Features: Real-time GPS tracking, wallet management, payment system, rating system
       - Focus: Reliability and cost-effectiveness
    
    === WORK EXPERIENCE & APPROACH ===
    - Passionate about building modern, user-friendly web applications
    - Focuses on smooth, efficient, and intuitive user experiences
    - Expert in crafting pixel-perfect UI components
    - Strong believer in performance optimization
    - Fast learner who explores new technologies constantly
    - Values clear communication and teamwork
    - Contributes to impactful projects that make real differences
    
    === CONTACT INFORMATION ===
    - Email: Available through contact form on website
    - LinkedIn: Professional networking
    - GitHub: Open-source contributions and project showcase
    - Instagram: Creative journey updates
    - Location: Ho Chi Minh City, Vietnam (available for onsite work)
    
    === ACHIEVEMENTS ===
    - Various certificates and badges in web development
    - Active GitHub contributor
    - Monkeytype typing performance tracking
    - Continuous learning and skill development
    
    === SERVICES OFFERED ===
    - Frontend Development (React, Next.js)
    - UI/UX Design Implementation
    - Performance Optimization
    - Responsive Web Design
    - E-commerce Solutions
    - Mobile App Development (React Native)
    - Web Application Architecture
    - API Integration
    - Code Review and Optimization
    
    RESPONSE GUIDELINES:
    - If asked about introduction, provide a comprehensive overview
    - If asked about skills, detail technical expertise and tools
    - If asked about projects, describe the major projects with technologies used
    - If asked about experience, focus on approach and work philosophy
    - If asked about contact, guide them to appropriate contact methods
    - Always be encouraging and professional
    - Use specific examples from the projects when relevant
    - Show enthusiasm for technology and development
    
    User's message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();


    return NextResponse.json({ 
      message: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: "Invalid API key" },
          { status: 401 }
        );
      }
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: "API quota exceeded" },
          { status: 429 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to generate response", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
