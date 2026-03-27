import { Component, For, createEffect, createSignal, onMount , onCleanup} from "solid-js";
import { state, setState } from "../StateManagement/Statemanager";
import CellRenderer from "./CellRenderer";
import { getViewportSize } from "./ViewPort";

const SpreadSheetRenderer: Component = () => {
    const updateViewportSize = () => {
        const viewSize = getViewportSize();
	
        setState("viewPort", {
            rowsInScreen: viewSize.rowsInScreen,
            columnInScreen: viewSize.columnInScreen
        })
       
    }

    let table_th;

    onMount(() => {
        window.addEventListener("resize", updateViewportSize);
	const col_resizes = container.querySelectorAll(".coll_");
	const row_resizes = container.querySelectorAll(".row_");
	console.log(col_resizes);
	console.log(row_resizes);
        table_th = container.getElementsByTagName("th");
        console.log(table_th)
	//createResizeColDiv();
    });


    // Generate column headers (A, B, C, ...)
    const columnHeaders = () => {
        const startCol = state.viewPort.viewPortTopLeftShownCell.column;
        const endCol = Math.min(state.cells[0]?.length || 0, startCol + state.viewPort.columnInScreen);
        return Array.from({ length: endCol - startCol }, (_, i) =>
            String.fromCharCode("A".charCodeAt(0) + startCol + i)
        );
    };

    onCleanup(() => {
	    console.log("onCleanup");

    });

    let container;


 const createResizeColDiv = () => {
    const resizes = container.querySelectorAll(".col_resize");
    resizes.forEach((ele) => {
      ele.remove();
    });
    let th_length = table_th.length;
    console.log("th_length", th_length);
    for (let i = 1; i <= th_length; i++) {
      let yDiv = document.createElement("div");
      yDiv.className = "col_resize tb_resize";
      yDiv.setAttribute("data-resizecol", i);
      let leftPos = i * this.th_width + 0.5;
      yDiv.style.cssText = "left: " + leftPos + "px;";
      container.append(yDiv);
    }
  }

/*
 const  createResizeRowDiv = () => {
    const resizes = this.container.querySelectorAll(".row_resize");
    resizes.forEach((ele) => {
      ele.remove();
    });
    //var th_length = this.table_th.length;
    //for (var i = 1; i <= th_length; i++) {
    let i = 1;
    this.table.childNodes.forEach((c) => {
      if (c.nodeName == "TR") {
        var xDiv = document.createElement("div");
        xDiv.className = "row_resize tb_resize";
        xDiv.setAttribute("data-resizerow", i);
        //var topPos = i * this.th_width + 0.5;
        var topPos = c.offsetTop + c.offsetHeight  -4;
        xDiv.style.cssText = "top: " + topPos + "px;";
        this.container.append(xDiv);
        i += 1;
      }
    })
  }
*/

    return (
      <div class="container"  ref={container} >
        <table>
            <thead>
                <tr>
                    <th></th> {/* Top-left empty cell */}
                    <For each={columnHeaders()}>
                        {(header) => <th class="coll_" >{header}</th>}
                    </For>
                </tr>
            </thead>
            <tbody>
                <For each={state.cells.slice(state.viewPort.viewPortTopLeftShownCell.row, state.viewPort.viewPortTopLeftShownCell.row + state.viewPort.rowsInScreen)}>
                    {(row, rowIndex) => (
                        <tr class="row_" id={"TR_" + rowIndex()}>
                            <td class="cellrow" id={"TH_" + rowIndex()}>{state.viewPort.viewPortTopLeftShownCell.row + rowIndex() + 1}</td> {/* Row header */}
                            <For each={row.slice(state.viewPort.viewPortTopLeftShownCell.column, state.viewPort.viewPortTopLeftShownCell.column + state.viewPort.columnInScreen)}>
                                {(cell, colIndex) => (
                                    <td class="tdcell" id= {"TD_" + rowIndex() + "_" + colIndex()}>
                                        <CellRenderer
                                            cell={cell}
                                            row={state.viewPort.viewPortTopLeftShownCell.row + rowIndex()}
                                            col={state.viewPort.viewPortTopLeftShownCell.column + colIndex()}
                                        />
                                    </td>
                                )}
                            </For>
                        </tr>
                    )}
                </For>
            </tbody>
        </table>
      </div>
    );
};

export default SpreadSheetRenderer;
