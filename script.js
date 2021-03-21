const template = document.querySelector('[data-id="template"]')
const form = document.querySelector('[data-id="form"]')
const plusBtn = document.querySelector('[data-id="plus-btn"]')

function cloneElement(options) {
  const templateClone = template.content.firstElementChild.cloneNode(true)

  form.appendChild(templateClone)

  const minusBtn = templateClone.querySelector('[data-id="minus-btn"]')
  
  templateClone.setAttribute('data-id', options.id)
  minusBtn.setAttribute('data-id', options.id)
  plusBtn.setAttribute('data-id', options.id)

  minusBtn.addEventListener('click', handleRemoveProduct, false)
}

plusBtn.addEventListener('click', handleAddProduct, false)

function handleAddProduct(e) {
  const elementId = Number(e.currentTarget.getAttribute('data-id'))
  cloneElement({ id: elementId + 1 })
}

function handleRemoveProduct(e) {
  const inputContainer = e.path[1]

  inputContainer.remove()
}

function main() {
  cloneElement({ id: 0 })
}

main()

// TODO: Pesquisar sobre Document.Fragment 📝 
// TODO: Alterar os identificadores dos elementos
// TODO: Adicionar botões de remover inputs/produtos

