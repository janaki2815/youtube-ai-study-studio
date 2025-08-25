#!/usr/bin/env python3
"""
YouTube Transcript Summarizer using HuggingFace Transformers
"""

import sys
import json
from transformers import pipeline
import torch

def summarize_text(text, max_length=150, min_length=50):
    """
    Summarize text using BART model from HuggingFace
    """
    try:
        # Initialize the summarization pipeline
        summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn",
            device=0 if torch.cuda.is_available() else -1
        )
        
        # Split text into chunks if it's too long (BART has token limits)
        max_chunk_length = 1024
        chunks = []
        
        if len(text) > max_chunk_length:
            # Simple chunking by sentences
            sentences = text.split('. ')
            current_chunk = ""
            
            for sentence in sentences:
                if len(current_chunk) + len(sentence) < max_chunk_length:
                    current_chunk += sentence + ". "
                else:
                    if current_chunk:
                        chunks.append(current_chunk.strip())
                    current_chunk = sentence + ". "
            
            if current_chunk:
                chunks.append(current_chunk.strip())
        else:
            chunks = [text]
        
        # Summarize each chunk
        summaries = []
        for chunk in chunks:
            if len(chunk.strip()) < 50:  # Skip very short chunks
                continue
                
            summary = summarizer(
                chunk,
                max_length=max_length,
                min_length=min_length,
                do_sample=False,
                truncation=True
            )
            summaries.append(summary[0]['summary_text'])
        
        # Combine summaries
        final_summary = " ".join(summaries)
        
        return {
            "success": True,
            "summary": final_summary,
            "original_length": len(text),
            "summary_length": len(final_summary)
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({
            "success": False,
            "error": "Usage: python summarize.py <text>"
        }))
        sys.exit(1)
    
    text = sys.argv[1]
    result = summarize_text(text)
    print(json.dumps(result))
