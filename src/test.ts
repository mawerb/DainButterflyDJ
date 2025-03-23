import axios from "axios";


async function generateSong() {
    try {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
      const data = JSON.stringify({
        prompt: 'make a song about lebron r&b',
        style: 'r&b',
        title: 'the king',
        customMode: true,
        instrumental: false,
        model: 'V3_5',
        callBackUrl: 'https://225c-134-139-201-5.ngrok-free.app',
      });
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apibox.erweima.ai/api/v1/generate',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer a38e5c601a9a3e6a5a5e96dca16e2020`,
        },
        data: data,
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

      console.log(response.data.data.taskId)
      
      let check = await axios.request(config2)

      while(check.data.data.status != 'SUCCESS'){
        console.log('Response Data:', check.data.data.status);
        
        await sleep(10000);
        check = await axios.request(config2)
      }

      console.log(response)

      console.log('Suno API Response:', response.data);
  
    } catch (error) {
      console.error('Error calling Suno API:', error.response ? error.response.data : error.message);
    }
  }
  
  // Call the function
  generateSong();