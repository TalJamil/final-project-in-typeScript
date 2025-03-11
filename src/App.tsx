
import React from "react";
import AddTask from "./components/AddTask";
import QuoteBox from "./components/QuoteBox";

const App: React.FC = () => {
  return (
    <div className="App">
      <QuoteBox/>
      <AddTask />
    </div>
  );
};

export default App;
