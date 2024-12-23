import { generate, Options } from 'orval';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { OpenAPIObject, OperationObject, PathItemObject } from 'openapi3-ts/oas30';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openApiSpecFilePath = path.join(__dirname, 'src', 'generated', 'WebApi.json');
if (!fs.existsSync(openApiSpecFilePath)) {
  console.error(
    `Build failed: ${openApiSpecFilePath} does not exist. Run dotnet build first to generate OpenApi spec.`,
  );
  process.exit(1);
}

const targetDirectory = path.join(__dirname, 'src', 'generated', 'openapi');
if (fs.existsSync(targetDirectory)) {
  fs.rmSync(targetDirectory, { recursive: true });
}

const getTags = () => {
  const content = fs.readFileSync(openApiSpecFilePath, 'utf8');
  const openApiObject: OpenAPIObject = JSON.parse(content) as OpenAPIObject;
  const tags: string[] = (openApiObject.tags ?? []).map((tag) => tag.name);
  return tags;
};

const cherrypickTagActions = (obj: OpenAPIObject, tag: string): OpenAPIObject => {
  const pathOperations = ['get', 'put','post','delete','options','head','patch','trace'];
  for (const pathKey in obj.paths) {
    const path: PathItemObject = obj.paths[pathKey];
    for (const actionKey of pathOperations) {
      const action = (path as any)[actionKey] as OperationObject;
      if(action === undefined || action.tags === undefined){
        continue;
      }

      if (action.tags.length > 1) {
        throw new Error('Multiple tags found on endpoint. This is not supported yet.');
      }

      if (!action.tags.includes(tag)) {
          delete (path as any)[actionKey];
      }
    }
  }

  return obj;
};

const tags = getTags();

for (const tag of tags) {
  const fileContent = fs.readFileSync(openApiSpecFilePath, 'utf8');
  const openApiSpec: OpenAPIObject = JSON.parse(fileContent) as OpenAPIObject;
  const cherrypickedOpenApiSpec = cherrypickTagActions(openApiSpec, tag);

  const config: Options = {
    output: {
      mode: 'tags-split',
      target: targetDirectory,
      client: 'angular',
      schemas: path.join(targetDirectory, 'schemas'),
    },
    input: {
      target: cherrypickedOpenApiSpec,
    },
  };

  await generate(config);
}
