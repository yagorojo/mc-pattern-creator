import { useEffect, useState } from "react";
import blocksData from "./blocks.json";

function App() {
  const [options, setOptions] = useState({
    w: 0,
    h: 0,
  });
  const [blocks, setBlocks] = useState({});
  const [pattern, setPattern] = useState([]);
  const [search, setSearch] = useState(undefined);

  function getPattern() {
    if (Object.keys(blocks).length === 0) return;

    const blocksArray = Object.keys(blocks);
    const patternArray = [];
    const total = options.w * options.h;

    for (let index = 0; index < total; index++) {
      const num = Math.floor(Math.random() * blocksArray.length);
      patternArray.push(blocksArray[num]);
    }

    setPattern(patternArray);
  }

  useEffect(() => {
    getPattern();

    return () => {
      setPattern([]);
    };
  }, [blocks, options]);

  function removeBlock(key) {
    setBlocks((prevBlocks) => {
      const { [key]: _, ...newBlocks } = prevBlocks;
      return newBlocks;
    });
  }

  function addBlock(key) {
    if (key in blocks) {
      removeBlock(key);
    } else {
      setBlocks((prevBlocks) => ({
        ...prevBlocks,
        [key]: 0.0,
      }));
    }
  }

  return (
    <div className="flex max-h-screen">
      <div className="flex flex-col">
        <div className="p-4">
          <input
            value={options.w}
            onChange={(e) => {
              setOptions({ ...options, w: e.target.value });
            }}
            max={10}
            type="range"
          />
          <div>Width: {options.w}</div>
          <input
            value={options.h}
            onChange={(e) => {
              setOptions({ ...options, h: e.target.value });
            }}
            max={10}
            type="range"
          />
          <div>Height: {options.h}</div>
          <button className="p-1 border" onClick={getPattern}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 25 25"
            >
              <path d="M 7.1601562 3 L 8.7617188 5 L 18 5 C 18.551 5 19 5.448 19 6 L 19 15 L 16 15 L 20 20 L 24 15 L 21 15 L 21 6 C 21 4.346 19.654 3 18 3 L 7.1601562 3 z M 4 4 L 0 9 L 3 9 L 3 18 C 3 19.654 4.346 21 6 21 L 16.839844 21 L 15.238281 19 L 6 19 C 5.449 19 5 18.552 5 18 L 5 9 L 8 9 L 4 4 z"></path>
            </svg>
          </button>
        </div>
        <div className="overflow-auto flex-grow flex flex-col">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          ></input>
          {Object.keys(blocksData).map((key) => (
            <button
              key={key}
              onClick={() => addBlock(key)}
              className="border p-2"
            >
              <img
                width={40}
                height={40}
                src={`/block/${blocksData[key]}`}
              ></img>
              <div>{key}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-grow border">
        <div className="flex flex-wrap">
          {Object.keys(blocks).map((key) => (
            <div key={key}>
              <img src={`/block/${blocksData[key]}`} />
              <div>{key}</div>
              <button onClick={() => removeBlock(key)}>Remove</button>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${options.w}, 40px)`,
          }}
        >
          {pattern.map((block, i) => (
            <img
              width={40}
              height={40}
              src={`/block/${blocksData[block]}`}
              key={i}
            ></img>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
