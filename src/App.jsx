import Bucket from "./components/Bucket";
import Form from "./components/BucketForm";

function App() {
  return (
    <>
      <h1 className="my-8 text-center text-4xl underline">🪣 List 👩🏾‍💻</h1>

       <main className="container mx-auto flex flex-col items-center gap-y-10 divide-y">
        <Form />
        <ul className="space-y-6 py-8">
          <Bucket bucket={{ id: "1", text: "Learn React", importance: 1 }} />
          <Bucket
            bucket={{
              id: "2",
              text: "Learn HTML/CSS",
              importance: 2,
              isCompleted: true,
            }}
          />
        </ul>
        <footer className="border-t border-red-200 pt-4 text-9xl">⚰️</footer>
      </main>
    </>
  );
}

export default App;
