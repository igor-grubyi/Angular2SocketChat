import { BehaviorSubject, Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

export abstract class StateService<T> {
    protected _state: BehaviorSubject<T> = new BehaviorSubject(this.initialState());

    public select(property: keyof T): Observable<T[keyof T]> {
        return this.state
            .pairwise()
            .filter((stateHistory: T[]) => {
                const [previous, current] = stateHistory;

                return !_.isEqual(_.get(previous, property), _.get(current, property));
            })
            .map((stateHistory: T[]) => {
                const [, current] = stateHistory;

                return current[property];
            });
    }

    protected resetState(): void {
        this._state.next(this.initialState());
    }

    abstract initialState(): T;

    get state(): Observable<T> {
        return this._state.asObservable();
    }

    protected update(state: T): void {
        this._state.next(_.cloneDeep<T>(state));
    }

    protected getValue(): T {
        return this._state.getValue();
    }
}
