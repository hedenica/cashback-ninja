const template = document.querySelector('[data-js="template"]')
const form = document.querySelector('[data-js="form"]')
const plusBtn = document.querySelector('[data-js="plus-btn"]')
const submitBtn = document.querySelector('[data-js="submit-btn"]')
const total = document.querySelector('[data-js="total"]')

const baseUrl = 'https://606467ecf0919700177859ac.mockapi.io/api'

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
  priceInput.addEventListener('input', handleInputPrice, false)

  form.appendChild(templateClone)
}

plusBtn.addEventListener('click', handleAddProduct, false)

form.addEventListener('submit', submit, false)

function handleInputPrice(e) {
  e.target.value = maskPrice(e.target.value)
  updateTotalPrice()
}

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
  
  const totalValue = arrayElements.reduce((acc, input) => {
    const clearInputValue = cleanValue(input.value)

    return acc + clearInputValue
  }, 0)

  total.innerText = formatCurrency(totalValue)
}

function maskPrice(value) {
  return formatCurrency(cleanValue(value))
}

const cleanValue = (value) => Number(value.replace(/\D+/g, '') / 100)

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

async function submit(e) {
  e.preventDefault();
  
  const inputContainer = document.querySelectorAll('[data-js="input-container"]')

  const arrayElements = [...inputContainer]

  const formData = arrayElements.map((div) => {
    const name = div.querySelector('[data-js="input-product"]').value
    const price = cleanValue(div.querySelector('[data-js="input-price"]').value)

    return { 
      name,
      price,
    }
  })
  
  const order = {
    products: formData,
    total: cleanValue(total.innerText)
  }
    
  try {
    if(order.products[0].name && order.products[0].price !== 0) {
      await axios.post(`${baseUrl}/orders`, order )
      redirect()
    } else {
      throw Error()
    }

  } catch(error) {
    alert('❌ Todos os campos devem ser preenchidos!')
  }

  return order
}

function redirect() {
  location.href = '../index.html'
}

function main() {
  cloneElement({ id: 0 })
}

main()

// TODO: Pesquisar sobre Document.Fragment 📝 

/////  TODO: ROTA HOME - LISTAGEM DAS COMPRAS
/////  TODO: ADICIONAR VALOR TOTAL NO OBJETO PEDIDOS
/////* INFO: { products: [{ ... }], total: number}
//  TODO: ROTA DE DETALHES DO PEDIDO /COMPRAS/:ID
/////  TODO: A ROTA DE CADASTRO -> FORMULÁRIO
