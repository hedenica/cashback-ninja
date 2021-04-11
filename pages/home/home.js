const tableBody = document.querySelector('[data-js="table-body"]')
const total = document.querySelector('[data-js="total"]')

const baseUrl = 'https://606467ecf0919700177859ac.mockapi.io/api'

async function listOrders() {
  try {
    const orders = await fetch(`${baseUrl}/orders`)
      .then(response => response.json())

    const totalValue = orders.reduce((acc, order) => {  
      return acc + order.total
    }, 0)

    total.innerText = formatCurrency(totalValue)

    orders.forEach((order) => {
      order.products.forEach((product) => {
        const tableRow = document.createElement('tr')
        const tableNumber = document.createElement('td')
        const tableProduct = document.createElement('td')
        const tablePrice = document.createElement('td')

        tableNumber.innerText = order.id
        tableProduct.innerText = product.name
        tablePrice.innerText = formatCurrency(product.price)

        tableRow.appendChild(tableNumber)
        tableRow.appendChild(tableProduct)
        tableRow.appendChild(tablePrice)

        tableBody.appendChild(tableRow)
      })
      
    })
  } catch(error) {
    console.log(error)
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}


listOrders()