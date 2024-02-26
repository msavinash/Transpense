import React from "react";
import ConversationBuilder from "./ConversationBuilder";
import ConversationTalker from "./ConversationTalker";

const ConversationPage = () => {
  return (
    <div>
      <h1>Welcome to the Conversation Page!</h1>
      <ConversationBuilder />
      <hr />
      <ConversationTalker />
      {/* Add your content here */}
    </div>
  );
};

export default ConversationPage;
