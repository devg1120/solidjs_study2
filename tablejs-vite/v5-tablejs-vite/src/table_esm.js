import './styles.css';
//import EditorJS from '@editorjs/editorjs';
//import Header from '@editorjs/header'
//import List from '@editorjs/list'
//import Quote from '@editorjs/quote'
//import ColorPlugin  from 'editorjs-text-color-plugin'
import 'suneditor/dist/css/suneditor.min.css'
// import 'suneditor/assets/css/suneditor.css'
// import 'suneditor/assets/css/suneditor-contents.css'
import './styles.css';

import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'

// How to import plugins
import image from 'suneditor/src/plugins/dialog/link'
import list from 'suneditor/src/plugins/submenu/list'
import {font, video} from 'suneditor/src/plugins'

export class Table {
  col_element;
  next_element;
  y_cursorStart;
  x_cursorStart;
  y_dragStart;
  x_dragStart;
  width;
  height;
  th_width;
  next_width;
  next_height;
  resize;
  resize_left;
  table_wt;
  resizeCheck;
  dragging_row;

  constructor(container_id) {
    this.container_id = container_id;
    
    this.menu_list = [
      ["next insert row", this.next_insert_row],
      ["prev insert row", this.prev_insert_row],
      ["left insert col", this.left_insert_col],
      ["right insert col", this.right_insert_col],
      ["data dump", this.data_dump],
      ["data save", this.data_save],
    ];
    //this.test_set_data2();
    //this.test_json_to_data();
    //this.test_json_to_data2();
    this.td_select_drag_start = false;
    this.editor = null;       
    this.editting_td = null;

  }


  test_set_data() {

    var items = [
      {
        index: { diameter: "int" , neighbourhood: "string" },
        model: "hug.tree",
        pk: 345,
      },
      {
        fields: { diameter: 23.0, neighbourhood: "WEST END" },
        model: "hug.tree",
        pk: 345,
      },
      {
        fields: { diameter: 14.0, neighbourhood: "MOUNT PLEASANT" },
        model: "hug.tree",
        pk: 484,
      },
      {
        fields: { neighbourhood: "MOUNT PLEASANT" },
        model: "hug.tree",
        pk: 484,
      },
      {
        fields: { diameter: 14.0  },
        model: "hug.tree",
        pk: 484,
      },
      {
        fields: {   },
        model: "hug.tree",
        pk: 484,
      },
    ];
    
    var  index = {};
    var  result = [];

    result.push([]);
    for (var key in items[0].index) {
      result[result.length - 1].push(key);
      index[key] = items[0].index[key];
    }
    var i = 0;
    while (i < items.length) {
      if (items[i].fields) {
        result.push([]);
        //for (var key in items[i].fields) {
        for (var key in index) {
          result[result.length - 1].push(items[i].fields[key]);
          /*
	  // default set mode
          if (items[i].fields[key] == undefined) {
		  if ( index[key] == "int" ) { 
			  result[result.length - 1].push(0);
		  } else if ( index[key] == "string" ) { 
			  result[result.length - 1].push("");
		  } else {
                          result[result.length - 1].push(items[i].fields[key]);
		  }
	  } else {
             result[result.length - 1].push(items[i].fields[key]);
	  }
	  */
        }
      }
      i++;
    }
    console.log(index);
    console.log(result);

  }

  test_set_data2() {
/*
 [
 ["Id","First Name","Last Name","Age"],
 ["1","Gowri","Prasanth","24"],
 ["2","Saravana","vel","24"],
 ["3","Kumar","KG","24"]
 ]

 */
    var items = [
      {
	index: { id: "int" , first_name: "string" , last_name: "string", age: "int"},
	title:  { id: "Id" , first_name: "First Name" , last_name: "Last Name", age: "Age"},
        pk: 345,
      },
      {
	fields: { id: 1 , first_name: "Gowri" , last_name: "Prasanth", age: 24},
        model: "hug.tree",
        pk: 345,
      },
      {
	fields: { id: 2 , first_name: "Saravana" , last_name: "vel", age: 31},
        model: "hug.tree",
        pk: 484,
      },
      {
	fields: { id: 3 , first_name: "Kumar" , last_name: "KG", age: 64},
        model: "hug.tree",
        pk: 484,
      },
    ];
    
    var  index = {};
    var  result = [];

    result.push([]);
    for (var key in items[0].index) {
      //result[result.length - 1].push(key);
      index[key] = items[0].index[key];
    }
    for (var key in items[0].title) {
      result[result.length - 1].push(items[0].title[key]);
    }
    var i = 0;
    while (i < items.length) {
      if (items[i].fields) {
        result.push([]);
        //for (var key in items[i].fields) {
        for (var key in index) {
          result[result.length - 1].push(items[i].fields[key]);
          /*
	  // ,"shift-key
          if (items[i].fields[key] == undefined) {
		  if ( index[key] == "int" ) { 
			  result[result.length - 1].push(0);
		  } else if ( index[key] == "string" ) { 
			  result[result.length - 1].push("");
		  } else {
                          result[result.length - 1].push(items[i].fields[key]);
		  }
	  } else {
             result[result.length - 1].push(items[i].fields[key]);
	  }
	  */
        }
      }
      i++;
    }
    console.log(index);
    console.log(result);
  }

