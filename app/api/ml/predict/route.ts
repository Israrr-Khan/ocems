import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const telemetry = await request.json();

    const mlResponse = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(telemetry),
    });

    if (!mlResponse.ok) {
      return NextResponse.json(
        { error: "ML service request failed" },
        { status: 502 }
      );
    }

    const mlAnalysis = await mlResponse.json();

    return NextResponse.json(mlAnalysis);
  } catch (error) {
    console.error("ML integration error:", error);

    return NextResponse.json(
      { error: "Unable to connect to ML service" },
      { status: 500 }
    );
  }
}