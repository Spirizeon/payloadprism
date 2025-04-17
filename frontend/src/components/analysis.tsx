"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AnalysisPage = () => {
  const router = useRouter();
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  useEffect(() => {
    // Get data from query params
    const { data } = router.query;

    if (data) {
      // Parse the JSON data passed in the URL
      setAnalysisResult(JSON.parse(data as string));
    }
  }, [router.query]);

  if (!analysisResult) return <div>Loading...</div>;

  return (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      <h3 className="text-xl font-semibold">Analysis Result</h3>
      <p>
        <strong>Verdict:</strong> {analysisResult.verdict}
      </p>
      <div>
        <strong>Reasons:</strong>
        <ul className="list-disc pl-5">
          {analysisResult.reasons.map((reason: string, index: number) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>IOCs:</strong>
        <ul className="list-disc pl-5">
          <li>
            <strong>Domains:</strong> {analysisResult.iocs.domains.join(", ")}
          </li>
          <li>
            <strong>IPs:</strong> {analysisResult.iocs.ips.join(", ")}
          </li>
          <li>
            <strong>File Paths:</strong>{" "}
            {analysisResult.iocs.file_paths.join(", ")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnalysisPage;
