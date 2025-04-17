"use client";
import React from "react";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";

export default function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className="text-xl mb-4">{item.title}</p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "What's PayloadPrism",
    description: (
      <>
        <p>
          PayloadPrism is a lightweight malware behavior analyzer that inspects
          suspicious JSON logs from sandbox tools or simulated traces. It uses a
          smart rule-based engine to detect suspicious patterns — like registry
          persistence, PowerShell abuse, and ransomware hints — and gives you a
          quick verdict
        </p>
      </>
    ),
    badge: "",
    image: "https://w.wallhaven.cc/full/2y/wallhaven-2yp2xx.png",
  },
  {
    title: "Let's get started!",
    description: <>This project was made by Team Solo Levelling</>,
    badge: "Getting started!",
    image: "",
  },
  {
    title: "How to use it",
    description: (
      <>
        <p>
          Upload a .json log file from your dynamic analysis or mock sandbox
          tool. The system will:
          <ol>
            <li>1. Parse and scan for Indicators of Compromise (IOCs)</li>
            <li>2. Score the log based on suspicious behaviors</li>
            <li>3. Return a verdict with reasons</li>
          </ol>
        </p>
      </>
    ),
    badge: "Instructions",
    image: "https://w.wallhaven.cc/full/rr/wallhaven-rrvkkj.png",
  },
];
