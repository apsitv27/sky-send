import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface FileItem {
  file: File;
  id: string;
}

interface FileDropZoneProps {
  files: FileItem[];
  onFilesChange: (files: FileItem[]) => void;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  files,
  onFilesChange,
  maxSize = 4.5 * 1024 * 1024, // 4.5MB
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.zip', '.rar']
}) => {
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError('');

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError(`File too large. Maximum size is 4.5MB`);
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload PDF, DOC, IMG, or ZIP files.');
      }
      return;
    }

    // Add new files
    const newFiles: FileItem[] = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }));

    onFilesChange([...files, ...newFiles]);
  }, [files, onFilesChange, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar']
    },
    maxSize,
    multiple: true
  });

  const removeFile = (fileId: string) => {
    onFilesChange(files.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        📎 Attach Files
        <span className="text-xs text-muted-foreground">
          (Max 4.5MB each)
        </span>
      </label>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`drop-zone p-8 text-center cursor-pointer transition-all duration-300 rounded-xl ${
          isDragActive ? 'drag-over' : ''
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full glass">
            <Upload className="h-8 w-8 text-gradient-start" />
          </div>
          <div>
            <p className="text-lg font-medium text-glass-highlight">
              {isDragActive ? 'Drop files here...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              PDF, DOC, IMG, ZIP (MAX 4.5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Selected Files:</h4>
          {files.map((fileItem) => (
            <div
              key={fileItem.id}
              className="flex items-center justify-between p-3 rounded-lg glass border border-glass-border"
            >
              <div className="flex items-center gap-3">
                <File className="h-4 w-4 text-gradient-start" />
                <div>
                  <p className="text-sm font-medium text-glass-highlight">
                    {fileItem.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(fileItem.file.size)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => removeFile(fileItem.id)}
                className="h-8 w-8 p-0 hover:bg-destructive/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};