import { Tiers, Licenses } from "../filter/GitlabReleaseFilter";

export enum MessageType {
  FILTER_DOM = 'FILTER_DOM',
}

export interface Message {
  type: MessageType;
}

export interface FilterMessage extends Message {
  mode: Tiers,
  tier: Licenses
}

export interface FilterMessageResponse {
  count: number
}
