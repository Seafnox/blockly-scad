import React, { Component, CSSProperties } from 'react';
import { BlocklyService, BlocklyWorkspace } from '../services/blocklyService';
import { IdeStateService } from '../services/ideStateService';
import { toolbox } from '../utlis/toolbox';

export class Blockly extends Component<unknown, Blockly> {
  blockly = BlocklyService.instance();
  ideState = IdeStateService.instance();
  blocklyContainer?: HTMLDivElement | null;
  blocklyArea?: HTMLDivElement | null;
  blocklyDiv?: HTMLDivElement | null;

  componentDidMount() {
    console.log('make workspace');
    this.blockly.mainWorkspace?.dispose();
    console.log(this.blockly.mainWorkspace);
    const workspace: BlocklyWorkspace = this.blockly.inject(
      this.blocklyDiv!,
      {
        toolbox,
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

    this.ideState.resize.addCallback(() => this.onResize());
    this.onResize();
  }

  onResize() {
    console.log('resize workspace');
    const blocklyArea = this.blocklyArea;
    if (blocklyArea && this.blocklyContainer) {
      blocklyArea.style.height = this.blocklyContainer?.offsetHeight + 'px';
    }
    const blocklyDiv = this.blocklyDiv;
    if (blocklyArea && blocklyDiv) {
      blocklyDiv.style.left = '0px'; // x + 'px';
      blocklyDiv.style.top = '0px'; // y + 'px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

    }
    setTimeout(() => this.blockly.svgResize(this.blockly.mainWorkspace!));
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
