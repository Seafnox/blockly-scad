import { getMainWorkspace, BlocklyOptions, svgResize } from 'core/blockly';
import { Workspace } from 'core/workspace';

export interface BlocklyType {
  getMainWorkspace: typeof getMainWorkspace;
  svgResize: typeof svgResize;
  inject: (element: HTMLElement, options: BlocklyOptions) => Workspace;
  JavaScript: {
    workspaceToCode: (workspace: Workspace) => string;
    [prop: string]: any;
  };

  [prop: string]: any;
}
