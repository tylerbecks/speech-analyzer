import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Transcription {
  file: string;
  text: string;
  uhs: number;
  ums: number;
}

/**
 * Main function to transcribe audio files and count the number of "uh"'s and "um"'s
 */
async function main() {
  const transcriptions: Array<Transcription> = [];
  for (const file of fs.readdirSync('assets')) {
    console.log(`Transcribing ${file}...`);
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(`assets/${file}`),
      model: 'whisper-1',
      prompt: "Hey, this is Tyler. Uh, today I want to talk about credit. Um, okay, let's dive in.",
      response_format: 'verbose_json',
      timestamp_granularities: ['segment'],
    });

    // Count number of "uh"'s as standalone words
    // Good: uh, huh, uh-huh
    // Bad: uhh, uhm, uh-oh
    const uhs = transcription.text.match(/\buh\b/gi);

    // Match ums if they are standalone words
    // Good: hey, um, okay
    // Bad: bummer, hummus
    const ums = transcription.text.match(/\bum\b/gi);

    const data: Transcription = {
      file,
      text: transcription.text,
      uhs: uhs?.length ?? 0,
      ums: ums?.length ?? 0,
    };
    transcriptions.push(data);
    console.log(data);
  }

  // Sort files by number of uhs and ums
  transcriptions.sort((a, b) => b.uhs + b.ums - (a.uhs + a.ums));
  // print out the sorted files
  transcriptions.forEach((t) => console.log(`${t.file}: ${t.uhs + t.ums}`));
}

main();
