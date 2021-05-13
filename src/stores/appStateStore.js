//Tributary Project User Interface
// MIT License
//
// Copyright (C) 2021  Collinear Group, LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// See LICENSE in the project root for license information.
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