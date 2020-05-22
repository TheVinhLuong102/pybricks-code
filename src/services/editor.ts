import * as FileSaver from 'file-saver';
import { Action, Dispatch } from 'redux';
import { EditorActionType, EditorOpenAction } from '../actions/editor';
import { RootState } from '../reducers';
import { combineServices } from '.';

const decoder = new TextDecoder();

async function open(
    action: Action,
    _dispatch: Dispatch,
    state: RootState,
): Promise<void> {
    if (action.type !== EditorActionType.Open) {
        return;
    }
    // istanbul ignore next: currently, it is a bug if there is no current editor
    if (state.editor.current === null) {
        console.error('No current editor');
        return;
    }
    const text = decoder.decode((action as EditorOpenAction).data);
    state.editor.current.getDocument().setValue(text);
}

async function save(
    action: Action,
    _dispatch: Dispatch,
    state: RootState,
): Promise<void> {
    if (action.type !== EditorActionType.Save) {
        return;
    }
    // istanbul ignore next: currently, it is a bug if there is no current editor
    if (state.editor.current === null) {
        console.error('No current editor');
        return;
    }
    const data = state.editor.current.getDocument().getValue();
    const blob = new Blob([data], { type: 'text/x-python;charset=utf-8' });
    FileSaver.saveAs(blob, 'main.py');
}

export default combineServices(open, save);