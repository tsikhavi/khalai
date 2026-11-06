import type {ComponentType, ReactNode} from 'react';

export type PanelState = 'entering' | 'active' | 'exiting' | 'idle';

export type PanelMeta = {
  id: number;
  kicker: string;
  title: string;
  body: string;
  bg: string;
  ink: string;
  accent: string;
};

export type PanelProps = PanelMeta & {
  state: PanelState;
};

/**
 * Every animation panel takes the full PanelMeta + `state`.
 * Concrete components (LinePanel, GridPanel, …) all match this signature.
 */
export type PanelComponent = ComponentType<PanelProps & {children?: ReactNode}>;

export type PanelEntry = PanelMeta & {
  render: PanelComponent;
};
