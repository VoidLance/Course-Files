import { useState, useCallback } from 'react';

interface PasswordGeneratorHook {
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
  numberAllowed: boolean;
  setNumberAllowed: React.Dispatch<React.SetStateAction<boolean>>;
  characterAllowed: boolean;
  setCharacterAllowed: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  generatePassword: () => void;
}

export const usePasswordGenerator = (): PasswordGeneratorHook => {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(() => {
    let pass = '';
    let strdata = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghilmnopqrstuvwxyz';
    const guaranteedChars: string[] = [];

    if (numberAllowed) {
      strdata += '0123456789';
      guaranteedChars.push('0123456789'.charAt(Math.floor(Math.random() * 10)));
    }

    if (characterAllowed) {
      strdata += '!£$%^&#@~`';
      guaranteedChars.push('!£$%^&#@~`'.charAt(Math.floor(Math.random() * 12)));
    }

    for (let index = guaranteedChars.length; index < length; index++) {
      const char = Math.floor(Math.random() * strdata.length);
      pass += strdata.charAt(char);
    }

    pass = [...guaranteedChars, ...pass].sort(() => Math.random() - 0.5).join('');
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  return {
    length,
    setLength,
    numberAllowed,
    setNumberAllowed,
    characterAllowed,
    setCharacterAllowed,
    password,
    generatePassword,
  };
};

