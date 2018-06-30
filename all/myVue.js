new Vue({
    el: '#app',
    data: {
    todoList:JSON.parse( window.localStorage.getItem("todoList")||"[]"),
    Lists:JSON.parse( window.localStorage.getItem("listName")||"[]"),
    newItemName:"",
    newItemDate:"",
    newname:"",
    editor_ItemDate:"",
    editor_ItemName:"",
    editor_sign:false,
    editor_index:"",
    search_name:'',
    finshed:false,
    tittle:"To-Do"
    },
    watch:{
        todoList:function(){
            window.localStorage.setItem("todoList",JSON.stringify(this.todoList))
        },
        Lists:function(){
            window.localStorage.setItem("listName",JSON.stringify(this.Lists))
        }
    },
    
    
    computed:{
        show_matter: function(){
            var search = this.search_name;
            if(search){
                return this.todoList.filter(function(product) {
                    return Object.keys(product).some(function(key) {
                        return String(product[key]).toLowerCase().indexOf(search) > -1
                    })
                })
           }else if(this.finshed==false){
                var array = new Array();
                var j = 0;
                for(var i=0;i<this.todoList.length;i++){
                    if(this.todoList[i].isFinished==false){
                        array[j]=this.todoList[i];
                        j++;
                    }     
                }
                return array;
           }
           else{
            return this.todoList;
           }
        },
    },
    methods: {
        addItem:function(){
            if(this.editor_sign==true)
            {
                this.todoList[this.editor_index].date=this.newItemDate;
                this.todoList[this.editor_index].name=this.newItemName;
            }else{
                let newItem={
                    name:this.newItemName,
                    date:this.newItemDate,
                    isFinished:false 
                }
                this.todoList.push(newItem);
                this.newItemDate="";
                this.newItemName="";                    
            }
            this.editor_sign=false;
        },
        deleteItem:function(index){
            this.todoList.splice(index,1)
        },
        editor:function(index){
            this.editor_sign=true;
            this.editor_index=index;
            for(var i=0;i<this.todoList.length;i++){
                if(i==index){
                    this.newItemDate=this.todoList[i].date;
                    this.newItemName=this.todoList[i].name;
                }
            }
            this.newItemname="";
            this.newItemdate="";
           
        },
        addlist:function(){
            var list_name = document.getElementById('list_name').value;
			var id = parseInt(this.Lists.length) + 1;
			list.newList = {
				id:id,
				name:list_name,
			}
            this.Lists.push(list.newList);
        },
        finished:function(index){
            if(this.todoList[index].isFinished==false)
                this.todoList[index].isFinished=true
            else{
                this.todoList[index].isFinished=false;
            }
        },
        show_finished(){
            this.finshed=true;
        },
        hide_finished(){
            this.finshed=false;
        }
    }
  })