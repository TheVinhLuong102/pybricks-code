// SPDX-License-Identifier: MIT
// Copyright (c) 2020 The Pybricks Authors

import { Ace } from 'ace-builds';
import { Reducer, combineReducers } from 'redux';
import { Action } from '../actions';
import { EditorActionType } from '../actions/editor';

type CurrentEditSession = Ace.EditSession | null;

const current: Reducer<CurrentEditSession, Action> = (state = null, action) => {
    switch (action.type) {
        case EditorActionType.Current:
            return action.editSession || null;
        default:
            return state;
    }
};

export interface EditorState {
    current: CurrentEditSession;
}
export default combineReducers({ current });
