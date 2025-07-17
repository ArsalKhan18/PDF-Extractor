import { Brain, FileText } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-subtle border-b border-border shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">PDF Data Extractor</h1>
            <p className="text-sm text-muted-foreground">AI-powered order form processing</p>
          </div>
        </div>
      </div>
    </header>
  );
};