import BlocklyType from 'blockly';
import { Component, CSSProperties } from 'react';
import { IdeEventBusCallback } from '../services/ideEventBus';
import { BlocklyService } from './BlocklyService';
import { IdeStateService } from '../services/ideStateService';
import { blocklyThemeDark } from './BlocklyThemeDark';
import { toolbox } from './toolbox';

export class Blockly extends Component<unknown, Blockly> {
  blockly = BlocklyService.instance();
  ideState = IdeStateService.instance();
  blocklyContainer?: HTMLDivElement | null;
  blocklyArea?: HTMLDivElement | null;
  blocklyDiv?: HTMLDivElement | null;
  resizeCallback?: IdeEventBusCallback<unknown>;

  componentDidMount() {
    console.log('make workspace');
    const workspace: BlocklyType.Workspace = this.blockly.inject(
      this.blocklyDiv!,
      {
        toolbox,
        theme: blocklyThemeDark,
        zoom:
          {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.2,
            scaleSpeed: 1.2,
          },
        trashcan: false,
      },
    );
    workspace.addChangeListener(this.ideState.updateWorkspace);

    this.resizeCallback = () => this.onResize();
    this.ideState.resize.addCallback(this.resizeCallback);
    this.onResize();
  }

  public componentWillUnmount() {
    this.resizeCallback && this.ideState.resize.removeCallback(this.resizeCallback);
    this.blockly.getMainWorkspace()?.dispose();
  }

  onResize() {
    console.log('resize workspace');
    const blocklyArea = this.blocklyArea;
    if (blocklyArea && this.blocklyContainer) {
      blocklyArea.style.height = this.blocklyContainer?.offsetHeight + 'px';
    }
    const blocklyDiv = this.blocklyDiv;
    if (blocklyArea && blocklyDiv) {
      blocklyDiv.style.left = '0px';
      blocklyDiv.style.top = '0px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

    }
    setTimeout(() => this.blockly.svgResize(this.blockly.getMainWorkspace()));
  }

  render() {
    const styleDiv: CSSProperties = {
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'none',
    };
    const styleBArea: CSSProperties = {};
    const styleBDiv: CSSProperties = {
      position: 'absolute',
      margin: 0,
    };
    return (
      <div id="blocklyContainer" ref={ref => this.blocklyContainer = ref} style={styleDiv}>
        <div id="blocklyArea" ref={ref => this.blocklyArea = ref} style={styleBArea}></div>
        <div id="blocklyDiv" ref={ref => this.blocklyDiv = ref} style={styleBDiv}></div>
      </div>
    );
  }
}
