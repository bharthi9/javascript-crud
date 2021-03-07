const search = document.querySelector('#search input');
const add = document.querySelector('#add button');
const data_add = document.querySelector('#add input');
const table_item = document.querySelector('#table-data .table #table-item');


class Crud {
 constructor(){
     
 }
 add(val) {
    //console.log("add function",val);
    let html = 
    `
        <tr>
        <td><input type="text"><label>${val}</label></td>
        <td><button type="button" class="btn btn-dark edit mx-2">Edit</button><button type="button" class="btn btn-dark delete">Delete</button></td>
        </tr>
            `;
    table_item.innerHTML+= html;
    
 }
 search(val) {
     Array.from(table_item.children)
        .filter((item) => !item.textContent.toLowerCase().includes(val))
        .forEach((item)=> item.classList.add('filtered'));
    Array.from(table_item.children)
        .filter((item) => item.textContent.toLowerCase().includes(val))
        .forEach((item)=> item.classList.remove('filtered'));
    

 }
 delete(val) {
     
    if(val.classList.contains('delete'))
    {
        val.parentElement.parentElement.remove();
    }

 }
 edit(val,a,b) {
     
     if(val.parentElement.parentElement.classList.contains('edit-mode'))
     {
         //console.log(1);
         a.innerText = b.value;
         val.innerText = 'Edit';
     }
     else{
         b.value = a.innerText;
         val.innerText = 'Save';
     }
     val.parentElement.parentElement.classList.toggle("edit-mode");
 }
}
add.addEventListener('click',(e)=>{
    let term = data_add.value.trim();
    if(term.length)
    {
        crud.add(term);
        data_add.value = '';
    }
 
});
table_item.addEventListener('click',(e)=>{
    crud.delete(e.target);
});
search.addEventListener('keyup',()=>{
    const name = search.value.trim().toLowerCase();
    crud.search(name);
});
//console.log(edit_button);
table_item.addEventListener('click',(e)=>{
        const editing = e.target;
        let editLabel = e.target.parentElement.parentElement.querySelector('label');
         let editInput = e.target.parentElement.parentElement.querySelector('input');
        if(e.target.tagName == 'BUTTON')
        {
            crud.edit(editing,editLabel,editInput);
        }
      
    });

let crud = new Crud();