  test_json_to_data() {
    var obj = [
      {
	index: { id: "int" , first_name: "string" , last_name: "string", age: "int"},
	title:  { id: "Id" , first_name: "First Name" , last_name: "Last Name", age: "Age"},
        pk: 345,
      },
      {
	fields: { id: 1 , first_name: "Gowri" , last_name: "Prasanth", age: 24},
        model: "hug.tree",
        pk: 345,
      },
      {
	fields: { id: 2 , first_name: "Saravana" , last_name: "vel", age: 31},
        model: "hug.tree",
        pk: 484,
      },
      {
	fields: { id: 3 , first_name: "Kumar" , last_name: "KG", age: 64},
        model: "hug.tree",
        pk: 484,
      },
    ];
   console.log(JSON.stringify(obj))
  }

  test_json_to_data2() {
   let json_data = `
        [
	   {"index":{"id":"int","first_name":"string","last_name":"string","age":"int"},
	    "title":{"id":"Id","first_name":"First Name","last_name":"Last Name","age":"Age"},
	    "pk":345
	    },
	   {"fields":{"id":1,"first_name":"Gowri","last_name":"Prasanth","age":24},
	    "model":"hug.tree",
	    "pk":345
	    },
	   {"fields":{"id":2,"first_name":"Saravana","last_name":"vel","age":31},
	    "model":"hug.tree",
	    "pk":484
	    },
	   {"fields":{"id":3,"first_name":"Kumar","last_name":"KG","age":64},
	    "model":"hug.tree",
	    "pk":484
	    }
         ]
   `;

   let obj = JSON.parse(json_data);
   console.log(obj);
   let array = this.table_json_to_array(json_data);
   console.log(array);
  }

  table_json_to_array(json) {
    let items = JSON.parse(json);
    var  index = {};
    var  result = [];

    result.push([]);
    for (var key in items[0].index) {
      //result[result.length - 1].push(key);
      index[key] = items[0].index[key];
    }
    for (var key in items[0].title) {
      result[result.length - 1].push(items[0].title[key]);
    }
    var i = 0;
    while (i < items.length) {
      if (items[i].fields) {
        result.push([]);
        //for (var key in items[i].fields) {
        for (var key in index) {
          result[result.length - 1].push(items[i].fields[key]);
          /*
	  // default set mode
          if (items[i].fields[key] == undefined) {
		  if ( index[key] == "int" ) { 
			  result[result.length - 1].push(0);
		  } else if ( index[key] == "string" ) { 
			  result[result.length - 1].push("");
		  } else {
                          result[result.length - 1].push(items[i].fields[key]);
		  }
	  } else {
             result[result.length - 1].push(items[i].fields[key]);
	  }
	  */
        }
      }
      i++;
    }
    //console.log(index);
    //console.log(result);
    var  index = {};
    var  result = [];

    result.push([]);
    for (var key in items[0].index) {
      //result[result.length - 1].push(key);
      index[key] = items[0].index[key];
    }
    for (var key in items[0].title) {
      result[result.length - 1].push(items[0].title[key]);
    }
    var i = 0;
    while (i < items.length) {
      if (items[i].fields) {
        result.push([]);
        //for (var key in items[i].fields) {
        for (var key in index) {
          result[result.length - 1].push(items[i].fields[key]);
          /*
	  // default set mode
          if (items[i].fields[key] == undefined) {
		  if ( index[key] == "int" ) { 
			  result[result.length - 1].push(0);
		  } else if ( index[key] == "string" ) { 
			  result[result.length - 1].push("");
		  } else {
                          result[result.length - 1].push(items[i].fields[key]);
		  }
	  } else {
             result[result.length - 1].push(items[i].fields[key]);
	  }
	  */
        }
      }
      i++;
    }
    //console.log(index);
    //console.log(result);
    return result;
  }

row_dragging_start = (e) => {  
  this.dragging_row = e.target; 
}

row_dragging_over = (e) => {
  e.preventDefault(); 
  
  let children= Array.from(e.target.parentNode.parentNode.children);
  
  if(children.indexOf(e.target.parentNode)>children.indexOf(this.dragging_row))
    e.target.parentNode.after(this.dragging_row);
  else
    e.target.parentNode.before(this.dragging_row);
}

