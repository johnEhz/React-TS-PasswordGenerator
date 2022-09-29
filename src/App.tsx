import React, { useState, useEffect } from "react";
import { passOptions } from "./types";
import getRandomPassword from "./services/getRandomPass";
import * as passCtrl from "./services/getPassStr";

const INITAL_VALUES = {
  charLen: 10,
  upperCase: false,
  lowerCase: false,
  numbers: false,
  symbols: false,
};

function App() {
  const [passOptions, setPassOptions] = useState<passOptions>(INITAL_VALUES);
  const [pass, setPass] = useState<string>("");

  const handleChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassOptions({ ...passOptions, [e.target.id]: e.target.value });
  };

  const handleChangeChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassOptions({ ...passOptions, [e.target.id]: e.target.checked });
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { upperCase, lowerCase, numbers, symbols } = passOptions;
    if (upperCase || lowerCase || numbers || symbols) {
      setPass(getRandomPassword(passOptions));
    } else {
      alert("Debe seleccionar almenos 1 caso.");
    }
  };

  const handleCopyPass = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    pass.length > 0 &&
      navigator.clipboard
        .writeText(pass)
        .then(() => {
          alert("Contraseña copiada!");
        })
        .catch((err) => console.log("Error...", err));
  };

  useEffect(() => {
    passCtrl.getPassStr(pass);
  }, [pass]);

  return (
    <div
      id="APP"
      className="flex flex-col w-screen h-screen bg-zinc-900 items-center justify-center p-6 space-y-6 font-roboto"
    >
      <h3 className="font-semibold tracking-wider text-lg mb-1 text-neutral-400">
        Password Generator
      </h3>
      <div className="bg-zinc-800 px-6 py-4 w-96 text-2xl tracking-wider rounded text-zinc-300 font-normal shadow-sm shadow-zinc-800 flex justify-between">
        <h1 className="w-4/5 text-neutral-400">{pass}</h1>
        <span
          className="text-emerald-300 rounded cursor-pointer hover:bg-zinc-900 px-1 active:bg-black"
          onClick={handleCopyPass}
        >
          C
        </span>
      </div>
      <div className="bg-zinc-800 p-6 w-96 flex flex-col space-y-5 rounded ">
        <form
          onSubmit={handleGenerate}
          className="text-zinc-300 flex flex-col space-y-5"
        >
          <div className="flex flex-rows items-center justify-between text-zinc-300">
            <label
              className="tracking-wider text-neutral-400"
              htmlFor="charLen"
            >
              Character Length
            </label>
            <h1 className="text-2xl text-right font-semibold text-emerald-300 tracking-wider font-roboto">
              {passOptions.charLen}
            </h1>
          </div>

          <input
            className="cursor-pointer h-2 accent-emerald-300"
            id="charLen"
            type="range"
            min="5"
            max="18"
            onChange={handleChangeSlider}
            value={passOptions.charLen}
          />
          <span className="checkmark"></span>

          <div className="flex space-x-2">
            <input
              className="w-4 cursor-pointer"
              id="upperCase"
              type="checkbox"
              onChange={handleChangeChecks}
              checked={passOptions.upperCase}
            />
            <label className="text-neutral-400" htmlFor="upperCase">
              Include Uppercase Letters
            </label>
          </div>

          <div className="flex space-x-2">
            <input
              className="w-4 cursor-pointer"
              id="lowerCase"
              type="checkbox"
              onChange={handleChangeChecks}
              checked={passOptions.lowerCase}
            />
            <label className="text-neutral-400" htmlFor="lowerCase">
              Include Lowercase Letters
            </label>
          </div>

          <div className="flex space-x-2">
            <input
              className="w-4 cursor-pointer"
              id="numbers"
              type="checkbox"
              onChange={handleChangeChecks}
              checked={passOptions.numbers}
            />
            <label className="text-neutral-400" htmlFor="numbers">
              Include Numbers
            </label>
          </div>

          <div className="flex space-x-2">
            <input
              className="w-4 cursor-pointer"
              id="symbols"
              type="checkbox"
              onChange={handleChangeChecks}
              checked={passOptions.symbols}
            />
            <label className="text-neutral-400" htmlFor="symbols">
              Include Symbols
            </label>
          </div>

          <div className="bg-zinc-900 py-3 px-5 rounded flex flex-col text-neutral-500">
            <div className=" flex justify-between items-center">
              <h2 className="font-normal tracking-wider">STRENGTH</h2>
              <div className="w-full rounded dark:bg-gradient-to-r from-red-500 to-green-500 ml-14 h-5">
                <div className="h-5 rounded text-end leading-none text-2xl text-white font-bold ease-in duration-300" style={{width: `${passCtrl.getPassStr(pass)}%`}}>|</div>
              </div>
            </div>
            <div className="mt-3 text-sm flex justify-between items-center">
              <span>Upper: {passCtrl.getUpperLetters(pass)}</span>
              <span>Lower: {passCtrl.getLowerLetters(pass)}</span>
              <span>Num: {passCtrl.getNumbers(pass)}</span>
              <span>Symb: {passCtrl.getSymbols(pass)}</span>
            </div>
          </div>

          <button className="bg-emerald-300 text-black h-12 font-semibold text-sm tracking-wider rounded hover:bg-emerald-400 px-1 active:bg-emerald-200">
            GENERATE
          </button>
        </form>
      </div>
      <span className="text-neutral-500 italic">By JDev {"</>"}</span>
    </div>
  );
}

export default App;
