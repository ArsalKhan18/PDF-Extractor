import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, X } from 'lucide-react';

interface PDFUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
}

export const PDFUploader = ({ onFileSelect, selectedFile }: PDFUploaderProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const removeFile = () => {
    onFileSelect(null as any);
  };

  if (selectedFile) {
    return (
      <Card className="w-full shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent rounded-lg">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{selectedFile.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {Math.round(selectedFile.size / 1024)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-card">
      <CardContent className="p-0">
        <div
          {...getRootProps()}
          className={`
            p-12 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300
            ${isDragActive 
              ? 'border-primary bg-primary/5 shadow-glow' 
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload PDF Order Form
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
            <Button variant="outline" className="mx-auto">
              Select File
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};