  table_build(table_data){
    var menu = document.createElement("div");
    menu.id = "context-menu";
    var table = document.createElement("table");
    table.id = "table_resize";
    table.contentEditable = true;
    for (var i = 0; i < table_data.length; i++) {
      var tr = document.createElement("tr");
       //tr.setattribute("draggable", true)                           // row drag move
       //tr.addeventlistener("dragstart", this.row_dragging_start);
       //tr.addeventlistener("dragover", this.row_dragging_over);
      for (var j = 0; j < table_data[0].length; j++) {
        if (i === 0) {
          var th = document.createElement("th");
          th.textContent = table_data[i][j];
          tr.appendChild(th);
        } else {
          var td = document.createElement("td");
          //td.textContent = table_data[i][j];
          td.innerHTML = table_data[i][j];
          td.classList.add("noselect");
          tr.appendChild(td);
	/*
           if ( i ==1 && j == 2) {
              var td = document.createElement("td");
              td.innerHTML = table_data[i][j];
              td.classList.add("noselect");
              tr.appendChild(td);
	   } else if ( i ==2 && j == 2) {
              var td = document.createElement("td");
              //td.textContent = table_data[i][j];
              td.innerHTML = table_data[i][j];
              td.classList.add("noselect");
              tr.appendChild(td);
               this.editor = this.make_editor(td);
	       this.editting_td = td;
		   //#container > #TD_2_2
	   } else {
              var td = document.createElement("td");
              td.textContent = table_data[i][j];
              td.classList.add("noselect");
              tr.appendChild(td);

	   }
	   */
        }
      }
      table.appendChild(tr);
    }
    this.container.appendChild(menu);
    this.container.appendChild(table);
  }

