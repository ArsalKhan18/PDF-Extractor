import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  message?: string;
}

export const ProcessingStatus = ({ status, progress, message }: ProcessingStatusProps) => {
  if (status === 'idle') return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-6 w-6 animate-spin text-primary" />;
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return 'Processing your PDF...';
      case 'completed':
        return 'Data extraction completed!';
      case 'error':
        return 'Error processing PDF';
      default:
        return '';
    }
  };

  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          {getStatusIcon()}
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{getStatusText()}</h3>
            {message && (
              <p className="text-sm text-muted-foreground mt-1">{message}</p>
            )}
            {status === 'processing' && (
              <Progress value={progress} className="mt-3" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};