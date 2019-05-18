import { observable, decorate, action } from 'mobx';

class AppStateStore {

  // @observable
  contentState 

  // @observable
  filterValue

  contentStateStack = []

  // @action
  setFilter(val) {
    this.filterValue = val
  }

  // @action
  pushState(state){
    this.contentStateStack.push(this.contentState)
    this.contentState = state
  }

  popState(){
    this.contentState = this.contentStateStack.length ? this.contentStateStack.pop() : undefined
  }
}

decorate(AppStateStore, {
  contentState: observable,
  pushState: action,
  popState: action,
  setFilter: action,
  filterValue: observable
})



const appStateStore = new AppStateStore()

export default appStateStore