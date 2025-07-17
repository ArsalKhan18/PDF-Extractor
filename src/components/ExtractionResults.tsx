import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Edit2, Check, X } from 'lucide-react';

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
  editable?: boolean;
}

interface ExtractionResultsProps {
  extractedData: ExtractedField[];
  onExport: (format: 'excel' | 'csv') => void;
  onUpdateField: (index: number, value: string) => void;
}

export const ExtractionResults = ({ extractedData, onExport, onUpdateField }: ExtractionResultsProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEditing = (index: number, currentValue: string) => {
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      onUpdateField(editingIndex, editValue);
      setEditingIndex(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) {
      return <Badge variant="default" className="bg-success text-success-foreground">High</Badge>;
    } else if (confidence >= 0.6) {
      return <Badge variant="default" className="bg-warning text-warning-foreground">Medium</Badge>;
    } else {
      return <Badge variant="destructive">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-foreground">Extracted Data</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onExport('csv')}
                className="hover:shadow-elegant transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                size="sm" 
                onClick={() => onExport('excel')}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {extractedData.map((field, index) => (
            <div key={index}>
              <div className="flex items-center justify-between py-3">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      {field.label}
                    </Label>
                  </div>
                  <div className="flex-1">
                    {editingIndex === index ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                        />
                        <Button size="sm" variant="ghost" onClick={saveEdit}>
                          <Check className="h-4 w-4 text-success" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={cancelEdit}>
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-foreground flex-1">{field.value || 'Not found'}</span>
                        {field.editable !== false && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditing(index, field.value)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    {getConfidenceBadge(field.confidence)}
                  </div>
                </div>
              </div>
              {index < extractedData.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};