const minValue = document.getElementById('min-value')
const maxValue = document.getElementById('max-value')
const button = document.getElementById('get-data')
const firstDate = document.getElementById('first-date')
const lastDate = document.getElementById('last-date')
const currency = document.getElementById('currency')


function getData() {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${setDate1()}&end=${setDate2()}&currency=${setCurrency()}`)
  .then(response => {
    let min = Math.min(...Object.values(response.data.bpi)).toFixed(2)
    let max = Math.max(...Object.values(response.data.bpi)).toFixed(2) 
    minValue.innerHTML = `Min: ${min}`
    maxValue.innerHTML = `Max: ${max}`

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(response.data.bpi),
            datasets: [{
                label: 'Bitcoin Historic Price',
                data: Object.values(response.data.bpi),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'                    
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: Math.min(Object.values(response.data.bpi))
                    }
                }]
            }
        }
    })
    //minValue.innerText = Math.min(valuesArr).toString()
  })
  .catch(err => console.log(err)) 
}

//Listeners

button.addEventListener('click', getData)
firstDate.addEventListener('change', setDate1)
lastDate.addEventListener('change', setDate2)
currency.addEventListener('change', setCurrency)

//Helpers

function setDate1() {
  let date1 = firstDate.value
  if (date1 === '') return '2019-01-01'
  return date1
}

function setDate2() {
  let date2 = lastDate.value
  if (date2 === '') return '2019-01-20'
  return date2
}

function setCurrency() {
  let cur = currency.value
  return cur
}
