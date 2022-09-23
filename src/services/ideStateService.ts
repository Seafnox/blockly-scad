import {
  EditorState,
  TransactionSpec,
} from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { BlocklyService } from './blocklyService';
import { IdeConsole } from './ideConsole';
import { IdeEventBus } from './ideEventBus';

export interface IdeState {
  debug: boolean;
  b2c_error: boolean;
  fileName: string;
  code: string;
  code_prev: string;
  blockly_code: string;
  resize: IdeEventBus<void>,
  console: IdeConsole;
  updateWorkspace: () => void;
  editor?: EditorView;
}

export class IdeStateService {
  static #instance: IdeState = IdeStateService.getInitState();

  static instance(): IdeState {
    return IdeStateService.#instance;
  }

  static makeEditorState(editor: EditorView, blockly_code: string): EditorState {
    const state: EditorState = editor.state;
    const transaction: TransactionSpec = {
      changes: {
        from: 0,
        insert: blockly_code,
      },
    };
    state.update(transaction);
    return state;
  }

  private static getInitState(): IdeState {
    return {
      debug: true,
      b2c_error: false,
      fileName: 'example',
      code: 'var i=10',
      code_prev: '',
      blockly_code: 'var i=10',
      resize: new IdeEventBus<void>(),
      console: new IdeConsole(),
      updateWorkspace: () => IdeStateService.updateWorkspace(),
    };
  }

  private static updateWorkspace(): void {
    let Blockly = BlocklyService.instance();
    console.log('updateWorkspace');
    let blockly_code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace!);
    IdeStateService.#instance.blockly_code = blockly_code;
    const editor = IdeStateService.#instance.editor;
    if (editor) {
      const state: EditorState = IdeStateService.makeEditorState(editor, blockly_code);
      editor.setState(state);
    }
  }
}
