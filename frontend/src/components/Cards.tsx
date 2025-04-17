import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "AI-Powered Code Reviews",
    description:
      "Automatically analyzes your GitHub repositories, providing precise, actionable feedback on code quality, security vulnerabilities, and best practices.",
    link: "#",
  },
  {
    title: "Scalable Cloud Integration",
    description:
      "Easily integrate and scale across cloud environments with robust backend infrastructure leveraging Python, LangChain, and Groq AI models.",
    link: "#",
  },
  {
    title: "Interactive Visualization Dashboards",
    description:
      "Gain instant insights into your repository's health and activity trends through intuitive visual dashboards built with Next.js",
    link: "#",
  },
  {
    title: "Code Optimization Suggestions",
    description:
      "Receive actionable recommendations to enhance code performance, readability, and maintainability automatically.",
    link: "#",
  },
  {
    title: "Easy Integration & Extensibility",
    description:
      "Seamlessly integrate Sentinel into your existing CI/CD pipelines, IDEs, or project management tools with flexible APIs and plugins.",
    link: "#",
  },
  {
    title: "Collaborative Review Workflow",
    description:
      "Enable seamless collaboration by integrating AI-generated reviews directly into your existing GitHub workflows and pull request discussions.",
    link: "#",
  },
];

export default CardHoverEffectDemo();
