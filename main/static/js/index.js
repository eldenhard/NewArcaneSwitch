let price = 0;
let tarif = null;

let slider = document.getElementById("myRange");
let main_input = document.getElementById("input_main")


let output = document.getElementById("demo");
output.innerHTML = slider.value;

document.addEventListener('DOMContentLoaded', prepare_page);


function prepare_page(){
    actualPrice();
    getTariff();
    
    document.getElementById("myRange").value = "250000";
    document.getElementById("demo").innerHTML = "250 000 РУБ";

    document.getElementById("input_main").value = "50000";

    main_input= 50000;
    slider.value = 250000;

    calc_plan_cost(slider);
    calc_first_cost(input_main)
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

function calc_first_cost(calc){
    output.innerHTML = Number((calc.value));

let TotalRubMain = Number(calc.value);
let convertMain = Number((calc.value * tarif.convertation)/100)
document.getElementById("convert-main").innerHTML = '+ ' + split_number(convertMain) + ` РУБ`

let docsMain = Number((calc.value * tarif.documentation)/100)
document.getElementById("docs-main").innerHTML = '+ ' +split_number(docsMain) + ` РУБ`

let rewardMain = Number((calc.value * tarif.operation)/100)
document.getElementById("reward-main").innerHTML = '+ ' + split_number(rewardMain) + ` РУБ`

document.getElementById("TotalRub-main").innerHTML = split_number(Math.round(TotalRubMain  + convertMain + docsMain + rewardMain)) + ` РУБ`
}
main_input.oninput = function(){
    calc_first_cost(this)
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


mapboxgl.accessToken = 'pk.eyJ1IjoiZWxkZW5oYXJkIiwiYSI6ImNsN3hhNnZrbTAwd3Mzdmp1dWNuNTB3cTMifQ.1qEgIq7tKtFZwx-NfWqYRA';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [ 37.580813, 55.901818],
zoom: 15,
});
const marker2 = new mapboxgl.Marker({ color: 'black'})
.setLngLat([ 37.580813, 55.901818])
.addTo(map);
