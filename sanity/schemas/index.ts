import type { SchemaTypeDefinition } from "sanity";

import {
  calloutCta,
  codeBlock,
  comparisonTable,
  faqBlock,
  pointsList,
  sourceLink,
} from "./objects";
import { post } from "./post";

/** Every type the Studio knows about. One document type, by design. */
export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  pointsList,
  comparisonTable,
  calloutCta,
  faqBlock,
  codeBlock,
  sourceLink,
];
