const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sMatricula = document.querySelector('#m-matricula')
const sCurso = document.querySelector('.#m-curso')
const btSalvar = document.querySelector('#btSalvar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ??[]
const setItensBD = () => localStorage.getItem('dbfunc', JSON.stringify(itens))

function loadItens(){
  itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    });
        
}

loadItens()

function insertItem(item, index){
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.matricula}</td>
    <td>${item.curso}</td>

    <td class = "acao">
      <button onclick = "editItem(${index})"><i class= 'bx-edit' ></i></button>
    </td>

    <td class = "acao">
    <button onclick = "deleteItem(${index})"><i class= 'bx-trash' ></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

function editItem(index){
  openModal(true, index)
}

function deleteItem(index){
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function openModal(edit = false, index = 0){
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container')!== -1) {
      modal.classList.remove ('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sMatricula.value = itens[index].matricula
    sCurso.value = itens[index].curso
    
    id = index
      
  }else{
    sNome.value = ''
    sMatricula.value = ''
    sCurso.value = ''
  }
}

btSalvar.onclick = e =>{
  if(sNome.value == '' || sMatricula.value == '' || sCurso.value){
    return
  }

  e.preventDefault();

  if(id !== undefined){
    itens[id].nome = sNome.value
    itens[id].matricula = sMatricula.value
    itens[id].curso = sCurso.value
  }else{
    itens.push({'nome': sNome.value, 'matricula': sMatricula, 'curso': sCurso})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}