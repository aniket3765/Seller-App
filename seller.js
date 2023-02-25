const form = document.querySelector('#btn');
const name= document.querySelector('#name');
const price = document.querySelector('#price');
const msg = document.querySelector(".msg");
const userList = document.querySelector('#user')
var objs = [];
function getAllUser(){
    axios.get("https://crudcrud.com/api/7c7b09c532bc4fccb7303c4537a160b7/newaniket")
    .then(res => showOutput(res))
    .catch(err => console.log(err)); 
}

function showOutput(res){
    objs = res.data;
    console.log(objs);
    for(let i=0;i<res.data.length;i++)
 {
    var li = document.createElement('li');
  // Add class
 
  // Add text node with input value
  li.appendChild(document.createTextNode(res.data[i].name));

  // Append li to list
  document.getElementById("items").appendChild(li);

  var deleteBtn = document.createElement('input');
  deleteBtn.setAttribute('type','button' );
  deleteBtn.setAttribute('value','delete');

  var editbtn = document.createElement('input');
  editbtn.setAttribute('type','button' );
  editbtn.setAttribute('value','edit');

  // Add classes to  button
  editbtn.className = 'btn btn-info btn-sm edit';
  deleteBtn.className = 'btn btn-danger btn-sm delete';

  // Append button to li
  li.appendChild(editbtn);
  li.appendChild(deleteBtn);}
    totalprise();
}

getAllUser();


document.getElementById("items").addEventListener('click', removeItem);
document.getElementById("items").addEventListener('click', editItem);
form.addEventListener("click", onsubmit);
function onsubmit(e){
    e.preventDefault();

   if(name.value==='' || price.value===''){
      msg.classList.add("alert");
   msg.innerHTML = "Please enter your Name and proe";
    setTimeout(()=> msg.remove(),3000);
   } 
   else{
 // Create new li element
  var li = document.createElement('li');
  // Add class
 
  // Add text node with input value
  let name1 = document.createTextNode(name.value)
  li.appendChild(name1);

  // Append li to list
  document.getElementById("items").appendChild(li);

  var deleteBtn = document.createElement('input');
  deleteBtn.setAttribute('type','button' );
  deleteBtn.setAttribute('value','delete');

  // Add classes to  button
  deleteBtn.className = 'btn btn-danger btn-sm delete';

  // Append button to li
  li.appendChild(deleteBtn);


    let obj = {
        name : name.value,
        proce : price.value
    };
    axios.post('https://crudcrud.com/api/7c7b09c532bc4fccb7303c4537a160b7/newaniket',obj);
   
     name.value= "";
     price.value= "";

    
     

   }
   totalprise();
   }
   
function removeItem(e){
   
    console.log(objs+'res');
    let li = e.target.parentElement;
    let text_node = li.textContent;
    document.getElementById("items").removeChild(li);

    if(e.target.classList.contains('delete')){
        axios.get("https://crudcrud.com/api/7c7b09c532bc4fccb7303c4537a160b7/newaniket")
        .then(res =>{ for(let i=0;i<res.data.length;i++){

            if(res.data[i].name==text_node){
                console.log(res.data[i].id)
                axios.delete(`https://crudcrud.com/api/7c7b09c532bc4fccb7303c4537a160b7/newaniket/${res.dat[i].id}`)
                .then( ()=>{console.log('delete success')})
                .catch(err => console.log(err)); 
            }
            totalprise();
           }} )
        .catch(err => console.log(err)); 
      
      }
    }

    function totalprise(){
        axios.get("https://crudcrud.com/api/7c7b09c532bc4fccb7303c4537a160b7/newaniket")
        .then(res=>{
            var p=0;
            if(res.data.length>0){
            for(let i=0;i<res.data.length;i++)
              p+=res.data[i].price;
              document.getElementById('p').appendChild(document.createTextNode(p));  
        }
    }
        )
    }
   
