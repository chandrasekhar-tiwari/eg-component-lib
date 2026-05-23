import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { Button } from "./components/Button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section id="next-steps">
      <Button label="Click me" onClick={() => alert("Clicked!")} />
    </section>
  );
}

export default App;
