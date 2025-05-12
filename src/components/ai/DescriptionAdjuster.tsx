'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { adjustDescriptionStyle, type AdjustDescriptionStyleInput } from '@/ai/flows/adjust-description-style';
import { Loader2, Copy } from 'lucide-react';

interface DescriptionAdjusterProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialText: string;
  onTextAdjusted: (adjustedText: string) => void;
}

const styleOptions = ['Formal', 'Concise', 'Creative', 'Casual', 'Professional'];

export function DescriptionAdjuster({
  isOpen,
  setIsOpen,
  initialText,
  onTextAdjusted,
}: DescriptionAdjusterProps) {
  const [currentText, setCurrentText] = useState(initialText);
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [adjustedTextResult, setAdjustedTextResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAdjust = async () => {
    setIsLoading(true);
    setError(null);
    setAdjustedTextResult(null);

    const input: AdjustDescriptionStyleInput = {
      text: currentText,
      style: selectedStyle,
    };
    if (maxLength && maxLength > 0) {
      input.maxLength = maxLength;
    }

    try {
      const result = await adjustDescriptionStyle(input);
      setAdjustedTextResult(result.adjustedText);
    } catch (e) {
      console.error('Error adjusting description:', e);
      setError('Failed to adjust description. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to adjust description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (adjustedTextResult) {
      onTextAdjusted(adjustedTextResult);
      setIsOpen(false);
      toast({
        title: 'Success',
        description: 'Description updated.',
      });
    }
  };
  
  const handleCopy = () => {
    if (adjustedTextResult) {
      navigator.clipboard.writeText(adjustedTextResult);
      toast({
        title: 'Copied!',
        description: 'Adjusted description copied to clipboard.',
      });
    }
  };


  // Reset state when modal is reopened with new initial text
  useState(() => {
    setCurrentText(initialText);
    setAdjustedTextResult(null);
    setError(null);
    setSelectedStyle(styleOptions[0]);
    setMaxLength(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialText, isOpen]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adjust Description Style</DialogTitle>
          <DialogDescription>
            Refine your description using AI. Choose a style and set a maximum length if needed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="original-text">Original Text</Label>
            <Textarea
              id="original-text"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              rows={5}
              className="bg-background"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="style-select">Style</Label>
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger id="style-select">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styleOptions.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max-length">Max Length (optional)</Label>
              <Input
                id="max-length"
                type="number"
                placeholder="e.g., 150"
                value={maxLength || ''}
                onChange={(e) => setMaxLength(e.target.value ? parseInt(e.target.value) : undefined)}
                className="bg-background"
              />
            </div>
          </div>
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <p className="ml-2">Adjusting description...</p>
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {adjustedTextResult && (
            <div className="grid gap-2">
              <Label htmlFor="adjusted-text">AI Adjusted Text</Label>
              <Textarea id="adjusted-text" value={adjustedTextResult} readOnly rows={5} className="bg-muted" />
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                 <Button size="sm" onClick={handleApply} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Apply This Version
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdjust} disabled={isLoading || !currentText.trim()} className="bg-primary hover:bg-primary/90">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Adjust with AI
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
