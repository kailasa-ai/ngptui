function readStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  callback: (data?: string) => void,
  data: string = ""
) {
  let temp = data;

  reader
    .read()
    .then(({ done, value }) => {
      if (done) {
        callback();
        console.log("Connection closed");
        return;
      }

      // Convert the ArrayBuffer to a string and split it by newline characters
      const result = new TextDecoder().decode(value);
      callback(result);

      const events = result.split("\n\n");

      //   console.log(events);
      console.log(result);
      // Parse each event and handle it
      events.forEach((event) => {
        if (event.trim() !== "") {
          try {
            temp += event;
            const value = JSON.parse(temp.replace("data: ", ""));
            console.log(value);
            temp = "";
          } catch (e) {
            console.log("failed to parse");
          }
          //   data += event.replace("data: ", ""); // accumulate
          //   const endIndex = data.indexOf("}");
          //   if (endIndex !== -1) {
          //     const startIndex = data.indexOf("{");
          //     const jsonObject = data.slice(startIndex, endIndex + 1); // Extract the JSON object
          //     data = data.slice(endIndex + 1); // Remove the extracted JSON object from the accumulated data
          //     try {
          //       const parsedObject = JSON.parse(jsonObject);
          //       console.log(parsedObject); // Handle the parsed JSON object here
          //       // Make an API call
          //     } catch (err) {
          //       console.error("Error while parsing JSON:", err);
          //     }
          //   }
          //   parser.onValue = ({ value }) => {
          //     console.log(value);
          //   };
          //   try {
          //     // console.log(JSON.parse(event.replace("data: ", "")));
          //     parser.write(event.replace("data: ", ""));
          //   } catch (e) {
          //     console.log(e);
          //   }
        }
      });

      // Read the next chunk of data
      readStream(reader, callback, temp);
    })
    .catch(console.log);
}
