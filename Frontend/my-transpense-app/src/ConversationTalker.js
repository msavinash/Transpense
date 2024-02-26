// import React, { useState } from "react";
// import {
//   Button,
//   Container,
//   Grid,
//   TextField,
//   CircularProgress,
// } from "@mui/material";

// const BASE_URL = "http://localhost:5000";

// const ConversationTalker = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSearch = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(BASE_URL + "/v1/getConversation", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: searchQuery }),
//       });
//       const data = await response.json();
//       setSearchResults(data);
//       console.log(data);
//     } catch (error) {
//       console.error("Error occurred while fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Enter search query"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSearch}
//             disabled={isLoading}
//             fullWidth
//           >
//             {isLoading ? <CircularProgress size={24} /> : "Search"}
//           </Button>
//         </Grid>
//         <Grid item xs={12}>
//           {searchResults.map((result, index) => (
//             <p key={index}>{result}</p>
//           ))}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ConversationTalker;

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const BASE_URL = "http://localhost:5000";

const ConversationTalker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(BASE_URL + "/v1/getConversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Search conversations
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter search query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? <CircularProgress size={24} /> : "Search"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {searchResults.map((result, index) => (
                <p key={index}>{result}</p>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ConversationTalker;
