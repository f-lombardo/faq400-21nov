import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

// TODO - The any tipe must be transformed, where and if possible to a generic type
// TODO - Improve errors https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Statements/throw

export interface ComponentStoredState {
  data: {
    [index: string]: any;
  };
  scrollX: number;
  scrollY: number;
}

export interface HistoryRecord {
  states: {
    [index: string]: ComponentStoredState;
  };
  timeStamp: Date | null;
  url?: string;
  windowScrollX: number;
  windowScrollY: number;
}

function HistoryRecordFactory(): HistoryRecord {
  return {
    states: {},
    timeStamp: null,
    windowScrollX: 0,
    windowScrollY: 0
  };
}

@Module({
  namespaced: true
})
export default class StateRestorer extends VuexModule {
  //---- State settings ----
  // If it needs to be reusable
  // https://vuex.vuejs.org/guide/modules.html#module-reuse

  currentHistoryRecord: HistoryRecord = HistoryRecordFactory();
  currentlyRetrievedState: HistoryRecord = HistoryRecordFactory();
  historyArray: HistoryRecord[] = [];
  navigationFlag: string = "";

  //---- Mutations ----
  @Mutation
  POP_HISTORY() {
    this.currentlyRetrievedState =
      this.historyArray.pop() || HistoryRecordFactory();
  }

  @Mutation
  PUSH_HISTORY() {
    this.historyArray.push(this.currentHistoryRecord);
    this.currentHistoryRecord = HistoryRecordFactory();
  }

  @Mutation
  STORE_COMPONENT_STATE({
    key,
    toStore
  }: {
    key: string;
    toStore: ComponentStoredState;
  }) {
    if (!this.currentHistoryRecord.states.hasOwnProperty(key)) {
      this.currentHistoryRecord.states[key] = toStore;
    } else {
      throw "State Restorer | STORE_COMPONENT_STATE: key already exists";
    }
  }

  //---- Getters ----
  get getComponentState() {
    return (key: string): ComponentStoredState | undefined => {
      return this.currentHistoryRecord.states[key];
    };
  }
}
