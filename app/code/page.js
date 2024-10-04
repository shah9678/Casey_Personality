"use client";
import CodeEnv from "../../components/codeEnv";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();

  const personality = searchParams.get("personality");
  console.log(personality, "reas");

  return <CodeEnv personality={personality} />;
}
