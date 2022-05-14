export class AppComponent{
  constructor(init){
    this.init = init;
    this.initial();
  }
  initial(){
    this.context = document.createElement(this.init.e);
    this.context.id = this.init.id;
  }
  setTitle(title){
    this.context.title = title;
  }
  setText(text){
    this.context.innerText = text;
  }

  border(){
    this.context.style.borderWidth = '1';
    this.context.style.borderStyle = 'solid';
    this.context.style.borderColor = 'red';
  }

  setClassNames(classList){
    this.context.classList.value = classList; 
  }
  getContext(){
    return this.context;
  }
  dir(){
    console.dir(this);
  }
}

export class AppContainer extends AppComponent{
  constructor(init){
    super(init);
  }
  setVisible(isVisible){
    this.context.hidden(!isVisible);
  }
  add(component){
   window.onload = function(){
    this.context.append(component.getContext());
  };
}
}


export class AppPage extends AppComponent{
  constructor(){
    super({});
    this.context = document.querySelector("#root");
  }
  getServerData(){
    return JSON.parse(this.context.dataset.content);
  }
  setVisible(isVisible){
    this.context.hidden(!isVisible);
  }
  add(component){
    window.onload = function(){
      this.context.append(component.getContext());
    };
  }
}


export class AppForm extends AppComponent{
  constructor(init){
    super({e: "form",id: init.id});
  }
  setVisible(isVisible){
    this.context.hidden(!isVisible);
  }
  add(component){
    window.onload = function(){
      this.context.append(component.getContext());
    };
  }
}


export class AppColumn extends AppComponent{
  constructor(init){
    super({e: "th",id: init.id});
  }
  setVisible(isVisible){
    this.context.hidden(!isVisible);
  }
}

export class AppData extends AppComponent{
  constructor(init){
    super({e: "td",id: init.id});
  }
  setVisible(isVisible){
    this.context.hidden(!isVisible);
  }
}

export class AppRow extends AppComponent{
  constructor(init){
    super({e: "tr",id: init.id});
    this.highlighter();
  }
  setSelectedRow(selectedRow){
    this.selectedRow = selectedRow;
  }
  
  getSelectedRow(){
    return this.selectedRow;
  }

  getRowData(){
    return this.rowData;
  }
  highlighter(){
    this.context.addEventListener("click",()=>{
      let selectedRow = this.context;
      console.log(selectedRow);
      selectedRow.classList.add("row-highlight");
      let siblings = selectedRow.parentNode.children;
      for(let i=0; i< siblings.length;i++){
        if (siblings.item(i) !== selectedRow){
          siblings.item(i).classList.remove("row-highlight");
        }
      }
      this.setSelectedRow(selectedRow);
    });
  }

  addRowData(rowData){
    this.rowData = rowData;
    let row = this.context;
    let thead = new AppComponent({e: "thead"});  
    this.rowData.map(function(data,index){
      let td = new AppData({id: `${row.id}-td-${index}`});
      td.setText(data);
      row.append(td.getContext());
    });
  }
  setVisible(isVisible){
    this.context.hidden(!isVisible);
  }
}



export class AppTable extends AppComponent{
  constructor(init){
    super({e: "table",id: init.id});
    this.columns = init.columns;
    this.rows = init.row;
  }
  setVisible(isVisible){
    this.context.hidden(!isVisible);
  }
  
  addColumns(columns){
    this.columns = columns;
    let table = this.context;
    let thead = new AppContainer({e: "thead",id:`${table.id}-thead`});
    this.columns.map(function(column,index){
      let th = new AppColumn({id: `${table.id}-tc-${index}`});
      th.setText(column);
      thead.add(th);
    });
    table.append(thead.getContext());
  }
  addRows(rows){
    this.rows = rows;
    let table = this.context;
    let tbody = new AppContainer({e: "tbody",id:`${table.id}-tbody`});  
    this.rows.map(function(rowData,index){
      let tr = new AppRow({id: `${table.id}-tr-${index}`});
      tr.addRowData(rowData);
      tbody.add(tr);
    });
    table.append(tbody.getContext());
  }
  add(component){
    window.onload = function(){
      this.context.append(component.getContext());
    };
  }
}
