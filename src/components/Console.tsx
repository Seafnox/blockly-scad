import { Component } from 'react';
import { IdeStateService } from '../services/ideStateService';

export class Console extends Component<unknown, Console> {
    console = IdeStateService.instance().console;

    public render() {
        return (
            <div>
                <div>
                    <span>console:</span>
                    <button onClick={ this.console.clear }>X</button>
                </div>
                <div id='console' ref={ref => this.console.setConsole(ref) } />
            </div>
        );
    }
}
