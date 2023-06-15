import { UIState } from './';

type UIType = 
    | { type: '[UI] - Open Sidebar' }
    | { type: '[UI] - Close Sidebar' }
    | { type: '[UI] - Set isAddingEntry', payload: boolean }
    | { type: '[UI] - Toggle Dragging', payload: boolean }

export const uiReducer = ( state: UIState, action: UIType): UIState => {
    switch (action.type) {
        case '[UI] - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true
            }
        case '[UI] - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false
            }
        case '[UI] - Set isAddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload
            }
        case '[UI] - Toggle Dragging': 
            return {
                ...state,
                isDragging: action.payload
            }
        default:
            return state;
    }
}

