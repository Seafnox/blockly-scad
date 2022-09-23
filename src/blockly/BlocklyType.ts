import { getMainWorkspace, BlocklyOptions, Workspace } from 'core/blockly';

export interface BlocklyType {
  getMainWorkspace: typeof getMainWorkspace;
  svgResize: (workspace: Workspace) => void;
  inject: (element: HTMLElement, options: BlocklyOptions) => Workspace;
  JavaScript: {
    workspaceToCode: (workspace: Workspace) => string;
    [prop: string]: any;
  };

  [prop: string]: any;
}
