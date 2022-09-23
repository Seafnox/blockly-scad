import { Component, Fragment, CSSProperties } from 'react';
import Split from 'react-split';
import { Blockly } from './blockly/Blockly';
import { Console } from './components/Console';
import { Editor } from './components/Editor';
import { Header } from './components/Header';
import './App.css';
import { Preview } from './components/Preview';
import { IdeStateService } from './services/ideStateService';

export class App extends Component<unknown, App> {
  ideService = IdeStateService.instance();

  componentDidMount() {
    window.addEventListener('resize', () => this.ideService.resize.emit(), false);
    this.ideService.resize.emit();
  }

  onMainSplitDrag() {
    this.ideService.resize.emit();
  }

  onLeftPartSplitDrag() {
    this.ideService.resize.emit();
  }

  onRightPartSplitDrag() {}

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
        <Split style={mainSplitStyle} direction="horizontal" sizes={[50, 50]} onDrag={() => this.onMainSplitDrag()}>
          <Split style={secondSplitStyle} direction="vertical" sizes={[85, 15]} onDrag={() => this.onLeftPartSplitDrag()}>
            <Blockly/>
            <Console/>
          </Split>
          <Split style={secondSplitStyle} direction="vertical" sizes={[50, 50]} onDrag={() => this.onRightPartSplitDrag()}>
            <Preview/>
            <Editor/>
          </Split>
        </Split>
      </Fragment>
    );
  }
}
