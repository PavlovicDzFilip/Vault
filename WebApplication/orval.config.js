module.exports = {
    petstore: {
      output: {
        mode: 'tags-split',
        target: './src/generated/api.ts',
        schemas: 'src/generated/',
        client: 'angular',
      },
      input: {
        target: './src/generated/WebApi.json',
      },
    },
  };