/**
 * The id each checklist phase section carries, read by the phases and the
 * side navigator. A plain module, not a client one: the server calls it too,
 * and a function exported from a "use client" file can't be called there.
 */
export const phaseAnchor = (id: string) => `phase-${id}`;
