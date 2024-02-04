export type ResourceType = 'coin' | 'energy';

export interface IResource {
  type: ResourceType;
  value: number;
}