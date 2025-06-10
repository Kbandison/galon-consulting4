/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  businessInfo,
  serviceCategories,
  faqs,
  testimonials,
} from "@/data/index";

const FIREWORKS_API_URL =
  "https://api.fireworks.ai/inference/v1/chat/completions";
const FIREWORKS_API_KEY = process.env.FIREWORKS_API_KEY!;

const FW_MODELS = {
  main: "accounts/kbandison/deployedModels/llama-v3-70b-instruct-penm9jf3",
  fallback: "accounts/kbandison/deployedModels/llama-v3-8b-instruct-hhhhqk2j",
};

// Prepare chunk texts once to avoid recomputing on each request
const businessInfoText = `
Business Name: ${businessInfo.name}
Hours of Operation: ${businessInfo.hours}
Contact Email: ${businessInfo.email}
Contact Phone: ${businessInfo.phone}
Address: ${businessInfo.address.street}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}
`;

const servicesText = serviceCategories
  .map(
    (category) =>
      `${category.name}:\n${category.services
        .map((s) => `- ${s.name}: ${s.description}`)
        .join("\n")}`
  )
  .join("\n\n");

const faqsText = faqs
  .map(({ question, answer }) => `Q: ${question}\nA: ${answer}`)
  .join("\n\n");

const testimonialsText = testimonials
  .map(
    ({ text, name, role, organization }) =>
      `"${text}" — ${name}, ${role} at ${organization}`
  )
  .join("\n\n");

// Helper function to select chunks based on user input keywords
function selectRelevantChunks(userInput: string): string {
  const input = userInput.toLowerCase();

  const chunks: string[] = [];

  // Always include business name and contact info to maintain identity context
  chunks.push(businessInfoText);

  if (input.includes("hour") || input.includes("time")) {
    // User is likely asking about hours or schedule
    // We already included businessInfoText which has hours, so no extra needed
  }

  if (
    input.includes("service") ||
    input.includes("offer") ||
    input.includes("help") ||
    input.includes("consult")
  ) {
    chunks.push(servicesText);
  }

  if (
    input.includes("faq") ||
    input.includes("question") ||
    input.includes("how") ||
    input.includes("what") ||
    input.includes("when")
  ) {
    chunks.push(faqsText);
  }

  if (
    input.includes("testimonial") ||
    input.includes("review") ||
    input.includes("client") ||
    input.includes("experience")
  ) {
    chunks.push(testimonialsText);
  }

  // Fallback: if no keywords matched, send all except testimonials (to keep prompt size smaller)
  if (chunks.length === 1) {
    chunks.push(servicesText);
    chunks.push(faqsText);
  }

  return chunks.join("\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Extract last user message (assume last in the array)
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((msg: any) => msg.role === "user");

    const userInput = lastUserMessage?.content || "";

    // Select chunks based on user question
    const contextText = selectRelevantChunks(userInput);

    // Build system prompt with instructions and context
    const systemContent = `
You are the official AI assistant for Galon Consulting Services, LLC. Answer questions ONLY based on the following information. If the answer is not found, respond: "I'm sorry, I don't have that information right now." Keep answers short, concise, and professional with a friendly tone.

--- Begin business info context ---
${contextText}
--- End business info context ---
`;

    const systemMessage = { role: "system", content: systemContent };

    // Build messages array with system prompt prepended
    const promptMessages = [systemMessage, ...messages];

    // Fireworks call with 70b model first
    let res = await fetch(FIREWORKS_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: FW_MODELS.main,
        messages: promptMessages,
        max_tokens: 1024,
        temperature: 0.5,
      }),
    });

    // Fallback to 8b if 70b hits quota or rate limits
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      if (
        res.status === 429 ||
        (typeof errorBody.error === "string" &&
          errorBody.error.toLowerCase().includes("quota"))
      ) {
        res = await fetch(FIREWORKS_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIREWORKS_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            model: FW_MODELS.fallback,
            messages: promptMessages,
            max_tokens: 1024,
            temperature: 0.6,
          }),
        });
      }
    }

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: "Server error", err }, { status: 500 });
  }
}
