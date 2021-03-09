const search = document.querySelector("#crud-search input");
const add = document.querySelector("#crud-addData button");
const data_add = document.querySelector("#crud-addData input");
const table_item = document.querySelector("#crud-data .table #table-item");
const table = document.querySelector("#crud-data .table");

class Crud {
  constructor() {}
  add(val) {
    let html = `
        <tr>
        <td><input type="text"><label>${val}</label></td>
        <td><button type="button" class="btn btn-dark edit mx-2">Edit</button><button type="button" class="btn btn-dark delete">Delete</button></td>
        </tr>
            `;
    table_item.innerHTML += html;
    crud.count(table_item.rows.length);
  }

  count(val) {
    if (val < 1) {
      table.innerHTML = `<h3>No Records Found</h3>`;
    }
  }
  search(val) {
    Array.from(table_item.children)
      .filter((item) => !item.textContent.toLowerCase().includes(val))
      .forEach((item) => item.classList.add("filtered"));
    Array.from(table_item.children)
      .filter((item) => item.textContent.toLowerCase().includes(val))
      .forEach((item) => item.classList.remove("filtered"));
  }
  delete(val) {
    if (val.classList.contains("delete")) {
      val.parentElement.parentElement.remove();
    }
  }
  edit(val, a, b) {
    if (val.parentElement.parentElement.classList.contains("edit-mode")) {
      //console.log(1);
      a.innerText = b.value;
      val.innerText = "Edit";
    } else {
      b.value = a.innerText;
      val.innerText = "Save";
    }
    val.parentElement.parentElement.classList.toggle("edit-mode");
  }
}
add.addEventListener("click", () => {
  let term = data_add.value.trim();
  if (term.length) {
    crud.add(term);
    data_add.value = "";
  }
});
table_item.addEventListener("click", (e) => {
  crud.delete(e.target);
  crud.count(table_item.rows.length);
});
search.addEventListener("keyup", () => {
  const name = search.value.trim().toLowerCase();
  crud.search(name);
});
//console.log(edit_button);
table_item.addEventListener("click", (e) => {
  const editing = e.target;
  let editLabel = e.target.parentElement.parentElement.querySelector("label");
  let editInput = e.target.parentElement.parentElement.querySelector("input");
  if (e.target.tagName == "BUTTON") {
    crud.edit(editing, editLabel, editInput);
  }
});

//table rows count

let crud = new Crud();
