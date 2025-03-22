//File: example/example-node.ts

import { z } from "zod";
import axios from "axios";

import { defineDAINService, ToolConfig } from "@dainprotocol/service-sdk";

import {
  CardUIBuilder,
  TableUIBuilder,
  MapUIBuilder,
  LayoutUIBuilder,
  ImageCardUIBuilder,
  DainResponse,
} from "@dainprotocol/utils";
import { title } from "process";

const port = Number(process.env.PORT) || 2022;

const getWeatherEmoji = (temperature: number): string => {
  if (temperature <= 0) return "🥶";
  if (temperature <= 10) return "❄️";
  if (temperature <= 20) return "⛅";
  if (temperature <= 25) return "☀️";
  if (temperature <= 30) return "🌞";
  return "🔥";
};

const getSongConfig: ToolConfig = {
  id: "song-maker",
  name: "Make a Song",
  description: "Creates a song based on user prompt",
  input: z
    .object({
      Prompt: z.string().describe("Users Full Prompt"),
      Genre: z.string().describe("Song Genre"),
      Subject: z.string().describe("Subject of Song"),
      Duration: z.number().describe("Song Duration"),
      Title: z.string().describe("Song title"),
    })
    .describe("Input parameters for the AI created song request"),
  output: z
    .object({
      song: z.number().describe("Returned Finished Song"),
      Title: z.string().describe("Song Title"),
    })
    .describe("Current weather information"),
  pricing: { pricePerUse: 0, currency: "USD" },
  handler: async (
    { Genre, Subject, Duration, Prompt, Title },
    agentInfo,
    context
  ) => {
    console.log(
      `User / Agent ${agentInfo.id} requested a song to be made with the genre ${Genre} about ${Subject} thats ${Duration} long`
    );

    let data = JSON.stringify({
      "prompt": `${Prompt}`,
      "style": `${Genre}`,
      "title": `${Title}`,
      "customMode": true,
      "instrumental": false,
      "model": "V3_5",
      "callBackUrl": "https://api.example.com/callback"
    });
    
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://apibox.erweima.ai/api/v1/generate',
    //   headers: { 
    //     'Content-Type': 'application/json', 
    //     'Accept': 'application/json', 
    //     'Authorization': `Bearer ${process.env.SONG_API_KEY}`
    //   },
    //   data : data
    // };
    

    const fetchapp = await fetch("https://apibox.erweima.ai/api/v1/generate", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${process.env.SONG_API_KEY}`
      },
      body: JSON.stringify(data)
    });
    
    const response = await fetchapp.json()
    console.log(response)
    const code  = response.code;
    const task_id = response.data.task_id;
    const duration_song =  response.data.data[0].duration;
    const audio_url  = response.data.data[0].source_audio_url;
    const image_url: string = response.data.data[0].image;

    return {
      text: `${Genre} Song about ${Subject} that is ${duration_song} Seconds Long`,
      data: {
        duration: duration_song,
        audio: audio_url,

      },
      ui: new CardUIBuilder()
        .setRenderMode("page")
        .title(`${Genre} Song Created`)
        .addChild(
          new ImageCardUIBuilder(image_url)
            .title(Title)
            .description(`A ${duration_song} long ${Genre} song about ${Subject}`)
            .build()
        )
        .addChild(
           new CardUIBuilder()
           .title("Play Song!")
           .content(audio_url)
           .build()
        )
        .build(),
    };
  },
};

const dainService = defineDAINService({
  metadata: {
    title: "Music DAIN Service",
    description:
      "A DAIN service for creating songs using Suno API",
    version: "1.0.0",
    author: "maor",
    tags: ["music", "spotify", "dain"],
    logo: "https://cdn-icons-png.flaticon.com/512/252/252035.png",
  },
  exampleQueries: [
    {
      category: "Song",
      queries: [
        "Make a 50 second song about lebron with the title Lebron my king",
      ],
    },
  ],
  identity: {
    apiKey: process.env.DAIN_API_KEY,
  },
  tools: [getSongConfig],
});

dainService.startNode({ port: port }).then(({ address }) => {
  console.log("Weather DAIN Service is running at :" + address().port);
});
