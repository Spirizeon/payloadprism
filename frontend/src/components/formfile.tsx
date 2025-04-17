"use client";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export function FileUploadDirectUploadDemo() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [analysisResult, setAnalysisResult] = React.useState<any | null>(null);

  const onUpload = React.useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
      try {
        const uploadPromises = files.map(async (file) => {
          try {
            const formData = new FormData();
            formData.append("file", file);

            const uploadUrl = "http://localhost:8000/upload"; // Backend URL

            const response = await fetch(uploadUrl, {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error("Upload failed");
            }

            const result = await response.json();

            // Show the analysis result from the backend in a toast
            if (result?.verdict) {
              toast.success(`Analysis complete: ${result.verdict}`, {
                description: `"${file.name}" has been analyzed.`,
              });

              // Store the result in the state to display in the UI
              setAnalysisResult(result);
            } else {
              toast.error(`Error analyzing file: ${file.name}`);
            }

            // Handle progress (assuming 100% once upload is complete)
            onProgress(file, 100);
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
            toast.error(`Failed to upload "${file.name}"`);
          }
        });

        // Wait for all files to finish uploading
        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Unexpected error during upload:", error);
      }
    },
    [],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (
    <div className="w-full max-w-md">
      <FileUpload
        value={files}
        onValueChange={setFiles}
        onUpload={onUpload}
        onFileReject={onFileReject}
        maxFiles={2}
        multiple
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-sm">Drag & drop files here</p>
            <p className="text-muted-foreground text-xs">
              Or click to browse (max 2 files)
            </p>
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-fit">
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file}>
              <div className="flex w-full items-center gap-2">
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <X />
                  </Button>
                </FileUploadItemDelete>
              </div>
              <FileUploadItemProgress />
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>

      {/* Display the analysis result below the file upload */}
      {analysisResult && (
        <div className="mt-4 p-4 border rounded-md">
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
                <strong>Domains:</strong>{" "}
                {analysisResult.iocs.domains.join(", ")}
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
      )}
    </div>
  );
}
