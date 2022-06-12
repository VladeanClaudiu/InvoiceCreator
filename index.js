console.log(localStorage);
console.log(localStorage.getItem("washCar"));
//services array
let serviceArray = [];

//localStorage services Parsed
const servicesFromLocalStorage = JSON.parse(
  localStorage.getItem("serviceArray")
);

//declaring id variables
const tAmount = document.getElementById("total-amount");
const btnOne = document.getElementById("button-1");
const btnTwo = document.getElementById("button-2");
const btnThr = document.getElementById("button-3");

//declaring class variables
const taskHead = document.querySelector(".taskHead");
const taskTotal = document.querySelector(".taskTotal");
const sendInvoice = document.querySelector(".sendInvoiceButton");

//innner text of the buttons
btnOne.innerText = "Wash Car: $10";
btnTwo.innerText = "Mow Lawn: $20";
btnThr.innerText = "Pull Weeds: $30";

//remove btns id
let removeWash = document.getElementById("remove-btn-10");
let removeMow = document.getElementById("remove-btn-10");
let removeWeeds = document.getElementById("remove-btn-10");

//remove task div id
const taskOne = document.getElementById("task-10");
const taskTwo = document.getElementById("task-20");
const taskThr = document.getElementById("task-30");

//setting the service array to the local storage if the local storage isnt empty
function serviceCheck() {
  if (servicesFromLocalStorage) {
    serviceArray = servicesFromLocalStorage;
    render(serviceArray);
    console.log("Services array -> " + serviceArray);
  }
}

serviceCheck();

//buttonPressed functions
btnOne.addEventListener("click", function () {
  if (localStorage.getItem("washCar") === null) {
    serviceArray.push("Wash Car");
    serviceArray.push(10);

    let totalAmount = JSON.parse(localStorage.getItem("totalCost"));
    totalAmount += 10;
    localStorage.setItem("totalCost", totalAmount);
    localStorage.setItem("washCar", JSON.stringify(serviceArray));
    localStorage.setItem("serviceArray", localStorage.getItem("washCar"));
    render(serviceArray);
  } else {
    alert("One task of each available task may be added");
  }
});

btnTwo.addEventListener("click", function () {
  if (localStorage.getItem("mowLawn") === null) {
    serviceArray.push("Mow Lawn");
    serviceArray.push(20);
    let totalAmount = JSON.parse(localStorage.getItem("totalCost"));
    totalAmount += 20;
    localStorage.setItem("totalCost", totalAmount);
    localStorage.setItem("mowLawn", JSON.stringify(serviceArray));
    localStorage.setItem("serviceArray", localStorage.getItem("mowLawn"));
    render(serviceArray);
  } else {
    alert("One task of each available task may be added");
  }
});

btnThr.addEventListener("click", function () {
  if (localStorage.getItem("pullWeeds") === null) {
    serviceArray.push("Pull Weeds");
    serviceArray.push(30);
    let totalAmount = JSON.parse(localStorage.getItem("totalCost"));
    totalAmount += 30;
    localStorage.setItem("totalCost", totalAmount);
    localStorage.setItem("pullWeeds", JSON.stringify(serviceArray));
    localStorage.setItem("serviceArray", localStorage.getItem("pullWeeds"));
    render(serviceArray);
  } else {
    alert("One task of each available task may be added");
  }
});

//render function reused
function render(services) {
  let renderTask = ``;
  let renderTotal = ``;
  for (let i = 0; i < services.length; i += 2) {
    if (services[i] !== null) {
      renderTask += `<p class="taskHeadActive taskHeadActive${
        serviceArray[i + 1]
      }">${serviceArray[i]}<a class="removeBtn" id="remove-btn-${
        serviceArray[i + 1]
      }" onclick="removeService(this.id, ${
        serviceArray[i + 1]
      })"">Remove</a></p>`;
      renderTotal += `<p class="taskTotalActive taskTotalActive${
        serviceArray[i + 1]
      }"><span class="spanDollar">$</span>${serviceArray[i + 1]}</p>`;
    }
  }
  taskHead.innerHTML = renderTask;
  taskTotal.innerHTML = renderTotal;
  console.log(renderTask + renderTotal);
  renderTask = "";
  renderTotal = "";
  tAmount.innerText = `$${localStorage.getItem("totalCost")}`;
}

//clears the local storage and resets page
sendInvoice.addEventListener("click", function () {
  localStorage.clear();
  render(serviceArray);
  tAmount.innerText = `$${0}`;
  window.location.reload();
});

function removeService(service, id) {
  let totalAmount = JSON.parse(localStorage.getItem("totalCost"));
  //localStorage Remove
  if (id === 10) {
    let serviceTempArray = JSON.parse(localStorage.getItem("serviceArray"));
    serviceTempArray.splice(serviceTempArray.indexOf("Wash Car"), 2);
    localStorage.setItem("serviceArray", JSON.stringify(serviceTempArray));
    localStorage.removeItem("washCar");
    totalAmount = totalAmount - 10;
    localStorage.setItem("totalCost", totalAmount);
    render(serviceArray);
    window.location.reload();
  } else if (id === 20) {
    let serviceTempArray = JSON.parse(localStorage.getItem("serviceArray"));
    serviceTempArray.splice(serviceTempArray.indexOf("Mow Lawn"), 2);
    localStorage.setItem("serviceArray", JSON.stringify(serviceTempArray));
    localStorage.removeItem("mowLawn");
    totalAmount = totalAmount - 20;
    localStorage.setItem("totalCost", totalAmount);
    render(serviceArray);
    window.location.reload();
  } else if (id === 30) {
    let serviceTempArray = JSON.parse(localStorage.getItem("serviceArray"));
    serviceTempArray.splice(serviceTempArray.indexOf("Pull Weeds"), 2);
    localStorage.setItem("serviceArray", JSON.stringify(serviceTempArray));
    localStorage.removeItem("pullWeeds");
    totalAmount = totalAmount - 30;
    localStorage.setItem("totalCost", totalAmount);
    render(serviceArray);
    window.location.reload();
  }

  //html remove
  let idServe = id;
  let remServe = service;
  const child = document.querySelector(`.taskHeadActive${idServe}`);
  const child2 = document.querySelector(`.taskTotalActive${idServe}`);
  const parent = document.querySelector(".taskHead");
  const parent2 = document.querySelector(".taskTotal");
  parent.removeChild(child);
  parent2.removeChild(child2);
}
