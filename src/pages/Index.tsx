import { useState } from 'react';
import { Header } from '@/components/Header';
import { PDFUploader } from '@/components/PDFUploader';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { ExtractionResults } from '@/components/ExtractionResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PlayCircle, FileText, Database, Download } from 'lucide-react';

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
  editable?: boolean;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<ExtractedField[]>([]);
  const { toast } = useToast();

  // Mock extracted data for demonstration
  const mockExtractedData: ExtractedField[] = [
    { label: 'Subscriber Name', value: 'EXM Inc.', confidence: 0.95 },
    { label: 'Vendor Name', value: 'Salesforce, Inc', confidence: 0.92 },
    { label: 'Order Number', value: 'Q-4447869', confidence: 0.98 },
    { label: 'Total Contract Value', value: '$3,980,742.48', confidence: 0.89 },
    { label: 'Currency', value: 'USD', confidence: 0.99 },
    { label: 'Start Date', value: 'August 31 2023', confidence: 0.87 },
    { label: 'End Date', value: 'August 30 2028', confidence: 0.85 },
    { label: 'Term Length', value: '36.0', confidence: 0.91 },
    { label: 'Contract Status', value: 'Active', confidence: 0.94 },
    { label: 'Sales Rep', value: 'Mick Wim', confidence: 0.82 },
    { label: 'Auto-renew', value: 'no', confidence: 0.78 },
    { label: 'Price Protected', value: 'Yes', confidence: 0.88 },
  ];

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setProcessingStatus('idle');
      setExtractedData([]);
    }
  };

  const handleProcessFile = async () => {
    if (!selectedFile) return;

    setProcessingStatus('processing');
    setProgress(0);

    // Simulate AI processing with progress updates
    const intervals = [
      { progress: 20, delay: 500, message: 'Reading PDF content...' },
      { progress: 40, delay: 1000, message: 'Analyzing document structure...' },
      { progress: 60, delay: 1500, message: 'Extracting key fields...' },
      { progress: 80, delay: 2000, message: 'Validating extracted data...' },
      { progress: 100, delay: 2500, message: 'Processing complete!' },
    ];

    for (const interval of intervals) {
      setTimeout(() => {
        setProgress(interval.progress);
        if (interval.progress === 100) {
          setProcessingStatus('completed');
          setExtractedData(mockExtractedData);
          toast({
            title: "Processing Complete",
            description: "Successfully extracted data from your PDF order form.",
          });
        }
      }, interval.delay);
    }
  };

  const handleExport = (format: 'excel' | 'csv') => {
    toast({
      title: "Export Started",
      description: `Exporting data as ${format.toUpperCase()} file...`,
    });

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${format.toUpperCase()} file has been downloaded.`,
      });
    }, 1500);
  };

  const handleUpdateField = (index: number, value: string) => {
    const updatedData = [...extractedData];
    updatedData[index].value = value;
    setExtractedData(updatedData);
    
    toast({
      title: "Field Updated",
      description: "The field value has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Extract Key Data from PDF Order Forms
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your PDF order forms and let our AI automatically identify and extract 
            key information like pricing, dates, names, and contract details.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Smart Recognition</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Advanced AI identifies fields regardless of PDF format variations
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Structured Data</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Extract data into organized, editable fields with confidence scores
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Easy Export</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Export results to Excel or CSV for further analysis and processing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto space-y-6">
          <PDFUploader onFileSelect={handleFileSelect} selectedFile={selectedFile} />
          
          {selectedFile && processingStatus === 'idle' && (
            <div className="text-center">
              <Button 
                onClick={handleProcessFile}
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <PlayCircle className="h-5 w-5 mr-2" />
                Process PDF
              </Button>
            </div>
          )}

          <ProcessingStatus 
            status={processingStatus} 
            progress={progress}
            message={processingStatus === 'processing' ? 'This may take a few moments...' : undefined}
          />
        </div>

        {/* Results Section */}
        {extractedData.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <ExtractionResults 
              extractedData={extractedData}
              onExport={handleExport}
              onUpdateField={handleUpdateField}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
