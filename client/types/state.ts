import { Storage } from "./storage";
export interface State {
  data: any;
  listeners: (() => void)[];
  storage: Storage;

  init();

  setState: (state: { data: {} }) => void;
  getState: () => { data: {} };
  subscribe: (arg0: (data: {}) => any) => any;
}
