import { Component, CSSProperties } from 'react';
import packageInfo from '../../package.json';
import { saveAs } from 'file-saver';
import { IdeStateService } from '../services/ideStateService';

export class Header extends Component {
  saveDemo() {
    console.log('Save JS Demo');
    const state = IdeStateService.instance();
    const blob = new Blob([state.code], {
      type: 'text/plain',
    });
    console.log(saveAs);
    saveAs(blob, `${state.fileName}.demo.js`);
  }

  saveModule() {
    console.log('Save Generated JS');
    const state = IdeStateService.instance();
    const blob = new Blob([state.blockly_code], {
      type: 'text/plain',
    });
    console.log(saveAs);
    saveAs(blob, `${state.fileName}.demo.js`);
  }

  open() {
    const openFile = document.getElementById('open-js-file');
    openFile?.click();
  }

  openjs(event: Event) {
    const input = (event as InputEvent).dataTransfer;
    if (input && input.files) {
      console.log('open ', input.files[0]);
      const reader = new FileReader();
      reader.onload = function() {
        const state = IdeStateService.instance();
        state.code = reader.result?.toString() || '';
        state.code_prev = state.code;
        if (state.editor) {
          const newState = IdeStateService.makeEditorState(state.editor, state.code);
          state.editor?.setState(newState);
        }

      };
      reader.readAsText(input.files[0]);
    }
  }

  componentDidMount() {
    const openFile = document.getElementById('open-js-file')!;
    openFile.addEventListener('change', this.openjs, false);
    //this.openFileInput.addEventListener('change', this.openjs, false);
  }

  render() {
    const headerStyle: CSSProperties = {
      height: '50px',
      verticalAlign: 'middle',
      lineHeight: '50px',
      borderBottom: '1px solid #666666',
    };

    return (
      <div style={headerStyle}>
        <input id="open-js-file" type="file" name="openjsfile" accept=".js" style={{display: 'none'}}/>
        <button onClick={this.open}>Open</button>
        <button onClick={this.saveModule}>Save JS Code</button>
        <button onClick={this.saveDemo}>Save JS Demo</button>
        <span><b> BlocklySCAD</b> (Alpha) {packageInfo.version} by Kirill Warp</span>
      </div>
    );
  }
}
