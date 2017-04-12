import { IAction } from "../../models/action.model";
import { Observable } from "rxjs";

/**
 * Store
 */
export class Store {
  state: Object;
  listeners: any[];

  constructor(private reducer: Function) {
  }

  getState = () => this.state;
  
  dispatch = (action: IAction) => {
    this.state = this.reducer(this.state, action);
    // this.listeners.forEach(listener => listener())
  }

  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
  }

  select = (stateProperty: string): any => this.state[stateProperty];
}