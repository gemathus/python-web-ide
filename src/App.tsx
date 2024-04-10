import Editor from "@monaco-editor/react";

function App() {
  const handleChange = (value: string | undefined) => {
    console.log(value);
  };
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Editor
        height={"100vh"}
        defaultLanguage="python"
        defaultValue="# Escribe tu código aquí"
        onChange={handleChange}
      />
    </main>
  );
}

export default App;
