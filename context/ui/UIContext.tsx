import { createContext } from 'react';


interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: ( isAdding: boolean ) => void;
    toggleDragging: ( isDragging: boolean ) => void;
}


export const UIContext = createContext({} as ContextProps);