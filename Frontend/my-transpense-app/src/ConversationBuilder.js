import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

const BASE_URL = "http://localhost:5000";

const ConversationBuilder = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (newFile) => {
    setFile(newFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      // Handle error, file not selected
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Make API call to /v1/buildConversation using fetch
      const response = await fetch(BASE_URL + "/v1/buildConversation", {
        method: "POST",
        body: formData,
      });

      // Ensure response is ok before processing
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Show success toast
      console.log("Message received successfully");
      // Code to display toast goes here
    } catch (error) {
      // Handle error
      console.error("Error occurred:", error);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Add conversations
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <MuiFileInput value={file} onChange={handleFileChange} />
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" type="submit">
                  Upload
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ConversationBuilder;
