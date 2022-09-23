import React, { Component, Fragment, CSSProperties } from 'react';
import Split from 'react-split';
import { Blockly } from './components/Blockly';
import { Console } from './components/Console';
import { Editor } from './components/Editor';
import { Header } from './components/Header';
import './App.css';
import { Preview } from './components/Preview';
import { IdeStateService } from './services/ideStateService';

export class App extends Component<unknown, App> {
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
    const mainSplitStyle: CSSProperties = {
      height: 'calc(100vh - 50px)',
      display: 'flex',
    };
    const secondSplitStyle: CSSProperties = {
      height: 'inherit',
      display: 'flex',
      flexDirection: 'column',
    }
    return (
      <Fragment>
        <Header></Header>
        <Split style={mainSplitStyle} direction="horizontal" sizes={[50, 50]} onDrag={this.onVerticalSplitDrag}>
          <Split style={secondSplitStyle} direction="vertical" sizes={[75, 25]} onDrag={this.onHorizontalSplitDrag}>
            <Blockly/>
            <Console/>
          </Split>
          <Split style={secondSplitStyle} direction="vertical" sizes={[50, 50]}>
            <Preview/>
            <Editor/>
          </Split>
        </Split>
      </Fragment>
    );
  }
}
