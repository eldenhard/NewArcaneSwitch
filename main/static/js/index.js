let price = 0;
let tarif = null;

let slider = document.getElementById("myRange");

let output = document.getElementById("demo");
output.innerHTML = slider.value;

document.addEventListener('DOMContentLoaded', prepare_page);


function prepare_page(){
    actualPrice();
    getTariff();
    
    document.getElementById("myRange").value = "250000";
    document.getElementById("demo").innerHTML = "250 000 РУБ";

    slider.value = 250000;

    console.log(tarif);
    console.log(price);
    console.log('start');

    calc_plan_cost(slider);

    console.log('stop');
}






function split_number(number)
{
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


function actualPrice(){
    
    $.ajax(
        {
            url : `https://api.binance.com/api/v3/ticker/price?symbol=USDTRUB`,
            type: 'GET',
            async: false,
            success : function(json) {
                    price = Number(json.price);

            }
            ,
            error : function(xhr,errmsg,err) {
            }
        }
    )
}


function getTariff(){
    let csrf_token = document.getElementsByName('csrfmiddlewaretoken').value;
    
    $.ajax(
        {
            url : '/api/tariff/1',
            headers:{'api-csrftoken':csrf_token},
            type: 'GET',
            async: false,
            success : function(json) {
                    tarif = json;

            }
            ,
            error : function(xhr,errmsg,err) {
            }
        }
    )
}



function calc_plan_cost(calculator){
    output.innerHTML = Number(calculator.value);

  let TotalUSDT = split_number(Math.round(calculator.value / price))
  document.getElementById("TotalUSDT").innerHTML = TotalUSDT 

  let convert = Number((calculator.value * tarif.convertation)/100)
  document.getElementById("convert").innerHTML = '+ ' + split_number(convert) + ` РУБ`

  let docs = Number((calculator.value * tarif.documentation)/100)
  document.getElementById("docs").innerHTML = '+ ' +split_number(docs) + ` РУБ`

  let reward = Number((calculator.value * tarif.operation)/100)
  document.getElementById("reward").innerHTML = '+ ' + split_number(reward) + ` РУБ`

  let TotalRub = Number(calculator.value);
  document.getElementById("TotalRub").innerHTML =  split_number(Math.round(TotalRub  + convert + docs + reward));

  document.getElementById("demo").innerHTML = `${split_number(calculator.value)}` + ' РУБ';
}

slider.oninput = function() {
    calc_plan_cost(this);
}