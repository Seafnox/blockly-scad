import Blockly from 'blockly';
import { BlocklyOptions } from 'core/blockly_options';
import { Workspace } from 'core/workspace';

export interface BlocklyWorkspace {
  addChangeListener: (callback: (event: Event) => void) => void;
  [prop: string]: any;
}

export interface BlocklyDef {
  mainWorkspace?: Workspace;
  svgResize: (workspace: Workspace) => void;
  inject: (element: HTMLElement, options: BlocklyOptions) => Workspace;
  JavaScript: {
    workspaceToCode: (workspace: Workspace) => string;
    [prop: string]: any;
  };

  [prop: string]: any;
}

export class BlocklyService {
  static #instance?: BlocklyDef;

  static instance(): BlocklyDef {
    if (!BlocklyService.#instance) {
      BlocklyService.#instance = Blockly as any;
    }

    return BlocklyService.#instance!;
  }
}
