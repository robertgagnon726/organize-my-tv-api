import { OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'fs';
export default function writeOpenApiFile(
  document: OpenAPIObject,
  location: string,
) {
  fs.writeFileSync(location, JSON.stringify(document));
}
