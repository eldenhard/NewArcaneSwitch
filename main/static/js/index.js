let price = 0;
let tarif = null;

let slider = document.getElementById("myRange");
let main_input = document.getElementById("input_main")

let notif = document.getElementById('notifications')
document.getElementById('notifications').style.display = 'none'


let openModalButtons = document.querySelectorAll('.open-modal');
let closeModalButton = document.querySelector('.close-modal');
let modalOverlay = document.querySelector('#modal-overlay');


let output = document.getElementById("demo");
output.innerHTML = slider.value;

document.addEventListener('DOMContentLoaded', prepare_page);


function prepare_page(){
    actualPrice();
    getTariff();
    
    document.getElementById("myRange").value = "250000";
    document.getElementById("demo").innerHTML = "250 000 РУБ";
    slider.value = 250000;


    document.getElementById("input_main").value = "50000";
    main_input= 50000;
    document.getElementById('notifications').style.display = 'none'


    calc_plan_cost(slider);
    calc_request(input_request);
    calc_first_cost(input_main);
}

function split_number(number)
{
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


// Плавный скролл
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};
	

function loaderRun(){
    let loader = document.getElementById('loader')
    loader.style.display = 'block'
}
function loaderClose(){
    let loader = document.getElementById('loader')
    loader.style.display = 'none'
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
// Первый калькулятор
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

// Калькулятор модального окна
function calc_request(modal){
    output.innerHTML = Number((modal.value));

let TotalRubRequest = Number(modal.value);
let convertRequest = Number((modal.value * tarif.convertation)/100)
document.getElementById("convert-request").value = convertRequest

let docsRequest = Number((modal.value * tarif.documentation)/100)
document.getElementById("docs-request").value = docsRequest

let rewardRequest = Number((modal.value * tarif.operation)/100)
document.getElementById("reward-request").value = rewardRequest

document.getElementById("TotalRub-request").value = split_number(Math.round(TotalRubRequest  + convertRequest + docsRequest + rewardRequest))
document.getElementById("result_modal").value = Math.round(modal.value / price)

  
}
input_request.oninput = function() {
    calc_request(this);
}

// Калькулятор по слайдеру
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


// Карта Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZWxkZW5oYXJkIiwiYSI6ImNsN3hhNnZrbTAwd3Mzdmp1dWNuNTB3cTMifQ.1qEgIq7tKtFZwx-NfWqYRA';
const map = new mapboxgl.Map({
container: 'map',

style: 'mapbox://styles/mapbox/streets-v11',
center: [37.580813, 55.901818],
zoom: 15,
});

const marker1 = new mapboxgl.Marker()
.setLngLat([37.580813, 55.901818])
.addTo(map);
 




// Открытие модального окна
openModalButtons.forEach((button) =>
    button.addEventListener('click', openModal));
modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);



function openModal() {
  modalOverlay.classList.remove('hidden');
  let input_request = document.getElementById("input_main").value
   document.getElementById('input_request').value = input_request
   calc_request(document.getElementById('input_request'))  
}

function closeModal(event) {
  if (
    event.target.classList.contains('close-modal') ||
    event.target.id === 'modal-overlay' ||
    (event.type === 'keydown' && event.key === 'Escape')
  ) {
    modalOverlay.classList.add('hidden');
  }
}


// Отправка данных из модального окна
document.querySelector("#modal_post_form").addEventListener("submit", function(e){
    e.preventDefault();
    let myFormDataModal = new FormData(event.target);
    let formDataObjModal = {};
    myFormDataModal.forEach((value, key) => (formDataObjModal[key] = value));
    console.log(formDataObjModal);
    SendModal(formDataObjModal);
    
})

function NotifDisable(){
    document.getElementById('notifications').style.display = 'none'
}

function SendModal(formDataObjModal){
    let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
      fetch('api/order-form/create/', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json;',
           'X-CSRFToken': csrfToken
       },
           body: JSON.stringify(formDataObjModal)
          
       })
     .then((response) => 
       {
           if (response.ok){
               return response.json().then((data)=>{
                   console.log(data);
                   document.getElementById('notifications').style.display = 'block'
                   document.getElementById('modal-overlay').style.display = 'none';
                   setTimeout(NotifDisable, 2000);
                
                   

               })
           }
           else{
               console.log('NOT OK')
           }
       })
   //   .then(result => console.log(response.status))
   
   }


// Отправка данных из формы footer

document.querySelector("#contact-form").addEventListener("submit", function(e){
    e.preventDefault();
    let myFormData = new FormData(event.target);
    let formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj);
    Send(formDataObj);
    
})

// function send_contact_form(form){
//     let csrf_token = $('input[name="csrfmiddlewaretoken"]').val();
//     console.log(form.serialize());
//     $.ajax(
//         {
//             data: form.serialize(),
//             type: form.attr('method'),
//             url: form.attr('action'),
//             headers: {'X-CSRFToken': csrf_token},
//             mode: 'same-origin',
//             async: true,
//             success : function(json)
//             {
//                 console.log(json);
//             },
//             error : function(xhr,errmsg,err) {
//             }
//         }
//     )
// }

function Send(formDataObj){
    loaderRun()
 let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
   fetch('api/contact-form/create/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-CSRFToken': csrfToken
    },
        body: JSON.stringify(formDataObj)
       
    })
  .then((response) => 
    {
        if (response.ok){
            return response.json().then((data)=>{
                console.log(data);
                loaderClose()
                document.getElementById('notifications').style.display = 'block'
                setTimeout(NotifDisable, 2000);

            })
           
        }
        else{
            console.log('NOT OK')
            loaderClose()

        }
    })
//   .then(result => console.log(response.status))

}



