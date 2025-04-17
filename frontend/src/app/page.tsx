import GoogleGeminiEffect from "@/components/Gemini";
import GlobeDemo from "@/components/Globe";
import { CardHoverEffectDemo } from "@/components/Cards";
import TracingBeamDemo from "@/components/tracer";
import { TextHoverEffectDemo } from "@/components/Hover";
import GlowingEffectDemo from "@/components/Glow";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";
import { FileUploadDirectUploadDemo } from "@/components/formfile";
import HeroSectionOne from "@/components/hero-one";

export default function Home() {
  return (
    <>
      <div id="top"></div>
      <div className="max-w-full">
        <HeroSectionOne />
      </div>
      <div id="about"></div>
      <TracingBeamDemo />
      <div className="flex justify-center" id="upload">
        <FileUploadDirectUploadDemo />
      </div>
      <TextHoverEffectDemo />
    </>
  );
}
