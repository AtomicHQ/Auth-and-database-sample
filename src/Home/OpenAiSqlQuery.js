import Head from "next/head";
import { useState } from "react";
import styles from "../pages/index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    //setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI-MetricsBird</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.jpg" className={styles.icon} />
        <h3>Ask Your Query</h3>
        <div className="lefts">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an Statement"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate Query" />
        </form>
        </div>
        <div className="right-panel">
        <div className={styles.result}>{result}</div>
        </div>
      </main>
    </div>
  );
}