  init(json) {
    this.container = document.getElementById(this.container_id);
    let data = this.table_json_to_array(json);
    this.table_build(data);

    this.y_cursorStart = 0;
    this.x_cursorStart = 0;
    this.y_dragStart = false;
    this.x_dragStart = false;
    this.next_width = undefined;

    //this.container = document.getElementById("container");
    //this.container = document.getElementById(this.container_id);
    this.table = this.container.querySelector("#table_resize");

    //this.table.onselectstart = function() {
    //   console.log("onselectstart");
    //   return false;
    //}



    this.contextMenu = this.container.querySelector("#context-menu");
    this.table_th = this.table.getElementsByTagName("th");
    this.table_tr = this.table.getElementsByTagName("tr");

    this.bodyRect = document.body.getBoundingClientRect();
    this.tableRect = this.table.getBoundingClientRect();

    this.container.style.position = "relative";

    //this.select_td = null;
    this.select_td = [null,null];
    //this.tds = this.table.querySelectorAll("#table_resize  td");
    this.tds = this.table.querySelectorAll("td");

    this.table.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const { clientX: mouseX, clientY: mouseY } = event;

      //const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

      this.contextMenu.classList.remove("visible");

      //contextMenu.style.top = `${normalizedY}px`;
      //contextMenu.style.left = `${normalizedX}px`;
      this.contextMenu.style.top = `${mouseY}px`;
      this.contextMenu.style.left = `${mouseX}px`;

      setTimeout(() => {
        this.contextMenu.classList.add("visible");
      });
    });

    this.table.addEventListener("click", (e) => {
      //console.log("click", this.container_id);
      // ? close the menu if the user clicks outside of it
      if (e.target.offsetParent != this.contextMenu) {
        this.contextMenu.classList.remove("visible");
      }
    });

    this.container.addEventListener("resize", (e) => {
      console.log("resize", this.container_id);
    });
    //  }

    //  init() {
    this.menu_setup2();
    this.table_setid();
    //this.table_dump();
    this.setTdWidth(this.table);
    this.createResizeColDiv();
    this.createResizeRowDiv();
    this.initEvents(this.table_th);
  }

  table_rows() {
    return this.table.rows.length;
  }

  table_cells() {
    return this.table.rows[0].cells.length;
  }

  next_insert_row = () => {
    this.contextMenu.classList.remove("visible");
    if (this.select_td[0] == null) {
      return;
    }

    let param = this.select_td[0].id.split("_");
    let row_num = parseInt(param[1]);
    let tr = this.table.insertRow(row_num + 1);
    tr.style.height = "35px";
    for (let c = 0; c < this.table_cells(); c++) {
      let newCell = tr.insertCell();
      let newText = document.createTextNode("");
      newCell.appendChild(newText);
    }
    this.table_setid();
  };

  prev_insert_row = () => {
    this.contextMenu.classList.remove("visible");
    if (this.select_td[0] == null) {
      return;
    }
    let param = this.select_td[0].id.split("_");
    let row_num = parseInt(param[1]);
    let tr = this.table.insertRow(row_num);
    tr.style.height = "35px";
    for (let c = 0; c < this.table_cells(); c++) {
      let newCell = tr.insertCell();
      let newText = document.createTextNode("");
      newCell.appendChild(newText);
    }
    this.table_setid();
  };

  left_insert_col = () => {
    this.contextMenu.classList.remove("visible");
    if (this.select_td[0] == null) {
      return;
    }
    let param = this.select_td[0].id.split("_");
    let col_num = parseInt(param[2]);
    //let tbody = this.table.childNodes[1]; //tbody
    let r = 0;
    //tbody.childNodes.forEach((tr) => {
    this.table.childNodes.forEach((tr) => {
      //console.log("nodeName", c.nodeName);
      if (tr.nodeName == "TR") {
        if (r == 0) {
          var th = document.createElement("th");
          //th.style.width = "125px";
          //const right = document.querySelector("#TH_0_" + String(col_num));
          const right = this.table.querySelector("#TH_0_" + String(col_num));
          tr.insertBefore(th, right);
        } else {
          tr.insertCell(col_num);
        }
        r += 1;
      }
    });
    this.table_setid();
    this.table_th = this.table.getElementsByTagName("th");
    //setTdWidth(table);
    this.createResizeColDiv();
    this.initEvents(this.table_th);
  };

  right_insert_col = () => {
    this.contextMenu.classList.remove("visible");
    if (this.select_td[0] == null) {
      return;
    }
    let param = this.select_td[0].id.split("_");
    let col_num = parseInt(param[2]);
    //let tbody = this.table.childNodes[1]; //tbody
    let r = 0;
    //tbody.childNodes.forEach((tr) => {
    this.table.childNodes.forEach((tr) => {
      //console.log("nodeName", c.nodeName);
      if (tr.nodeName == "TR") {
        if (r == 0) {
          var th = document.createElement("th");
          //th.style.width = "125px";
          const right = this.table.querySelector(
            "#TH_0_" + String(col_num + 1),
          );
          tr.insertBefore(th, right);
        } else {
          tr.insertCell(col_num + 1);
        }
        r += 1;
      }
    });
    this.table_setid();
    this.table_th = this.table.getElementsByTagName("th");
    //setTdWidth(table);
    this.createResizeColDiv();
    this.initEvents(this.table_th);
  };

  data_dump = () => {
    this.contextMenu.classList.remove("visible");
    console.log("data_dump", this.container_id);

    //let tbody = this.table.childNodes[1]; //tbody
    let r = 0;
    //tbody.childNodes.forEach((c) => {
    this.table.childNodes.forEach((c) => {
      //console.log("nodeName", c.nodeName);
      if (c.nodeName == "TR") {
        let id = `TR_${r}`;
        let d = 0;
        c.childNodes.forEach((c) => {
          //console.log("   nodeName", c.nodeName);
          if (c.nodeName == "TH") {
            let id = `TH_${r}_${d}`;
		  console.log(id, c.innerText)
            d += 1;
          }
          if (c.nodeName == "TD") {
            let id = `TD_${r}_${d}`;
		  console.log(id, c.innerText)
            d += 1;
          }
        });
        r += 1;
      }
    });
  };

  data_save = () => {
    this.contextMenu.classList.remove("visible");
    console.log("data_save", this.container_id);

    const rows = this.table.rows.length;;
    const cols = this.table.rows[0].cells.length
    const data = Array.from({ length: rows }, () => new Array(cols).fill(0));

    let tbody = this.table.childNodes[1]; //tbody
    let r = 0;
    tbody.childNodes.forEach((c) => {
      //console.log("nodeName", c.nodeName);
      if (c.nodeName == "TR") {
        let id = `TR_${r}`;
        let d = 0;
        if ( r == 0 ) {
                c.childNodes.forEach((c) => {
                    if (c.nodeName == "TH") {
	              //console.log(id, c.innerText)
	              data[r][d] = c.innerText
                      d += 1;
	            }
                });
	} else {
                c.childNodes.forEach((c) => {
                    if (c.nodeName == "TD") {
	              //console.log(id, c.innerText)
	              data[r][d] = c.innerText
                      d += 1;
	            }
                });
	}
        r += 1;
      }
    });

    console.log(data);
    var _json = JSON.stringify(data);
    console.log(_json);

  };

  menu_setup() {
    //console.log("menu_setup");
    const div = document.createElement("div");
    const text = document.createTextNode("next insert row");
    div.appendChild(text);
    div.classList.add("item");
    div.addEventListener("click", () => {
      console.log("*****Clicked");
    });
    menu.appendChild(div);
  }

  menu_setup2() {
    this.menu_list.forEach((item) => {
      //console.log(item[0]);
      //console.log(item[1]);
      const div = document.createElement("div");
      const text = document.createTextNode(item[0]);
      div.appendChild(text);
      div.classList.add("item");
      div.addEventListener("click", item[1]);
      //this.menu.appendChild(div);
      this.contextMenu.appendChild(div);
    });
  }

  table_setid() {
	  //console.log("table_set_id");
    let tbody = this.table.childNodes[1]; //tbody
    let r = 0;
    //tbody.childNodes.forEach((c) => {
    this.table.childNodes.forEach((c) => {
      //console.log("nodeName", c.nodeName);
      if (c.nodeName == "TR") {
        c.id = `TR_${r}`;
        let d = 0;
        c.childNodes.forEach((c) => {
          //console.log("   nodeName", c.nodeName);
          if (c.nodeName == "TH") {
            c.id = `TH_${r}_${d}`;
            d += 1;
          }
          if (c.nodeName == "TD") {
            c.id = `TD_${r}_${d}`;
            d += 1;
          }
        });
        r += 1;
      }
    });
    //tds = document.querySelectorAll("#table_resize  td");
    this.tds = this.table.querySelectorAll("td");
    this.tds.forEach((td) => {
      td.removeEventListener("dblclick", null);
      td.addEventListener("dblclick", (e) => {
        if (this.editor != null) {
	       let content = this.editor.getContents(true);
               this.editor.destroy()
               this.editting_td.innerHTML = content;
               this.editting_td.style.display = "";
               this.editor = null;       
               this.editting_td = null;
	}
        this.editor = this.make_editor(td);
        this.editting_td = td;
      });
      td.removeEventListener("mousedown", null);
      td.addEventListener("mousedown", (e) => {
        console.log("td mousedown", e.button);
        if (this.editor != null) {
	       let content = this.editor.getContents(true);
               this.editor.destroy()
               this.editting_td.innerHTML = content;
               this.editting_td.style.display = "";
               this.editor = null;       
               this.editting_td = null;
	}
        if (e.button !== 0) { return }
        if(e.shiftKey){
              console.log("td click","shift-key");
              if (this.select_td[1] != null) {
		this.multi_select_unset();
	      }
              this.select_td[1] = td;
              this.multi_select_set();
              return;
        }
        this.td_select_drag_start = true;
        if (this.select_td[1] != null) {
		this.multi_select_unset();
        }
        if (this.select_td[0] != null) {
          this.select_td[0].classList.remove("selected");
        }
        this.select_td[0] = td;
        this.select_td[0].classList.add("selected");
/*
        if (this.editor != null) {
	       let content = this.editor.getContents(true);
               this.editor.destroy()
               this.editting_td.innerHTML = content;
               this.editting_td.style.display = "";
               this.editor = null;       
               this.editting_td = null;
	}
        this.editor = this.make_editor(td);
        this.editting_td = td;
*/
      });
      td.addEventListener("mouseenter", (e) => {
           if (this.td_select_drag_start) {
                  //console.log("mouseenter", td.id);
                  this.select_td[1] = td;
                  this.multi_select_set();
	   }
      });
    });
  }

  select_id_gen( r1, r2, c1, c2) {
       let list = [];
       for ( let r = r1; r <= r2 ; r++) {
            for (let  c = c1; c <= c2 ; c++) {
          	  let id = "TD_" + r + "_" + c;
          	  list.push(id)
            }
       }
       return list;
  }

  multi_select_set() {
       let param1 = this.select_td[0].id.split("_");
       let param2 = this.select_td[1].id.split("_");
       let r1 =parseInt( param1[1]);
       let c1 =parseInt( param1[2]);
       let r2 =parseInt( param2[1]);
       let c2 =parseInt( param2[2]);
       //console.log(r1,c1,r2,c2)
       let select_list = [];
       if ( r1 < r2 ) {
            if ( c1 < c2 ) {
               //console.log("bottom-right");
	       select_list = this.select_id_gen(r1, r2, c1, c2);
	    } else if ( c1 == c2 ) {
               //console.log("bottom");
	       select_list = this.select_id_gen(r1, r2, c1, c2);
            } else {
               //console.log("bottom-left");
	       select_list = this.select_id_gen(r1, r2, c2, c1);
	    }
       } else if ( r1 == r2 ) {
            if ( c1 < c2 ) {
               //console.log("right");
	       select_list = this.select_id_gen(r1, r2, c1, c2);
	    } else if ( c1 == c2 ) {
               //console.log("same");
            } else {
               //console.log("left");
	       select_list = this.select_id_gen(r1, r2, c2, c1);
	    }
       } else {
            if ( c1 < c2 ) {
               //console.log("top-right");
	       select_list = this.select_id_gen(r2, r1, c1, c2);
	    } else if ( c1 == c2 ) {
               //console.log("top");
	       select_list = this.select_id_gen(r2, r1, c1, c2);
            } else {
               //console.log("top-left");
	       select_list = this.select_id_gen(r2, r1, c2, c1);
	    }

       }
	  //console.log(select_list);
	  select_list.forEach((id) => {
             const td = this.table.querySelector("#" + id);
             td.classList.add("selected");
	  });
  }
  multi_select_unset() {
       let param1 = this.select_td[0].id.split("_");
       let param2 = this.select_td[1].id.split("_");
       let r1 =parseInt( param1[1]);
       let c1 =parseInt( param1[2]);
       let r2 =parseInt( param2[1]);
       let c2 =parseInt( param2[2]);
      // console.log(r1,c1,r2,c2)
       let select_list = [];
       if ( r1 < r2 ) {
            if ( c1 < c2 ) {
               //console.log("bottom-right");
	       select_list = this.select_id_gen(r1, r2, c1, c2);
	    } else if ( c1 == c2 ) {
               //console.log("bottom");
	       select_list = this.select_id_gen(r1, r2, c1, c2);
            } else {
               //console.log("bottom-left");
	       select_list = this.select_id_gen(r1, r2, c2, c1);
	    }
       } else if ( r1 == r2 ) {
            if ( c1 < c2 ) {
               //console.log("right");
	       select_list = this.select_id_gen(r1, r2, c1, c2);
	    } else if ( c1 == c2 ) {
               //console.log("same");
            } else {
               //console.log("left");
	       select_list = this.select_id_gen(r1, r2, c2, c1);
	    }
       } else {
            if ( c1 < c2 ) {
               //console.log("top-right");
	       select_list = this.select_id_gen(r2, r1, c1, c2);
	    } else if ( c1 == c2 ) {
               //console.log("top");
	       select_list = this.select_id_gen(r2, r1, c1, c2);
            } else {
               //console.log("top-left");
	       select_list = this.select_id_gen(r2, r1, c2, c1);
	    }

       }
	  //console.log(select_list);
	  select_list.forEach((id) => {
             const td = this.table.querySelector("#" + id);
             td.classList.remove("selected");
	  });
       this.select_td[1] = null;
  }

  table_dump() {
    console.log("table rows len", this.table.rows.length);
    console.log("table cells len", this.table.rows[0].cells.length);

    let tbody = this.table.childNodes[1]; //tbody
    let r = 0;
    tbody.childNodes.forEach((c) => {
      //console.log("nodeName", c.nodeName);
      if (c.nodeName == "TR") {
        console.log(c.nodeName);
        let d = 0;
        c.childNodes.forEach((c) => {
          //console.log("   nodeName", c.nodeName);
          if (c.nodeName == "TH") {
            console.log(" ", c.nodeName, r, d);
            d += 1;
          }
          if (c.nodeName == "TD") {
            console.log(" ", c.nodeName, r, d);
            d += 1;
          }
        });
        r += 1;
      }
    });
  }

  //=======================================================================
  mouseDown_y = (e) => {
    //this.resize = this;
    this.resize = e.target;
    this.resizeCheck = this.resize.classList.contains("y_resize");
    var col_index = parseInt(this.resize.getAttribute("data-resizecol")) - 1;
    this.col_element = this.table_th[col_index];
    this.next_element = this.table_th[col_index + 1];
    this.y_dragStart = true;
    this.y_cursorStart = this.resizeCheck ? event.pageX : event.pageY;
    var elm_bound = this.col_element.getBoundingClientRect();
    this.width = elm_bound.width;
    this.table_wt = this.table.offsetWidth;
    if (this.next_element != undefined) {
      var next_bound = this.next_element.getBoundingClientRect();
      this.next_width = next_bound.width;
    }
    //this.resize_left = this.getBoundingClientRect().left - bodyRect.left;
    this.resize_left =
      //this.resize.getBoundingClientRect().left - this.bodyRect.left - this.tableRect.left;
      this.resize.getBoundingClientRect().left - this.tableRect.left;
  };

  mouseMove_y = () => {
    if (this.y_dragStart) {
      var cursorPosition = this.resizeCheck ? event.pageX : event.pageY;
      var mouseMoved = cursorPosition - this.y_cursorStart;
      var newLeft = this.resize_left + mouseMoved;
      var newWidth = this.width + mouseMoved;
      var new_nextWidth, new_nextHeight;
      if (this.next_element != undefined) {
        new_nextWidth = this.next_width - mouseMoved;
      }
      if (
        newWidth > 30 &&
        (new_nextWidth > 30 || this.next_element == undefined)
      ) {
        this.col_element.style.cssText = "width: " + newWidth + "px;";
        if (this.next_element != undefined) {
          this.next_element.style.cssText = "width: " + new_nextWidth + "px";
        } else {
          this.table.style.width = this.table_wt + mouseMoved + "px";
        }
        this.resize.style.cssText = "left: " + newLeft + "px;";
      }
    }
  };

  mouseUp_y = () => {
    //console.log(this.container_id, "mouseUp");
    if (this.y_dragStart) {
      this.y_dragStart = false;
    }
    if ( this.td_select_drag_start) {
       this.td_select_drag_start = false;
    }
  };

  //=======================================================================

  mouseDown_x = (e) => {
    //this.resize = this;
    this.resize = e.target;
    this.resizeCheck = this.resize.classList.contains("x_resize");
    var row_index = parseInt(this.resize.getAttribute("data-resizerow")) - 1;
	  console.log("row_index", row_index);
    this.row_element = this.table_tr[row_index];
    this.next_row_element = this.table_tr[row_index + 1];
	  console.log( this.next_row_element);
    this.x_dragStart = true;
    //this.x_cursorStart = this.resizeCheck ? event.pageX : event.pageY;
    this.x_cursorStart = this.resizeCheck ? event.pageY : event.pageX;
    var elm_bound = this.row_element.getBoundingClientRect();
    this.height = elm_bound.height;
    this.table_wt = this.table.offsetWidth;
    this.table_ht = this.table.offsetHight;
    //if (this.next_row_element != undefined) {
    //  var next_bound = this.next_row_element.getBoundingClientRect();
    //  this.next_width = next_bound.width;
    //}
    this.resize_top =
      this.resize.getBoundingClientRect().top - this.tableRect.top;
  };

  mouseMove_x = () => {
    if (this.x_dragStart) {
      //var cursorPosition = this.resizeCheck ? event.pageX : event.pageY;
      var cursorPosition = this.resizeCheck ? event.pageY : event.pageX;
      var mouseMoved = cursorPosition - this.x_cursorStart;

      var newTop = this.resize_top + mouseMoved;
      var newHeight = this.height + mouseMoved;
       //console.log("newTop",newTop);
       //console.log("newHeight",newHeight);

      var new_nextWidth, new_nextHeight;
      //if (this.next_element != undefined) {
      //  new_nextWidth = this.next_width - mouseMoved;
      //}
        this.row_element.style.cssText = "height: " + newHeight + "px;";
        if (this.next_row_element != undefined) {
         // this.next_row_element.style.cssText = "height: " + new_nextHeight + "px";
        } else {
          this.table.style.hight = this.table_wt + mouseMoved + "px";
        }
        this.resize.style.cssText = "top: " + newTop + "px;";
    }
  };

  mouseUp_x = () => {
    //console.log(this.container_id, "mouseUp");
    if (this.x_dragStart) {
      this.x_dragStart = false;
      this.resetResizeRowDiv()
    }
    if ( this.td_select_drag_start) {
       this.td_select_drag_start = false;
    }
  };


  //=======================================================================

