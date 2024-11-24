# Filler Words Counter

A TypeScript script that uses OpenAI's Whisper API to transcribe audio files and count filler words ("uh" and "um") in the transcriptions. This tool helps speakers analyze and improve their verbal communication by tracking the frequency of common filler words.

## Features

- Transcribes audio files using OpenAI's Whisper model
- Counts standalone "uh" and "um" occurrences
- Excludes similar-sounding words (e.g., "uh-oh", "bummer", "hummus")
- Sorts results by total filler word count
- Supports batch processing of multiple audio files

## Prerequisites

- Bun or Node.js (v14 or higher)
- OpenAI API key
- Audio files to analyze (supported formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/filler-words-counter.git
   cd filler-words-counter
   ```

2. Install dependencies:

   ```bash
   # Using Bun
   bun install

   # Using npm
   npm install
   ```

3. Set up your OpenAI API key:

   ```bash
   export OPENAI_API_KEY='your-api-key-here'
   ```

## Usage

1. Place your audio files in the `assets` directory.

2. Run the script:

   ```bash
   # Using Bun
   bun start

   # Using npm
   npm start
   ```

The script will:

- Process each audio file in the `assets` directory
- Generate transcriptions using Whisper API
- Count filler words
- Display results sorted by total filler word count

### Output Format

For each file, the script outputs:

```typescript
{
  file: string; // Filename
  text: string; // Full transcription
  uhs: number; // Count of "uh" occurrences
  ums: number; // Count of "um" occurrences
}
```

### Example Output

```text
Transcribing file1.mp3...
{
  file: 'file1.mp3',
  text: 'Hey, this is Tyler. Uh, today I want to talk about...',
  uhs: 2,
  ums: 1
}

Final sorted results:
file1.mp3: 3
file2.mp3: 1
file3.mp3: 0
```

## Configuration

The script uses the following Whisper API configuration:

- Model: `whisper-1`
- Response format: `verbose_json`
- Timestamp granularities: `['segment']`
- Custom prompt to improve transcription accuracy
