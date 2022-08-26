import { Modes, Tiers } from "../filter/GitlabReleaseFilter";

export enum MessageType {
  FILTER_DOM = 'FILTER_DOM',
}

export interface Message {
  type: MessageType;
}

export interface FilterMessage extends Message {
  mode: Modes,
  tier: Tiers
}

export interface FilterMessageResponse {
  count: number
}
