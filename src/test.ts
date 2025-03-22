import axios from "axios";

// Function to make the API call
const generateSong = async (Prompt: string, Genre: string, Title: string) => {
  const data = {
    prompt: `${Prompt}`,
    style: `${Genre}`,
    title: `${Title}`,
    customMode: true,
    instrumental: false,
    model: "V3_5",
    callBackUrl: "https://api.example.com/callback",
  };

  try {
    // Log the data being sent to the API for debugging
    console.log("Data being sent to the API:", data);

    // Send POST request using axios
    const response = await axios.post(
      "https://apibox.erweima.ai/api/v1/generate",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.SONG_API_KEY}`,
        },
      }
    );

    // Check if the response is successful (status code 200)
    if (response.status === 200) {
      console.log("API Response:", response.data);  // Log the full response for debugging

      // Handle the response data as needed
      const { code, data: responseData } = response.data;

      if (code === 200 && responseData && responseData.data) {
        // Assuming responseData.data is an array
        const taskId = responseData.data[0].task_id;
        const durationSong = responseData.data[0].duration;
        const audioUrl = responseData.data[0].source_audio_url;
        const imageUrl = responseData.data[0].image;

        return {
          text: `${Genre} song about ${Prompt} that is ${durationSong} seconds long.`,
          data: {
            duration: durationSong,
            audio: audioUrl,
          },
          imageUrl,
        };
      } else {
        throw new Error("Invalid data structure received.");
      }
    } else {
      throw new Error(`API returned an error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error while generating the song:", error);
    return {
      text: "Failed to generate song.",
      data: null,
      imageUrl: null,
    };
  }
};

// Example usage for testing
const testGenerateSong = async () => {
  const result = await generateSong("lebron james rnb", "rnb", "My King");

  if (result.data) {
    console.log("Song generated successfully:", result);
  } else {
    console.log("Failed to generate song:", result.text);
  }
};

// Call the test function
testGenerateSong();