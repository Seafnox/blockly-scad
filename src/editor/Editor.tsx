import { linter, lintGutter } from '@codemirror/lint';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { basicSetup } from 'codemirror';
import React, { Component } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, EditorViewConfig } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript, esLint } from '@codemirror/lang-javascript';
//@ts-ignore
import { Linter } from 'eslint-linter-browserify/linter';

export class Editor extends Component<unknown, Editor> {
  editorElement: HTMLElement | null = null;
  editorView: EditorView | null = null;
  eslintConfig = {
    // eslint configuration
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: "module",
    },
    env: {
      browser: true,
      node: true,
    },
    rules: {
      semi: ["error", "always"],
      indent: ["error", 4],
    },
  };
  editorState: EditorState = EditorState.create({
    doc: `console.log(\nArray(10)\n.fill(0)\n.map(() => 'WOW')\n.join('... Wait! What? ')\n);`,
    extensions: [
      basicSetup,
      keymap.of(defaultKeymap),
      javascript(),
      darcula,
      lintGutter(),
      //@ts-ignore
      linter(esLint(new Linter(), this.eslintConfig)),
    ],
  });

  editorViewConfig: EditorViewConfig = {
    state: this.editorState,
  }

  public componentDidMount() {
    if (this.editorElement) {
      this.editorView = new EditorView({
        ...this.editorViewConfig,
        parent: this.editorElement,
      });

      this.editorView.dom.style.height = '100%';
    }
  }

  public componentWillUnmount() {
    if (this.editorView) {
      this.editorView.destroy();
      this.editorView = null;
    }
  }

  render() {
    return (
      <div
        ref={ref => this.editorElement = ref}
      />
    );
  }
}
