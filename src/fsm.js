class FSM {

    constructor(config) {
        this.config = config;
        this.state = config.initial;
        this.undoStack = [];
        this.redoStack = [];
    }

    getState() {
        return this.state;
    }


    changeState(state) {
        if (state in this.config.states) {
            this.undoStack.push(this.state);
            this.state = state;
            this.redoStack = [];
        } else{
            throw new Error('This config do not have this state');
        }
    }

    trigger(event) {
        if (event in this.config.states[this.state].transitions) {
            this.undoStack.push(this.state);
            this.state = this.config.states[this.state].transitions[event];
            this.redoStack = [];
        } else {
            throw new Error('This state do not have this event');
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        return this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var result = [];
        for (var st in this.config.states) {
            if ((event in this.config.states[st].transitions) || (event === undefined)) {
                result.push(st);
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */ 
    undo() {
        if (this.undoStack.length > 0){
            this.redoStack.push(this.state);
            this.state = this.undoStack.pop();
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoStack.length > 0){
            this.undoStack.push(this.state);
            this.state = this.redoStack.pop();
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoStack = [];
        this.redoStack = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
