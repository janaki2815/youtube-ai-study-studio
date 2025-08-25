import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, FileText, Sparkles, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './ui/collapsible';
import { cn } from '../lib/utils';

const TranscriptCard = ({ transcript, summary, stats, videoId }) => {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="card-hover">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Summary</CardTitle>
                <p className="text-sm text-slate-600">Generated using BART model</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-base">
                {summary}
              </p>
            </div>
            
            {/* Stats */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>{stats.compressionRatio}% compressed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{stats.originalLength.toLocaleString()} → {stats.summaryLength.toLocaleString()} chars</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transcript Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="card-hover">
          <Collapsible open={isTranscriptOpen} onOpenChange={setIsTranscriptOpen}>
            <CardHeader className="pb-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left hover:no-underline">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Original Transcript</CardTitle>
                    <p className="text-sm text-slate-600">
                      {isTranscriptOpen ? 'Click to collapse' : 'Click to expand'}
                    </p>
                  </div>
                </div>
                <div className="p-1 rounded-md hover:bg-slate-100 transition-colors">
                  {isTranscriptOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-600" />
                  )}
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                    {transcript}
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </motion.div>
    </div>
  );
};

export default TranscriptCard;
