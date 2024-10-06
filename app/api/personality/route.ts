import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
  try {
    const { statement } = await req.json();

    // Connect to the Gradio client
    const client = await Client.connect("rooben/Minej-bert-base-personality");

    // Predict using the model
    const result = await client.predict("/predict", {
      param_0: statement,
    });

    const rawOutput = result.data;
    console.log(rawOutput, "rawOutput");

    // Extract the dominant trait label
    const dominantTraitLabel = rawOutput[0].label;

    // Map the label to the trait name
    const traitMapping: { [key: string]: string } = {
      LABEL_0: "Extroversion",
      LABEL_1: "Neuroticism",
      LABEL_2: "Agreeableness",
      LABEL_3: "Conscientiousness",
      LABEL_4: "Openness",
    };

    const dominantTraitName = traitMapping[dominantTraitLabel] || "Unknown";

    // Extract confidences
    const confidences = rawOutput[0].confidences.map((conf: any) => ({
      label: traitMapping[conf.label],
      score: conf.confidence,
    }));

    // Sort confidences by score in descending order
    confidences.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      rawOutput,
      dominantTraitName,
      confidences,
    });
  } catch (error) {
    console.error("Error predicting personality:", error);
    return NextResponse.json(
      { error: "Failed to predict personality" },
      { status: 500 }
    );
  }
}
