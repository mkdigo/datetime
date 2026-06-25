/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  // Usa o preset oficial para ESM fornecido pelo ts-jest
  preset: 'ts-jest/presets/default-esm',

  transform: {
    // Configura o ts-jest para compilar os ficheiros mantendo o ESM ativo
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
