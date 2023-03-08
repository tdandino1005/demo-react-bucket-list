import { useReducer } from "react";
import reducer from "./bucket-list-reducer";
import Bucket from "./components/Bucket";
import Form from "./components/BucketForm";

const buckets = JSON.parse(localStorage.getItem("buckets"));

function App() {
  const [state, dispatch] = useReducer(reducer, buckets);

  return (
    <>
      <h1 className="my-8 text-center text-4xl underline">🪣 List 👩🏾‍💻</h1>

      <main className="container mx-auto flex flex-col items-center gap-y-10 divide-y">
        <Form />
        <ul className="space-y-6 py-8">
          {state?.map((bucket) => (
            <Bucket key={bucket.id} bucket={bucket} />
          ))}
        </ul>
        <footer className="border-t border-red-200 pt-4 text-9xl">⚰️</footer>
      </main>
    </>
  );
}

export default App;