/*
  initEvents(table_th) {
    var tb_resize = this.container.getElementsByClassName("tb_resize");
    //console.log(this.container_id, tb_resize.length);

    var th_length = this.table_th.length;
    for (var i = 0; i < th_length; i++) {
      document.body.addEventListener("mousemove", this.mouseMove);
      tb_resize[i].addEventListener("mousedown", this.mouseDown);
      //tb_resize[i].addEventListener("mouseup", this.mouseUp);
      document.body.addEventListener("mouseup", this.mouseUp);
      this.table_th[i].style.width = this.th_width + "px";
    }
  }
  */

  initEvents(table_th) {
    document.body.addEventListener("mousemove", this.mouseMove_y);
    document.body.addEventListener("mouseup", this.mouseUp_y);
    var y_resize = this.container.getElementsByClassName("y_resize");
    //console.log(this.container_id, tb_resize.length);

    var th_length = this.table_th.length;
    for (var i = 0; i < th_length; i++) {
      //document.body.addEventListener("mousemove", this.mouseMove_y);
      y_resize[i].addEventListener("mousedown", this.mouseDown_y);
      //document.body.addEventListener("mouseup", this.mouseUp_y);
      this.table_th[i].style.width = this.th_width + "px";
    }


     document.body.addEventListener("mousemove", this.mouseMove_x);
     document.body.addEventListener("mouseup", this.mouseUp_x);
     var x_resize = this.container.getElementsByClassName("x_resize");
     console.log("x_resize",x_resize.length);
     console.log("x_resize",typeof(x_resize));
     for ( let i = 0; i < x_resize.length; i++) {
       x_resize[i].addEventListener("mousedown", this.mouseDown_x);
     }

  }

  setTdWidth = () => {
    var elm_bound = this.table.getBoundingClientRect();
    var table_wt = elm_bound.width;
    var th_length = this.table_th.length;
    this.th_width = table_wt / th_length;
  };

  createResizeColDiv() {
    const resizes = this.container.querySelectorAll(".y_resize");
    resizes.forEach((ele) => {
      ele.remove();
    });
    var th_length = this.table_th.length;
    for (var i = 1; i <= th_length; i++) {
      var yDiv = document.createElement("div");
      yDiv.className = "y_resize tb_resize";
      yDiv.setAttribute("data-resizecol", i);
      var leftPos = i * this.th_width + 0.5;
      yDiv.style.cssText = "left: " + leftPos + "px;";
      this.container.append(yDiv);
    }
  }
  createResizeRowDiv() {
    const resizes = this.container.querySelectorAll(".x_resize");
    resizes.forEach((ele) => {
      ele.remove();
    });
    //var th_length = this.table_th.length;
    //for (var i = 1; i <= th_length; i++) {
    let i = 1;
    this.table.childNodes.forEach((c) => {
      if (c.nodeName == "TR") {
        var xDiv = document.createElement("div");
        xDiv.className = "x_resize tb_resize";
        xDiv.setAttribute("data-resizerow", i);
        //var topPos = i * this.th_width + 0.5;
        var topPos = c.offsetTop + c.offsetHeight  -4;
        xDiv.style.cssText = "top: " + topPos + "px;";
        this.container.append(xDiv);
        i += 1;
      }
    })
  }

  resetResizeRowDiv() {
	  
     function getTarget(list, num) {
        for ( let i= 0; i < list.length ; i++) {
           var row_index = parseInt(list[i].getAttribute("data-resizerow")) 
		if (row_index == num ) { return  list[i] }
        }
        return null
     }
     
    var x_resize = this.container.getElementsByClassName("x_resize");
    let i = 1;
    this.table.childNodes.forEach((c) => {
      if (c.nodeName == "TR") {
        var topPos = c.offsetTop + c.offsetHeight  -4;
        var target = getTarget(x_resize, i);
        //console.log(i, target);
        target.style.cssText = "top: " + topPos + "px;";
        i += 1;
      }
    })

  }

   make_editor(ele) {
        let editor = suneditor.create(ele, {
               plugins: plugins,
               mode: 'balloon',
                   //  ('classic', 'inline', 'balloon', 'balloon-always'). default: 'classic' {String}
           
               buttonList: [
                   //['undo', 'redo'],
                   //['font', 'fontSize', 'formatBlock'],
                   ['fontSize'],
                   //['paragraphStyle', 'blockquote'],
                   //['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                   ['bold', 'underline', 'italic'], 
                   ['fontColor', 'hiliteColor', 'textStyle'],
                   //['removeFormat'],
                   //'/', // Line break
                   //['outdent', 'indent'],
                   ['align', 'horizontalRule', 'list', 'lineHeight'],
                   //['table', 'link', 'image', 'video', 'audio' ], // You must add the 'katex' library at options to use the 'math' plugin.
                   //['fullScreen', 'showBlocks', 'codeView'],
                   //['preview', 'print'],
                   //['save', 'template'],
               ],
               resizingBar : false,
               showPathLabel: false,
               resizeEnable: false,
           })                                                                                                                               
	   return editor;
  }
} // class end

