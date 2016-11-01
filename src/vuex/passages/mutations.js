/* eslint new-cap: [2, {newIsCap: true, capIsNew: false}] */

import {updateStory, findByPid, findIndexByPid, getCurrentStory} from '../utils';

const passageBlueprint = {
    title: 'New passage',
    text: 'This blank sheet stares at you. Blankly.',
    tags: [],
    starting: false,
};

export function OPEN_PASSAGE(state, pid) {
    const story = getCurrentStory(state);
    const openedPassage = findByPid(story.opened, pid);

    if (!openedPassage) {
        const passage = findByPid(story.passages, pid);
        if (passage) {
            story.opened.push(passage);
        }
    }
    updateStory(story);
}

export function UPDATE_PASSAGE(state, passage) {
    const story = getCurrentStory(state);
    const existingPassage = findByPid(story.passages, passage.pid); // TODO: make this more error-proof
    Object.assign(existingPassage, passage);
    updateStory(story);
}

export function CLOSE_PASSAGE(state, pid) {
    const story = getCurrentStory(state);
    const index = story.opened.findIndex((passage) => passage.pid === pid);
    if (index > -1) {
        story.opened.splice(index, 1);
    }
}

export function ADD_PASSAGE(state, {title = passageBlueprint.title, text = passageBlueprint.text,}) {
    const story = getCurrentStory(state);
    const lastPid = story.passages.reduce((pid, passage) => Math.max(pid, passage.pid), 0);

    story.passages.push({
        title,
        text,
        pid: lastPid + 1,
        tags: [],
        starting: false,
    });

    updateStory(story);
}

export function DELETE_PASSAGE(state, pid) {
    CLOSE_PASSAGE(state, pid);

    const story = getCurrentStory(state);
    const index = findIndexByPid(story.passages, pid);
    if (index > -1) {
        story.passages.splice(index, 1);
    }
    updateStory(story);
}

export function ADD_TAG(state, {pid, tag,}) {
    const story = getCurrentStory(state);
    const passage = findByPid(story.passages, pid);
    if (!passage.tags.includes(tag)) {
        passage.tags.push(tag);
    }
    updateStory(story);
}

export function REMOVE_TAG(state, {pid, index,}) {
    const story = getCurrentStory(state);
    const passage = findByPid(story.passages, pid);
    passage.tags.splice(index, 1);
    updateStory(story);
}

export function MAKE_PASSAGE_STARTING(state, pid) {
    const story = getCurrentStory(state);
    const currentStarting = story.passages.find((passage) => passage.starting);
    if (currentStarting) {
        currentStarting.starting = false;
    }

    const passage = findByPid(story.passages, pid);
    passage.starting = true;

    updateStory(story);
}