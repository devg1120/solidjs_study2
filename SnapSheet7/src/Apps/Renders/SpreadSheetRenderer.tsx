import { Component, For, createEffect, createSignal, onMount , onCleanup} from "solid-js";
import { state, setState } from "../StateManagement/Statemanager";
import CellRenderer from "./CellRenderer";
import { getViewportSize } from "./ViewPort";

import { handleMouseWheel } from "../Handlers/MouseWheelHandler";

//import "./table.css";

const SpreadSheetRenderer: Component = () => {

const [isOnline, setIsOnline] = createSignal(false);

    const updateViewportSize = () => {
        const viewSize = getViewportSize();
	
        setState("viewPort", {
            rowsInScreen: viewSize.rowsInScreen,
            columnInScreen: viewSize.columnInScreen
        })
       
    }

    let table;

    //table.addEventListener("wheel", handleMouseWheel);

    let table_th;

    let th_width;

    const setValue = () => {
      table_th = container.getElementsByTagName("th");
      var elm_bound = table.getBoundingClientRect();
      var table_wt = elm_bound.width;
      var th_length = table_th.length;
      th_width = table_wt / th_length;

      setState("cells", 0, 3, "width", 160);
      setState("cells", 5, 0, "height", 60);

      setState("cells", 0, 10, "width", 60);
      setState("cells", 15, 0, "height", 40);
    };

    onMount(() => {
        window.addEventListener("resize", updateViewportSize);
	const col_resizes = container.querySelectorAll(".coll_");
	const row_resizes = container.querySelectorAll(".row_");
	//console.log(col_resizes);
	//console.log(row_resizes);
	setValue();
        //createResizeColDiv();
        //createResizeRowDiv("onMount");
        table.addEventListener("wheel", handleMouseWheel);
       //setIsOnline(true); 
    });


    // Generate column headers (A, B, C, ...)
    const columnHeaders__ = () => {
        const startCol = state.viewPort.viewPortTopLeftShownCell.column;
        const endCol = Math.min(state.cells[0]?.length || 0, startCol + state.viewPort.columnInScreen);
        return Array.from({ length: endCol - startCol }, (_, i) =>
            String.fromCharCode("A".charCodeAt(0) + startCol + i)
        );
    };

    const columnHeaders = () => {
        //setState("cells", 0, 3, "width", 160);
        //setState("cells", 5, 0, "height", 60);

        //setState("cells", 5, 3, "width", 160);
        //setState("cells", 5, 3, "height", 60);

        //console.log(state.cells[0][3].width) ;
        const startCol = state.viewPort.viewPortTopLeftShownCell.column;
        const endCol = Math.min(state.cells[0]?.length || 0, startCol + state.viewPort.columnInScreen);
        //const endCol = Math.min(state.cells[0].data?.length || 0, startCol + state.viewPort.columnInScreen);
        return Array.from({ length: endCol - startCol }, (_, i) => {
            const str = String.fromCharCode("A".charCodeAt(0) + startCol + i)
            return {
              label: str,
	      //width: 80*(i+1)*0.5,
	      width: state.cells[0][startCol + i].width,
	      }
	   }
        );
    };

    onCleanup(() => {
	    console.log("onCleanup");
            //createResizeRowDiv("onCleanup");

    });

    let container;


createEffect(() => {
  let start_row = state.viewPort.viewPortTopLeftShownCell.row;
 createResizeRowDiv("effect viewPort row");

})

createEffect(() => {
  let start_col =  state.viewPort.viewPortTopLeftShownCell.column;
 createResizeColDiv("effect viewPort col");

})
createEffect(() => {
let on =  isOnline()
 createResizeRowDiv("effect online");


})


 const createResizeColDiv__ = () => {
    const resizes = container.querySelectorAll(".col_resize");
    resizes.forEach((ele) => {
      ele.remove();
    });
    let th_length = table_th.length;
    const cr_width = 57; //cellrow wisth
    //console.log("th_length", th_length);
    for (let i = 1; i <= th_length; i++) {
      let yDiv = document.createElement("div");
      yDiv.className = "col_resize tb_resize";
      yDiv.setAttribute("data-resizecol", i);
      let leftPos = i * th_width + 0.5 ;
      yDiv.style.cssText = "left: " +  leftPos + "px;";
      container.append(yDiv);
    }
  }

 const createResizeColDiv = () => {
    const resizes = container.querySelectorAll(".col_resize");
    resizes.forEach((ele) => {
      ele.remove();
    });
    let th_length = table_th.length;
    //const cr_width = 57; //cellrow wisth
    //console.log("th_length", th_length);
    let i = 0;
    const thead = table.querySelector("thead");
    const th = thead.childNodes[0];
    th.childNodes.forEach((c) => {
      if (c.nodeName == "TH") {
	i++;
        if ( i == 1) { return; }
        console.log(c)
        let yDiv = document.createElement("div");
        yDiv.className = "col_resize tb_resize";
        yDiv.setAttribute("data-resizecol", i);
        //let leftPos = i * th_width + 0.5 ;
        var leftPos = c.offsetLeft + c.offsetWidth  -4;
        yDiv.style.cssText = "left: " +  leftPos + "px;";
        container.append(yDiv);
      }
    })
    /*
    for (let i = 1; i <= th_length; i++) {
      let yDiv = document.createElement("div");
      yDiv.className = "col_resize tb_resize";
      yDiv.setAttribute("data-resizecol", i);
      //let leftPos = i * th_width + 0.5 ;
      var leftPos = c.offsetLeft + c.offsetWidth  -4;
      yDiv.style.cssText = "left: " +  leftPos + "px;";
      container.append(yDiv);
    }
   */
  }

 const  createResizeRowDiv = (cose) => {
     console.log("createResizeRowDiv", cose)
    //let startRow = state.viewPort.viewPortTopLeftShownCell.row;
    const resizes = container.querySelectorAll(".row_resize");
    resizes.forEach((ele) => {
      ele.remove();
    });
    //var th_length = this.table_th.length;
    //for (var i = 1; i <= th_length; i++) {
    let i = 1;
    //table.childNodes.forEach((c) => {
    const tbody = table.querySelector("tbody");
    tbody.childNodes.forEach((c) => {
      //console.log(c.nodeName );
      if (c.nodeName == "TR") {
        //console.log("TR")
        var xDiv = document.createElement("div");
        xDiv.className = "row_resize tb_resize";
        xDiv.setAttribute("data-resizerow", i);
        //var topPos = i * this.th_width + 0.5;
        var topPos = c.offsetTop + c.offsetHeight  -4;
        xDiv.style.cssText = "top: " + topPos + "px;";
        container.append(xDiv);
        i += 1;
      }
    })
  }

    return (
      <div class="container"  ref={container} style="position:relative;">
        <table ref={table} >
            <thead>
                <tr>
                    <th></th> {/* Top-left empty cell */}
                    <For each={columnHeaders()}>
                        {(header) => <th class="coll_" width={header.width} >{header.label}</th>}
                    </For>
                </tr>
            </thead>
            <tbody>
                <For each={state.cells.slice(state.viewPort.viewPortTopLeftShownCell.row, state.viewPort.viewPortTopLeftShownCell.row + state.viewPort.rowsInScreen)}>
                    {(row, rowIndex) => (
                        <tr class="row_" id={"TR_" + rowIndex()} height={state.cells[state.viewPort.viewPortTopLeftShownCell.row + rowIndex()][0].height}>
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
