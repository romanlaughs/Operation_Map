export type ProjectId = string & { __brand: 'ProjectId' };
export type LineItemId = string & { __brand: 'LineItemId' };

export function createProjectId(id: string): ProjectId {
  return id as ProjectId;
}

export function createLineItemId(id: string): LineItemId {
  return id as LineItemId;
}
