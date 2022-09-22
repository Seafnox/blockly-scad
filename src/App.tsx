import React, { Component, Fragment } from 'react';
import Split from 'react-split';
import { Blockly } from './components/Blockly';
import { Console } from './components/Console';
import { Editor } from './components/Editor';
import { Header } from './components/Header';
import './App.css';
import { Preview } from './components/Preview';
import { IdeStateService } from './services/ideStateService';

export class App extends Component<App, App> {
  ideService = IdeStateService.instance();

  componentDidMount() {
    window.addEventListener('resize', () => IdeStateService.instance().resize.emit(), false);
    this.ideService.resize.emit();
  }

  onVerticalSplitDrag() {
    this.ideService.resize.emit();
  }

  onHorizontalSplitDrag() {
    this.ideService.resize.emit();
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
        <Split direction="vertical" sizes={[50, 50]} onDrag={this.onVerticalSplitDrag}>
          <Split direction="horizontal" sizes={[75, 25]} onDrag={this.onHorizontalSplitDrag}>
            <Blockly/>
            <Console/>
          </Split>
          <Split direction="horizontal" sizes={[50, 50]}>
            <Preview/>
            <Editor/>
          </Split>
        </Split>
      </Fragment>
    );
  }
}
