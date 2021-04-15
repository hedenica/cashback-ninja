const tableBody = document.querySelector('[data-js="table-body"]')
const total = document.querySelector('[data-js="total"]')

const url_to_fetch = 'https://606467ecf0919700177859ac.mockapi.io/api/orders'

function listOrders() {
 fetch(url_to_fetch)
    .then(response => response.json())
    .then(orders => {
      orders.forEach((order) => {
        order.products.forEach((product) => {
          const tableRow = document.createElement('tr')
          const tableNumber = document.createElement('td')
          const tableProduct = document.createElement('td')
          const tablePrice = document.createElement('td')
          const tableCashback = document.createElement('td')

          tableNumber.innerText = order.id
          tableProduct.innerText = product.name
          tablePrice.innerText = formatCurrency(product.price)
          tableCashback.innerText = formatCurrency(getCashbackByOrder(order.total))

          tableRow.appendChild(tableNumber)
          tableRow.appendChild(tableProduct)
          tableRow.appendChild(tablePrice)
          tableRow.appendChild(tableCashback)

          tableBody.appendChild(tableRow)
        })

        getCashbackTotal(orders.map(order => order.total))
      })
      
    })
    .catch(error => {
      console.log(error)
    })
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}


listOrders()

/*

* CASHBACK RULES by ORDER

R$0,00   -> R$50,00   = NÃO TEM CASHBACK

R$50,01  -> R$100,00  = 5% DE CASHBACK

R$100,01 -> R$500,00  = 10% DE CASHBACK

R$500,01 -> INFINITO  = 15% DE CASHBACK

*/

function getCashbackByOrder (total) {
  const cashback = [];

  if (total < 50) {
    cashback.push(0);
  }

  else if (total > 50.01 && total <= 100) {
    cashback.push((total * 5) / 100);
  }

  else if (total > 100.01 && total <= 500) {
    cashback.push((total * 10) / 100);
  }

  else if (total > 500.01) {
    cashback.push((total * 15) / 100);
  }

  return cashback;
}

function getCashbackTotal(ordersTotals) {
  const cashbackArray = []

  ordersTotals.forEach(value => cashbackArray.push(getCashbackByOrder(value)))

  const totalCashback = cashbackArray.flat().reduce((acc, total) => {
    return acc + total
  }, 0)

  return total.innerText = formatCurrency(totalCashback)
}