/*
const editor = new EditorJS({
 holderId: 'editorjs',
 tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              levels: [2, 3, 4],
              defaultLevel: 3,
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
    Color: {
      class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
      config: {
         colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
         defaultColor: '#FF1300',
         type: 'text', 
         customPicker: true // add a button to allow selecting any colour  
      }     
    },
   },
});
*/

/*
var node  = document.querySelector("#editorjs");
var editor = new Squire(node);
*/


let data4 = `
<p><span style="font-size: 24px"><span style="color: rgb(153, 0, 133)"><strong>SunEditor</strong></span></span></p>
<div class="se-component se-image-container __se__float-right">
   <figure style="margin: auto;">
      <img src="http://suneditor.com/docs/cat.jpg" data-align="right" alt="Tabby" data-rotate="" data-proportion="false" origin-size="640,426" data-origin="640,426" data-file-name="cat.jpg" data-file-size="0" data-size="," data-percentage="auto,auto" style="">
      <figcaption>
         <p>Insert description</p>
      </figcaption>
   </figure>
</div>
<h3>The Suneditor is based on pure JavaScript, with no dependencies.</h3>
<pre>Suneditor is a lightweight, flexible, customizable WYSIWYG text editor for your web applications.</pre>
<blockquote>
   <p>Supports Chrome, Safari, Opera, Firefox, Edge, IE11, Mobile web browser.</p>
</blockquote>
<p><strong><span style="color: rgb(255, 94, 0)">SunEditor</span></strong><em><span style="background-color: rgb(250, 237, 125)">distributed under</span></em>&nbsp;the <a href="https://github.com/JiHong88/SunEditor/blob/master/LICENSE.txt" target="_blank">MIT</a> license.</p>
<hr>
<p><span style="font-size: 16px"><span style="font-family: Impact">Table</span></span></p>

<table class="se-table-size-auto">
  <thead>
    <tr>
      <th>
        <div>Column_1</div>
      </th>
      <th>
        <div>Column_2</div>
      </th>
      <th>
        <div>Column_3</div>
      </th>
      <th>
        <div>Column_4</div>
      </th>
      <th>
        <div>Column_5</div>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
      <td>
        <div><br>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<p><br></p>
<ul>
   <li>Pasting from Microsoft Word and Excel.</li>
   <li>Custom table selection, merge and split.</li>
   <li>Media embed, images upload.</li>
   <li>
      Can use CodeMirror, KaTeX.    
      <ul>
         <li>And.. many other features :)</li>
      </ul>
   </li>
</ul>
<p><br></p>
`;


let ta = document.querySelector("#textarea")
ta.value = data4;


let editor = suneditor.create('textarea', {
    plugins: plugins,
    mode: 'balloon',
        //  ('classic', 'inline', 'balloon', 'balloon-always'). default: 'classic' {String}

    buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        '/', // Line break
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio' ], // You must add the 'katex' library at options to use the 'math' plugin.
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview', 'print'],
        ['save', 'template'],
    ],
    resizingBar : false,
    showPathLabel: false,
    resizeEnable: true,
})                                                                                                                               


    let c = document.querySelector("#container3");
    let t = c.querySelector("#TD_1_0");
console.log(c);
console.log(t);
/*
let editor2 = suneditor.create(t, {
    plugins: plugins,
    mode: 'balloon',
        //  ('classic', 'inline', 'balloon', 'balloon-always'). default: 'classic' {String}

    buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        '/', // Line break
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio' ], // You must add the 'katex' library at options to use the 'math' plugin.
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview', 'print'],
        ['save', 'template'],
    ],
    resizingBar : false,
    showPathLabel: false,
    resizeEnable: true,
})                                                                                                                               

*/

