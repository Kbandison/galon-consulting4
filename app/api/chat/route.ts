/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const FIREWORKS_API_URL =
  "https://api.fireworks.ai/inference/v1/chat/completions";
const FIREWORKS_API_KEY = process.env.FIREWORKS_API_KEY!;

const FW_MODELS = {
  main: "accounts/kbandison/deployedModels/llama-v3-70b-instruct-penm9jf3",
  fallback: "accounts/kbandison/deployedModels/llama-v3-8b-instruct-hhhhqk2j",
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // 1st try with 70B
    let res = await fetch(FIREWORKS_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: FW_MODELS.main,
        messages,
        max_tokens: 1024,
        temperature: 0.5,
      }),
    });

    // If 70B fails with a rate/quota error, try 8B
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      if (
        res.status === 429 || // quota/ratelimit
        (typeof errorBody.error === "string" &&
          errorBody.error.toLowerCase().includes("quota"))
      ) {
        // Fallback to 8B
        res = await fetch(FIREWORKS_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIREWORKS_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            model: FW_MODELS.fallback,
            messages,
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
