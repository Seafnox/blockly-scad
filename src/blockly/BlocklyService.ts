import Blockly from 'blockly';
import { BlocklyType } from './BlocklyType';

export class BlocklyService {
  static #instance?: BlocklyType;

  static instance(): BlocklyType {
    if (!BlocklyService.#instance) {
      BlocklyService.#instance = Blockly as any;
    }

    return BlocklyService.#instance!;
  }
}
