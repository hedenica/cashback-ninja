const template = document.querySelector('[data-js="template"]')
const form = document.querySelector('[data-js="form"]')
const plusBtn = document.querySelector('[data-js="plus-btn"]')
const submitBtn = document.querySelector('[data-js="submit-btn"]')
const total = document.querySelector('[data-js="total"]')

function cloneElement(options) {
  const templateClone = template.content.firstElementChild.cloneNode(true)

  const minusBtn = templateClone.querySelector('[data-js="minus-btn"]')
  const priceInput = templateClone.querySelector('[data-js="input-price"]')
  
  templateClone.setAttribute('data-id', options.id)
  minusBtn.setAttribute('data-id', options.id)
  plusBtn.setAttribute('data-id', options.id)
  templateClone.setAttribute('data-id', options.id)
  priceInput.setAttribute('data-id', options.id)

  minusBtn.addEventListener('click', handleRemoveProduct, false)
  priceInput.addEventListener('input', updateTotalPrice, false)

  form.appendChild(templateClone)
}

plusBtn.addEventListener('click', handleAddProduct, false)

form.addEventListener('submit', submit, false)

function handleAddProduct(e) {
  const elementId = Number(e.currentTarget.getAttribute('data-id'))

  cloneElement({ id: elementId + 1 })
}

function updateTotalPrice() {
  const inputElements = document.querySelectorAll('[data-js="input-price"]')

  const arrayElements = [...inputElements]

  if (inputElements.length === 0) {
    total.innerText = formatCurrency(0)
  }
  
  const totalValue = arrayElements.reduce((acc, input) => acc + Number(input.value), 0)

  total.innerText = formatCurrency(totalValue)
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function handleRemoveProduct(e) {
  const dataId = e.target.dataset.id
  
  const inputContainer = document.querySelector(`[data-js="input-container"][data-id="${dataId}"]`)

  inputContainer.remove()

  updateTotalPrice()
}

function submit(e) {
  // TODO: LISTAR DADOS DO FORMULÁRIO
  e.preventDefault();

  console.log(e.target)

  // querySelector em todas as divs do form.
  // itera as divs, e gerar um novo array [for, map] de objetos
  // estrutura [{ name: string, price: number}]
}

function main() {
  cloneElement({ id: 0 })
}

main()

// TODO: Pesquisar sobre Document.Fragment 📝 
///// TODO: Alterar os identificadores dos elementos
///// TODO: Adicionar botões de remover inputs/produtos

