import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useSocket } from "./SocketContext";

function App() {
  const { socket, isReady } = useSocket();
  const [value, setValue] = useState<string | undefined>();
  const [output, setOutput] = useState<string>("");

  const textToHtml = (text: string) => {
    return text.replace(/\n/g, "<br />");
  };

  useEffect(() => {
    if (isReady && socket) {
      socket.on("data", ({ data }) => {
        //concatenate to output
        setOutput((prev) => prev + textToHtml(data));
      });
    }

    // Cleanup
    return () => {
      if (isReady && socket) {
        socket.off("message");
      }
    };
  }, [socket, isReady]);

  const handleChange = (value: string | undefined) => {
    //socket?.emit("data", value);
    setValue(value);
  };

  return (
    <main className="flex flex-col items-center justify-center h-50">
      {/*Add a button to execute the code*/}
      <button
        onClick={() => {
          setOutput("");
          socket?.emit("data", value);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ejecutar
      </button>
      <Editor
        height={"50vh"}
        defaultLanguage="python"
        defaultValue="# Escribe tu código aquí"
        onChange={handleChange}
      />
      {/* Create a panel that will hold the console output */}
      <div
        className="w-full h-1/4 bg-gray-800 text-white p-2"
        dangerouslySetInnerHTML={{ __html: output || "" }}
      ></div>
    </main>
  );
}

export default App;
