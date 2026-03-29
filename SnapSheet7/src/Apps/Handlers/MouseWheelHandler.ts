import { state, setState, UpdateCellFormulaAndEvaluate, deselectCell, addColumn, addRow, selectCell, updateViewPort } from "../StateManagement/Statemanager";
import { MarkMode, TextMode } from "../StateManagement/Types";
import { textModeHandleKeyPress } from "./TextModeKeyPressHandler";

/*
const arrowKeys = ["ArrowUp","ArrowDown", "ArrowLeft", "ArrowRight"]
function isNonSpecialKey(event: KeyboardEvent): boolean {
    const specialKeys = [
        'Backspace', 'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'Pause', 'CapsLock',
        'Escape', 'Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowLeft', 'ArrowUp',
        'ArrowRight', 'ArrowDown', 'Insert', 'Delete', 'Meta', 'ContextMenu', 'NumLock',
        'ScrollLock', 'PrintScreen'
    ];

    return event.key.length === 1 && !specialKeys.includes(event.key);
}
*/

export function handleMouseWheel(event: MouseEvent ) {
    event.preventDefault();
    //console.log("mouseWheel", event);
    // Utility function to move the selection
    const moveSelection = (newRow: number, newColumn: number) => {
        if (event.shiftKey) {
            // Update selectCellPosition with the new cell
            updateViewPort(newRow, newColumn);
            setState("mode", {
                ...markMode, // Preserve other properties in MarkMode
                selectCellPosition: { row: newRow, column: newColumn }
            });

            // Get the range of cells and update selectedCells
            const newSelection = getCellsInRange(selectCellStartPosition, { row: newRow, column: newColumn });
            setState("selectedCells", newSelection);
        } else {
            // Select only the new cell and update both start and current positions
            selectCell(newRow, newColumn);
            let markMode = (state.mode as MarkMode);

            setState("mode", {
                ...markMode, // Preserve other properties in MarkMode
                selectCellStartPosition: { row: newRow, column: newColumn },
                selectCellPosition: { row: newRow, column: newColumn }
            });
        }
    };
    

    const selectedCell =  state.selectedCells[0]; // Assuming a single cell selection
    let { row, column } = selectedCell;

    if (event.deltaY > 0) {
	//console.log("wheel down");
	    if (row == state.cells.length) { return}
            moveSelection(row +1, column);
    } else {
	//console.log("wheel up");
	    if (row == 0) { return}
            moveSelection(row -1, column);
    }
}

