import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyA-yZtQEtEH1S2KsEThDkZZNwnLQzaRung");
    
    // Try to create a model instance
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Try a simple test prompt
    const result = await model.generateContent("Hello, this is a test. Please respond with 'Hello from Gemini!'");
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ 
      success: true,
      response: text,
      apiKeyExists: !!process.env.GEMINI_API_KEY
    });
    
  } catch (error) {
    console.error("Test API Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error",
        apiKeyExists: !!process.env.GEMINI_API_KEY
      },
      { status: 500 }
    );
  }
}
