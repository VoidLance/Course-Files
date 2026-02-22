import React, { useState, useCallback } from 'react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(true);
  const [password, setPassword] = useState('');

const passwordGenerator = useCallback(() => {
  let pass = "";
  let strdata = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghilmnopqrstuvwxyz";
  const guaranteedChars: string[] = [];

  // Add numbers if allowed
  if (numberAllowed) {
    strdata += "0123456789";
    guaranteedChars.push("0123456789".charAt(Math.floor(Math.random() * 10)));
  }

  // Add special characters if allowed
  if (characterAllowed) {
    strdata += "!£$%^&#@~`";
    guaranteedChars.push("!£$%^&#@~`".charAt(Math.floor(Math.random() * 12)));
  }

  // Fill the rest of the password
  for (let index = guaranteedChars.length; index < length; index++) {
    const char = Math.floor(Math.random() * strdata.length);
    pass += strdata.charAt(char);
  }

  // Combine guaranteed characters and the rest, then shuffle
  pass = [...guaranteedChars, ...pass].sort(() => Math.random() - 0.5).join("");

  setPassword(pass);
}, [length, numberAllowed, characterAllowed, setPassword]);

const [copyText, setCopyText] = useState("Copy")

const copyPasswordToClipboard = () => {
  navigator.clipboard.writeText(password);
  setCopyText("Copied ✔️");
  setTimeout(()=> setCopyText("Copy"), 1000);
}


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center mb-8">Password Generator</h1>
      <div className="max-w-md mx-auto bg-amber-50 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="mb-4 flex shadow rounded-lg overflow-hidden">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Generated Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="Your password will appear here"
              value={password}
              readOnly
            />
           <button
            className={`outline-none text-white px-4 py-1 shrink-0 active:scale-75 active:bg-green-500! ${
            copyText === "Copy" ? "bg-slate-500!" : "bg-green-500!"
            }`}
            onClick={copyPasswordToClipboard}
            >
            {copyText}
          </button>

          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
              Password Length: {length}
            </label>
            <input
              className="w-full"
              id="length"
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.valueAsNumber)}
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(!numberAllowed)}
              />
              <span className="ml-2 text-amber-800">Include Numbers</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed(!characterAllowed)}
              />
              <span className="ml-2 text-amber-800">Include Special Characters</span>
            </label>
          </div>
          <button onClick={passwordGenerator} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
