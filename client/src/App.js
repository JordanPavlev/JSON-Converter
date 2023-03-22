import React from "react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Delete from "./components/icons/Delete";
import Copy from "./components/icons/Copy";
import Editor from "@monaco-editor/react";
import Loading from "./components/Loading/Loading";

const App = () => {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const copyToClipBoard = () => alert(`Copied ✅`);

  const handleSubmit = () => {

    setLoading(true);
    fetch("http://localhost:4000/convert", {
        method: "POST",
        body: JSON.stringify({
            value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            //👇🏻 sets to false
            setLoading(false);
            setOutput(data.response);
        })
        .catch((err) => console.error(err));
  };

  return (
    <main className="app">
      <header className="header__container">
        <div className="header">
          <h3>JSON</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          <h3>Typescript</h3>
          <div className="header__right">
            <button className="runBtn" onClick={handleSubmit}>
              RUN
            </button>
            <Delete setValue={setValue} />
          </div>
        </div>

        <div className="header">
          <h3>Typescript</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          <h3>JSON</h3>
          <CopyToClipboard text={output} onCopy={copyToClipBoard}>
            <span>
              <Copy />
            </span>
          </CopyToClipboard>
        </div>
      </header>

      <div className='code__container'>
                <div className='code'>
                    <Editor
                        height='90vh'
                        className='editor'
                        defaultLanguage='json'
                        defaultValue='{ }'
                        value={value}
                        onChange={(value) => setValue(value)}
                    />
                </div>
                <div className='output'>
                {loading ? (
                    <Loading />
                ) : (
                    <Editor
                        height='90vh'
                        className='editor'
                        defaultLanguage='typescript'
                        options={{
                            domReadOnly: true,
                            readOnly: true,
                        }}
                        defaultValue=''
                        value={output}
                        onChange={(value) => setOutput(value)}
                    />
                    )}
                </div>
            </div>
    </main>
  );
};

export default App;
