const template = document.querySelector('[data-id="template"]')
const form = document.querySelector('[data-id="form"]')
const plusBtn = document.querySelector('[data-id="plus-btn"]')
const submitBtn = document.querySelector('[data-id="submit-btn"]')
const inputElements = document.getElementsByTagName("input")
const total = document.querySelector('[data-id="total"]')

function cloneElement(options) {
  const templateClone = template.content.firstElementChild.cloneNode(true)

  form.appendChild(templateClone)

  const minusBtn = templateClone.querySelector('[data-id="minus-btn"]')
  const priceInput = templateClone.querySelector('[data-id="price"]')
  
  templateClone.setAttribute('data-id', options.id)
  minusBtn.setAttribute('data-id', options.id)
  plusBtn.setAttribute('data-id', options.id)
  priceInput.setAttribute('data-id', `price ${options.id}`)

  minusBtn.addEventListener('click', handleRemoveProduct, false)
  priceInput.addEventListener('keyup', handlePriceChange, false)

}

plusBtn.addEventListener('click', handleAddProduct, false)

submitBtn.addEventListener('submit', submit, false)

function handleAddProduct(e) {
  const elementId = Number(e.currentTarget.getAttribute('data-id'))

  cloneElement({ id: elementId + 1 })
}

function handlePriceChange() {
  let prices = []

  if (inputElements.length === 0) {
    total.innerHTML = 'TOTAL: R$0,00'
  }

  for (var i = 0; i < inputElements.length; i++) {
    if (i % 2 !== 0) {
      prices.push(Number(inputElements[i].value))

      const filteredPrices = prices.filter(Number)

      const totalValue = filteredPrices.reduce((acc, current) => acc + current, 0)

      total.innerText = `TOTAL: ${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(totalValue)
        }`
    }

  }
}

function handleRemoveProduct(e) {
  const inputContainer = e.path[1]

  inputContainer.remove()

  handlePriceChange()
}

function submit() {
 // TODO: LISTAR DADOS DO FORMULÁRIO
}

function main() {
  cloneElement({ id: 0 })
}

main()

// TODO: Pesquisar sobre Document.Fragment 📝 
///// TODO: Alterar os identificadores dos elementos
///// TODO: Adicionar botões de remover inputs/produtos

