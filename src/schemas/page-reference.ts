import { reference } from "astro:content"

// getPages validates this target type alongside normal collection references.
export const pageReference = <T extends string>(type: T) =>
  reference("pages").transform((value) => ({ ...value, expectedType: type }))
