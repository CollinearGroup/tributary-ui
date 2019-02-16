import { observable, decorate, action } from 'mobx';

class AppStateStore {

  // @observable
  contentState 

  contentStateStack = []


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
  popState: action
})



const appStateStore = new AppStateStore()

export default appStateStore