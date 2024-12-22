import * as orval from 'orval';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openApiSpecFilePath = path.join(__dirname, 'src', 'generated','WebApi.json');
if(!fs.existsSync(openApiSpecFilePath)){
  console.error(`Build failed: ${openApiSpecFilePath} does not exist. Run dotnet build first to generate OpenApi spec.`);
  process.exit(1);
}

const targetDirectory = path.join(__dirname, 'src', 'generated','openapi');
if(fs.existsSync(targetDirectory)){
  fs.rmSync(targetDirectory, { recursive: true });
}

const config = {
    output: {
      mode: 'tags-split',
      target: path.join(targetDirectory, 'api.ts'),
      client: 'angular',
    },
    input: {
      target: openApiSpecFilePath,
    },
}
await orval.generate(config);

process.exit(0)
