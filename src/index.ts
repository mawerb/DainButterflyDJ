//File: example/example-node.ts

import { z } from "zod";
import axios from "axios";
import { Hono } from 'hono';

//const jsonData = require('./server.js');

declare var jsonData;

import { defineDAINService, ToolConfig } from "@dainprotocol/service-sdk";

import {
  CardUIBuilder,
  TableUIBuilder,
  MapUIBuilder,
  LayoutUIBuilder,
  ImageCardUIBuilder,
  DainResponse,
} from "@dainprotocol/utils";

const app = new Hono();

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const route = process.env.ROUTE ;

const port = Number(process.env.PORT) || 2022;

const getSongConfig: ToolConfig = {
  id: "song-maker",
  name: "Make a Song",
  description: "Creates a song based on user prompt",
  input: z
    .object({
      Prompt: z.string().describe("Lyrics here...."),
      Genre: z.string().describe("Song Type/Genre"),
      Subject: z.string().describe("What is the song about?"),
      Duration: z.number().describe("Song Duration in seconds"),
      Title: z.string().describe("Whats the title"),
    })
    .describe("Input parameters for the AI created song request"),
  output: z
    .object({
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
      "callBackUrl": route,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://apibox.erweima.ai/api/v1/generate',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${process.env.SONG_API_KEY}`
      },
      data : data
    };

    const response = await axios.request(config);

    let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://apibox.erweima.ai/api/v1/generate/record-info',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': 'Bearer a38e5c601a9a3e6a5a5e96dca16e2020'
      },
      params:{
          taskId: response.data.data.taskId
      }
    };
    let check = await axios.request(config2)

    while(check.data.data.status != 'SUCCESS'){
      console.log('Response Data:', check.data.data.status);
      
      await sleep(15000);
      check = await axios.request(config2)
      console.log('2ndResponse Data:', check.data.data.status)
    }


    const jsonData = await axios.get(`${route}/get_data`);

    console.log(jsonData.data)
    console.log(jsonData.data.data.data[0])
    const duration_song =  jsonData.data.data.data[0].duration;
    const audio_url  = jsonData.data.data.data[0].audio_url;
    const image_url: string = jsonData.data.data.data[0].image_url;

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
  console.log("Song Creator DAIN Service is running at :" + address().port);
});