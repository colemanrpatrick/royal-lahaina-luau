1//_____________________________________________________________
//___________________| Reservation UI V2.5|______________________
//_____________________________________________________________

const reservationWindow = document.getElementById("reservation-window");
reservationWindow.className = "hidden";

$group = localStorage.getItem("gGroup");
if($group){
  localStorage.removeItem("gGroup")
};

//_______________________________________________________
//________________________________________________________
//create reservation book
//________________________________________________________
//________________________________________________________

let createSecurityDialogue = () => {
  let securityHeader = document.getElementById("security-header");

  let securityDialogue = document.createElement("div");
  securityDialogue.setAttribute("id", "security-dialogue");
  securityDialogue.innerHTML =
    "<p>Encrypting our payment processes protects sensitive information from being the risk of unauthorized access. Rest assured your payment details are confidential and secure.</p>";

  securityHeader.parentNode.insertBefore(
    securityDialogue,
    securityHeader.nextElementSibling
  );

  securityHeader.addEventListener(
    "click",
    () => {
      idToggle("security-dialogue", "active");
    },
    false
  );

  securityDialogue.addEventListener(
    "click",
    () => {
      idToggle("security-dialogue", "active");
    },
    false
  );
};

let createReservationTemplate = () => {
  reservationWindow.className = "active";

  let reservationContainer = document.createElement("div");
  let reservationBook = document.createElement("div");
  let reservationBookControls = document.createElement("div");
  let clearReservationWindowBtn = document.createElement("button");

  clearReservationWindowBtn.setAttribute("type", "button");
  clearReservationWindowBtn.setAttribute("id", "close-reservation");
  clearReservationWindowBtn.innerHTML =
    "<span class='material-symbols-outlined'>close</span>";
  clearReservationWindowBtn.addEventListener(
    "click",
    clearReservationTemplate,
    false
  );

  reservationBook.setAttribute("id", "reservation-book");
  reservationBookControls.setAttribute("id", "reservation-controls");
  reservationContainer.setAttribute("id", "reservation-container");

  reservationWindow.appendChild(reservationContainer);

  try {
    reservationContainer.appendChild(securitySection(securityImgSrc));
    createSecurityDialogue();
  } catch (error) {
    console.log(error);
  }


  reservationContainer.appendChild(clearReservationWindowBtn);
  reservationContainer.appendChild(reservationBook);
  reservationContainer.appendChild(reservationBookControls);
};

let createReservationPage = (id) => {
  let reservationPage = document.createElement("div");
  reservationPage.setAttribute("class", "reservation-page");
  reservationPage.setAttribute("id", id);
  document.getElementById("reservation-book").appendChild(reservationPage);
};

let hideReservationPages = (pageClass, pageId) => {
  let reservationPage = document.getElementsByClassName(pageClass);
  for (let i = 0; i < reservationPage.length; i++) {
    reservationPage[i].className = pageClass + " hidden";
  }
  document.getElementById(pageId).className = pageClass + " active";
  document.getElementById("reservation-controls").innerHTML = " ";
};

let clearReservationTemplate = () => {
  reservationWindow.innerHTML = "";
  reservationWindow.className = "hidden";
};

let clearReservationPage = (pageId) => {
  document.getElementById(pageId).innerHTML = " ";
};

let createButton = ($id, $text, $class) => {
  let $button = document.createElement("Button");
  $button.innerHTML = $text;
  $button.setAttribute("id", $id);
  $button.setAttribute("class", $class);
  $button.setAttribute("type", "button");
  return $button;
};
//________________________________________________________
//________________________________________________________
//Unavaliable Package Template
//________________________________________________________
//________________________________________________________

let unavaliableMessage = (page, $message) => {
  let unavaliableMessageBox = document.createElement("div");

  unavaliableMessageBox.setAttribute("id", "unavailable-package");

  if ($message) {
    unavaliableMessageBox.innerHTML =
      "<span class='material-symbols-outlined'>sentiment_dissatisfied</span><br><h2>" +
      $message +
      "</h2><p>Please Select Another Option</p>";
  } else {
    unavaliableMessageBox.innerHTML =
      "<span class='material-symbols-outlined'>sentiment_dissatisfied</span><br><h2>This Package Is No Longer Available</h2><p>Please Select Another Option</p>";
  }

  document.getElementById(page).appendChild(unavaliableMessageBox);

  document
    .getElementById("unavailable-package")
    .appendChild(
      createButton("unavailable-back", "browse packages", "reservation-button")
    );
};

//________________________________________________________
//________________________________________________________
//create Security Header
//________________________________________________________
//________________________________________________________

let securitySection = (imgSrc) => {
  let securityHeader;
  let securityHeaderSpan;
  let securityHeaderImg;

  securityHeader = document.createElement("Button");
  securityHeader.setAttribute("type", "button");
  securityHeader.setAttribute("ID", "security-header");

  securityHeaderSpan = document.createElement("span");
  securityHeaderSpan.innerHTML = "Your Order Is Secure";

  securityHeaderImg = document.createElement("IMG");
  securityHeaderImg.setAttribute(
    "src",
    "" + imgSrc + ""
  );

  securityHeader.appendChild(securityHeaderImg);
  securityHeader.appendChild(securityHeaderSpan);
  return securityHeader;
};

//________________________________________________________
//________________________________________________________
//create Title
//________________________________________________________
//________________________________________________________

let createTitle = (page, $package) => {
  let packageTitle = document.createElement("h2");
  packageTitle.className = "package-title";
  packageTitle.innerHTML = $package;
  document.getElementById(page).appendChild(packageTitle);
};
//_______________________________________________________
//________________________________________________________
//create calendar
//________________________________________________________
//________________________________________________________

const getCurrentTimeAMPM = ($timezone) => {
  let currentTime;

  if($timezone == undefined){
    currentTime = moment().format('LT');
  }else{
    //'Pacific/Honolulu'
    currentTime = moment.tz(moment(), $timezone).format('LT');
  }
  return currentTime;
}

   let amPMto24hr = ($input) => {

        let $time;
        $time = $input.split(" ");
        $timePeriod = $time[1];
        $time = parseFloat($time[0].replace(/[:]/g , ''));

        if($timePeriod == "PM"){
            if($time >= 1200 && $time < 1260){
                return $time;
            }else{
                return $time = $time + 1200;
            };
        }else{
            if($time >= 1200 && $time < 1260){
                return $time = $time - 1200;
            }else{
                return $time;
            };
        };

    };

const getTodaysDate = () => {
  let currentDate = moment().format('L');
  return currentDate;
};

//________________________________________________________

let createCalendar = (page, $name) => {
  let dateInput = document.createElement("input");
  let datePicker = document.createElement("div");

  dateInput.setAttribute("type", "text");
  dateInput.setAttribute("name", $name);
  dateInput.setAttribute("id", "dateInput");

  datePicker.setAttribute("id", "datepicker");

  let calendarMessage = document.createElement("div");
  calendarMessage.setAttribute("id", "calendar-message");
  calendarMessage.setAttribute("class", "hidden");
  calendarMessage.innerHTML =
    "<span class='material-symbols-outlined'>edit_calendar</span><p>Select a date to continue</p>";

  document.getElementById(page).appendChild(dateInput);
  document.getElementById(page).appendChild(datePicker);
  document.getElementById(page).appendChild(calendarMessage);
};

let validateCart = ($id, $visible) => {
  calendarMsg = document.getElementById($id);
  if ($visible) {
    calendarMsg.className = "visible";
  } else {
    calendarMsg.className = "hidden";
  }
};

//________________________________________________________
//________________________________________________________
//calendar date functions
//________________________________________________________
//________________________________________________________

let formattedCalendarDates = ($x_) => {
  let unformattedDates = $x_;
  formattedDates = JSON.parse(unformattedDates);
  for (var i = 0; i < formattedDates.length; i++) {
    formattedDates[i] = formattedDates[i].replace(/\//g, "-");
  }
  return formattedDates;
};

let checkCutoffTime = () => {

  let $ht = getCurrentTimeAMPM("Pacific/Honolulu");
  let $cutoffTime = cartData.Availabilities[0].Cutoff;
  $ht = amPMto24hr($ht);
  $cutoffTime = amPMto24hr($cutoffTime);

  if($ht > $cutoffTime){
    return false;
  }else{
    return true;
  };
};

let cutOffMessage = (page) => {

  let $window = document.createElement("DIV");
  $window.setAttribute("id","cutoff-window");
  $window.setAttribute("class","cutoff-window");

  $windowDiv = document.createElement("DIV");
  $windowDiv.setAttribute("id","cutoff-message-content");

  $windowDiv.innerHTML = "<div><span class='material-symbols-outlined'>schedule</span><br><p>This activity is not available after " + cartData.Availabilities[0].Cutoff + ". Please select another date.</p></div>";
  
  $windowButton = document.createElement("button");
  $windowButton.setAttribute("type","button");
  $windowButton.setAttribute("id","window-button");
  $windowButton.innerHTML = "continue";

  $windowDiv.appendChild($windowButton);
  $window.appendChild($windowDiv);

  document.getElementById(page).appendChild($window);

  $windowButton.addEventListener("click", () => {
    idToggle("cutoff-window","active");
  }, false);
};

//_______________________________________________________
//________________________________________________________
//show calendar
//________________________________________________________
//________________________________________________________

let setDisabledAndHighlited = (disabledDates,highlightedDates) => {

  let dateToday = new Date();

  //-------------------
  // check cutoff 
  //-------------------

  let formattedDateArray = formattedCalendarDates(disabledDates);

  if(checkCutoffTime() == false){
    formattedDateArray.unshift(getTodaysDate().replace(/\//g, "-"));
  };

  //-------------------

  if(highlightedDates !== undefined){

    //console.log("step1: highlighted dates:  ", highlightedDates);

    let highlightedDatesActive;
    let highlightedClass;

    highlightedDatesActive = [];
    highlightedClass = [];  

    Array.prototype.forEach.call(
      highlightedDates,
      function (item, index) {
        highlightedDatesActive.push(item.datesActive);
        highlightedClass.push(item.dateId);
    });

    //console.log("step 2 individually highlighted array" , highlightedDatesActive);

    let organizeDates = (date) => {

          var mdyDate = jQuery.datepicker.formatDate("mm-dd-yy", date);
          let disabledCalendarDates = formattedCalendarDates(disabledDates).indexOf(mdyDate) !== -1 ;

          for (let i = 0; i < highlightedDatesActive.length; i++) {
          
              let highlightedSet = highlightedDatesActive[i];

              if(highlightedSet.indexOf(mdyDate) !== -1){
                if(disabledCalendarDates){
                  return [false,'ui-datepicker-unselectable ui-state-disabled'];
                }else{
                  return [true, `highlighted ${highlightedClass[i]}`];
                }
              }else{
                //Do Nothing: //console.log("here's the issue");
              };

          };

          if(disabledCalendarDates){
            return [false,'ui-datepicker-unselectable ui-state-disabled'];
          }

          return [true,''];
    };

    $("#datepicker").datepicker({
      minDate: dateToday,
      maxDate: Date(2024, 11, 31),
      defaultDate: "0M",
      beforeShowDay: organizeDates,
      onChangeMonthYear: function(year, month, inst){
        clearDatepickerKey();
        $createDatePickerLegend(highlightData.highlightDates , month - 1); // first argument must match the JSON its reading from
      }
    });

  }else{

    $("#datepicker").datepicker({
      minDate: dateToday,
      maxDate: Date(2024, 11, 31),
      beforeShowDay: function (date) {
        var mdyDate = jQuery.datepicker.formatDate("mm-dd-yy", date);
        disabledCalendarDates = formattedCalendarDates(disabledDates).indexOf(mdyDate) !== -1 ;
        if(disabledCalendarDates){
          return ['false', 'ui-datepicker-unselectable ui-state-disabled'];
        }else{
          return ['true',""];
        };
      }
    });

  };
};

//------------------------
//
//------------------------

let setDatepickerKey = ($id,$description) => { //$id,$description
  let key = document.createElement("div");


  key.setAttribute("id",$id);
  key.setAttribute("class","datepicker-key");

  let keyMark = document.createElement("div");
  keyMark.setAttribute("class","key-mark");

  let keyDescription = document.createElement("P");
  keyDescription.setAttribute("class" , "date-key-description");
  keyDescription.innerHTML = $description;

  key.appendChild(keyDescription);
  key.appendChild(keyMark);

  $datepicker = document.getElementById("datepicker");

  try {
    if($id !== undefined){
      $datepicker.parentNode.insertBefore(key, $datepicker.nextElementSibling);
    }
  } catch (error) {
  }
};

let clearDatepickerKey = () => {
  let datePickerKey = document.getElementsByClassName("datepicker-key");

  try {
    for (let i = 0; i < datePickerKey.length; i++) {
      datePickerKey[i].innerHTML = ''; 
    };
  } catch (error) {
\\
  };
  
};
$createDatePickerLegend = (highlightedDates,$month) => {

  let alphaMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  if(highlightedDates){
    for (let i = 0; i < highlightedDates.length; i++) {
      if(highlightedDates[i].month == alphaMonth[$month]){
        setDatepickerKey(highlightedDates[i].dateId,highlightedDates[i].dateTitle);
      }else{
        // do nothing
      };
    };
  };
};
//_______________________________________________________

let showCalendar = (page, $collector) => {
  
  let $cartDataDisabledDates = cartData.Availabilities[0].ClosedDates; // Dates from cartData JSON
  let $cartDataHighlightDates;

  if(highlightData){
    $cartDataHighlightDates = highlightData.highlightDates;
  }

  let $name = $collector.Collectors[0].ControlName; // Control Names From cartData JSON

  createCalendar(page, $name);
	
  if(highlightData !== undefined && $cartDataHighlightDates !== undefined){

    setDisabledAndHighlited($cartDataDisabledDates,$cartDataHighlightDates); //[0]
    let $getMonth = new Date().getMonth();
    $createDatePickerLegend($cartDataHighlightDates,$getMonth);

  }else{

    setDisabledAndHighlited($cartDataDisabledDates);

  };


    // adds cutoff message if/when cutoff parameters are met
    cutOffMessage(page);
   //set date values if empty;

  if ($collector.Collectors[0].Value !== null) {
    $("#datepicker").datepicker("setDate", $collector.Collectors[0].Value);
    $("#dateInput").prop("value", $collector.Collectors[0].Value);
  } else {
    $("#datepicker").val("");
    $("#dateInput").prop("value", "");
  };

  /*====== datepicker / date input events ======*/

  $("#dateInput").change(function () {
    $("#datepicker").datepicker("setDate", $(this).val()).trigger("change");
  });

  let dateArg = formattedCalendarDates(cartData.Availabilities[0].ClosedDates);

  $("#datepicker").change(function (dateArg) {
    if ($("#dateInput").val() !== dateArg) {
      $("#dateInput").prop("value", $(this).val());
    }
    if ($("#dateInput").val() !== "") {
      validateCart("calendar-message", false);
    } else {
      validateCart("calendar-message", true);
    }
  });
};

let returnCalendarData = () => {
  let calendarData = {
    datePickerValue: `${document.getElementById("datepicker").value}`,
    dateInputValue: `${document.getElementById("dateInput").value}`,
    todaysDate: `${getTodaysDate()}`,
    currentTime: `${getCurrentTimeAMPM()}`,
    hawaiiTime: `${getCurrentTimeAMPM("Pacific/Honolulu")}`,
  };
  return calendarData;
};

//________________________________________________________
//________________________________________________________
//create Prices
//________________________________________________________
//________________________________________________________

var $createNewLiElement = ($parentElement, $elem) => {
  let $li = document.createElement("LI");
  $parentElement.appendChild($li);
  $li.appendChild($elem);
};

function numIncrement(numberInput, increase) {
  var myInputObject = document.getElementById(numberInput);

  increase ? myInputObject.value++ : myInputObject.value--;

  if (myInputObject.value > 999) {
    myInputObject.value = 999;
  }

  if (myInputObject.value <= 0) {
    myInputObject.value = 0;
  }
}

let spinnerFunction = (elem, $value) => {
  //////console.log(this.id);
};

let createSpinners = (controlName, $value) => {
  let $priceInput = document.createElement("input");
  $priceInput.setAttribute("type", "text");
  $priceInput.setAttribute("id", controlName);
  $priceInput.setAttribute("name", controlName);
  $priceInput.setAttribute("class", "price-control");

  let $spinnerTemplate = document.createElement("div");
  $spinnerTemplate.setAttribute("class", "spinner-container");

  $spinner = document.createElement("input");
  $spinner.setAttribute("type", "text");
  $spinner.setAttribute("class", "spinner");
  $spinner.setAttribute("id", "spinner-" + controlName);

  $priceInput.value = $value;
  $spinner.value = $value;

  $spinner.setAttribute("readonly", "true");

  $minusButton = createButton(
    "spinner-minus-" + controlName,
    "<span class='material-symbols-outlined'>remove</span>",
    "minus-button"
  );
  $plusButton = createButton(
    "spinner-plus-" + controlName,
    "<span class='material-symbols-outlined'>add</span>",
    "plus-button"
  );

  $spinnerTemplate.appendChild($priceInput);
  $spinnerTemplate.appendChild($minusButton);
  $spinnerTemplate.appendChild($spinner);
  $spinnerTemplate.appendChild($plusButton);

  return $spinnerTemplate;
};

let createPrices = (page, priceGroupArg, $needsGroup) => {
  let controlName = priceGroupArg[0];
  let priceDescription = priceGroupArg[1];
  let listPrice = priceGroupArg[2];
  let salePrice = priceGroupArg[3];
  let $quantity = priceGroupArg[4];
  let $isHidden = priceGroupArg[5];
  let $grouping = priceGroupArg[6];
  let $category = priceGroupArg[7];
  let $id = priceGroupArg[8];
  let $displayOrder = priceGroupArg[9];

  let $priceContainer = document.createElement("UL");
  $priceContainer.setAttribute("class", "price-container");
  $priceContainer.setAttribute("data-order","" + $displayOrder + "");

  let $description = document.createElement("P");
  $description.setAttribute("class", "price-description");
  $description.innerHTML = " " + priceDescription + " ";

  let $priceList = document.createElement("DIV");
  $priceList.setAttribute("class", "price-list");

  let _listPrice = document.createElement("P");
  _listPrice.setAttribute("class", "list-price");
  _listPrice.innerHTML = "$" + listPrice;

  $priceList.appendChild(_listPrice);

  if (salePrice !== 0) {
    let _salePrice = document.createElement("P");
    _salePrice.setAttribute("class", "sale-price");
    _salePrice.innerHTML = "$" + salePrice;
    $priceList.appendChild(_salePrice);
  }
  if($needsGroup == true){
    $priceContainer.setAttribute("data-grouping", $grouping);
  };

  $priceContainer.setAttribute("data-category", $category);
  $priceContainer.setAttribute("id", "" + controlName + "-" + $id + "");


  if (!$isHidden == true) {
    document.getElementById("" + page + "").appendChild($priceContainer);
  }

  $createNewLiElement($priceContainer, createSpinners(controlName, $quantity));
  $createNewLiElement($priceContainer, $description);
  $createNewLiElement($priceContainer, $priceList);
};

//________________________________________________________
//________________________________________________________
//show Prices
//________________________________________________________
//________________________________________________________

let showGroupPrices = (page, dataPrices, priceGroup) => {

  let $selectedDate = document.getElementById("datepicker").value;

  Object.entries(dataPrices).forEach((entry) => {
    const [key, value] = entry;
    let priceGroupArg = [
      value.ControlName,
      value.Description,
      value.ListPrice,
      value.Saleprice,
      value.Quantity,
      value.Hidden,
      value.Grouping,
      value.Category,
      key,
      value.DisplayOrder
    ];

    console.log(value.DisplayOrder);
    console.log(value.ControlName);
	
    if (value.Grouping == priceGroup) {
      let closedArgument = value.Availability.ClosedDates;
	    if(closedArgument == null){
	         createPrices(page, priceGroupArg, true);

	    }else{
	      if(closedArgument.indexOf($selectedDate) == "-1"){
	         createPrices(page, priceGroupArg, true);
	      };
	    };

    };
  });

  let listPrice = document.getElementsByClassName("list-price");
  for (let i = 0; i < listPrice.length; i++) {
    if (listPrice[i].nextElementSibling !== null) {
      listPrice[i].classList += " strike-price";
    }
  };

};

let showSinglePrices = (page,dataPrices,category) => {

  let $selectedDate = document.getElementById("datepicker").value;
  Object.entries(dataPrices).forEach((entry) => {
    const [key, value] = entry;
    let priceArg = [
      value.ControlName,
      value.Description,
      value.ListPrice,
      value.Saleprice,
      value.Quantity,
      value.Hidden,
      value.Grouping,
      value.Category,
      key,
      value.DisplayOrder
    ];
    if(value.Category == category){
      createPrices(page, priceArg, false);
    }
  });

};

let addPriceMessage = (page) => {
  let priceMessage = document.createElement("div");
  priceMessage.setAttribute("id", "price-message");
  priceMessage.setAttribute("class", "hidden");
  priceMessage.innerHTML =
    "<span class='material-symbols-outlined'>edit_calendar</span><p>At least one participant must be added to continue</p>";
  document.getElementById(page).appendChild(priceMessage);
};

//________________________________________________________
//________________________________________________________
//Prices Events
//________________________________________________________
//________________________________________________________

let $spinnerEvents = () => {
  $plusButton = document.getElementsByClassName("plus-button");
  $minusButton = document.getElementsByClassName("minus-button");

  for (let i = 0; i < $plusButton.length; i++) {
    $plusButton[i].addEventListener("click", ({ target }) => {
      validateCart("price-message", false);

      let $spinner = target.parentElement.previousElementSibling;
      let $input = $spinner.parentElement.firstElementChild;
      numIncrement($spinner.getAttribute("id"), true);
      $input.value = $spinner.value;
    });
  }

  for (let i = 0; i < $minusButton.length; i++) {
    $minusButton[i].addEventListener("click", ({ target }) => {
      validateCart("price-message", false);

      let $spinner = target.parentElement.nextElementSibling;
      let $input = $spinner.parentElement.firstElementChild;
      numIncrement($spinner.getAttribute("id"), false);
      $input.value = $spinner.value;
    });
  }
};

let multiInputValidate = function (elem) {
  let $inputs = document.getElementsByClassName(elem);
  let $inputsValueTotal = [];

  for (let i = 0; i < $inputs.length; i++) {
    $inputsValueTotal.push($inputs[i].value);
  }

  let inputValuesCombine = $inputsValueTotal.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  return inputValuesCombine > 0 ? true : false;
};

//________________________________________________________
//________________________________________________________
//create collectors
//________________________________________________________
//________________________________________________________

let createCollectors = (page, $collector) => {
  let $dataType = $collector.ApplicationDataType;

  let $collectorContainer = document.createElement("DIV");
  $collectorContainer.setAttribute("class", "collector-container");

  switch ($dataType) {
    case 0:
      let $textLabel = document.createElement("label");
      let $textInput = document.createElement("input");

      $collector.Value === null
        ? ($textInput.value = "")
        : ($textInput.value = $collector.Value);

      if (!$collector.DisplayAlias) {
        $textLabel.innerHTML = $collector.Name;
        $textInput.setAttribute("placeholder", $collector.Name);
      } else {
        $textLabel.innerHTML = $collector.DisplayAlias;
        $textInput.setAttribute("placeholder", $collector.DisplayAlias);
      }

      $textLabel.setAttribute("for", $collector.ControlName);
      $textInput.setAttribute("type", "text");
      $textInput.setAttribute("id", $collector.ControlName);
      $textInput.setAttribute("name", $collector.ControlName);

      $collectorContainer.appendChild($textLabel);
      $collectorContainer.appendChild($textInput);

      document.getElementById("" + page + "").appendChild($collectorContainer);

      break;

    case 1:
      let $bitLabel = document.createElement("label");
      $bitLabel.innerHTML = $collector.Name;

      let $bitInput = document.createElement("input");
      $bitInput.setAttribute("type", "checkbox");
      $bitInput.setAttribute("name", $collector.ControlName);
      $bitInput.setAttribute("Id", $collector.ControlName);

      $collector.Value === null
        ? ($bitInput.checked = false)
        : ($bitInput.checked = true);

      $collectorContainer.appendChild($bitLabel);
      $collectorContainer.appendChild($bitInput);

      document.getElementById("" + page + "").appendChild($collectorContainer);

      break;

    case 7:
      let $selectCollector = document.createElement("SELECT");
      let $selectLabel = document.createElement("Label");

      $selectLabel.setAttribute("for", $collector.ControlName);
      $selectLabel.innerHTML = $collector.Name;

      $selectCollector.setAttribute("name", $collector.ControlName);
      $selectCollector.setAttribute("id", $collector.ControlName);

      let $selectCollectorList = $collector.ListMember.ListMembers;

      Array.prototype.forEach.call(
        $selectCollectorList,
        function (element, elementIndex) {
          let $selectCollectorOption = document.createElement("option");
          $selectCollectorOption.setAttribute("id", element.ID);
          $selectCollectorOption.innerHTML = element.Shortcode;
          $selectCollectorOption.setAttribute("value", "" + element.ID + "");
          $selectCollector.appendChild($selectCollectorOption);

          if (element.Selected == true) {
            $selectCollector.value = $selectCollectorOption.id;
          }
        }
      );

      $collectorContainer.appendChild($selectLabel);
      $collectorContainer.appendChild($selectCollector);
      document.getElementById("" + page + "").appendChild($collectorContainer);

      $selectCollector.addEventListener("change", () => {
        let selectOption =
          $selectCollector.options[$selectCollector.selectedIndex];
        let selectOptionId = selectOption.id;
        $selectCollector.value = selectOptionId;
      });

      break;

    default:
      break;
  }
};

//________________________________________________________
//________________________________________________________
//show collectors
//________________________________________________________
//________________________________________________________

let showCollectors = (page, $collectors) => {
  $collectors = $collectors.slice(1);
  Object.entries($collectors).forEach((entry) => {
    const [key, value] = entry;
    createCollectors(page, value);
  });
};

//________________________________________________________
//________________________________________________________
//collector events
//________________________________________________________
//________________________________________________________

let collectorValidate = ($id, $collector) => {
  let $element = document.getElementById($id);
  let $dataType = $collector.ApplicationDataType;

  switch ($dataType) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      return $element.value.length <= 0 ? false : true;

    case 7:
      break;

    default:
      break;
  }
};

//________________________________________________________
//________________________________________________________
//create email/phone collector
//________________________________________________________
//________________________________________________________

let createEmailPhoneCollectors = ($email, $phone) => {
  //=========== create email ===========//
  let emailCollector = document.createElement("DIV");
  emailCollector.setAttribute("id", "email-collector");

  let email = document.createElement("INPUT");
  email.setAttribute("type", "email");
  email.setAttribute("id", "email");
  email.setAttribute("placeholder", "email");
  email.setAttribute("name", "Order.Customer.PrimaryEmail");

  let emailLabel = document.createElement("LABEL");
  emailLabel.innerHTML = "E-Mail";

  let phoneCollector = document.createElement("DIV");
  phoneCollector.setAttribute("id", "phone-collector");

  let phone = document.createElement("INPUT");
  phone.setAttribute("type", "text");
  phone.setAttribute("id", "phone");
  phone.setAttribute("placeholder", "phone");
  phone.setAttribute("name", "Order.Customer.MobilePhone");

  let phoneLabel = document.createElement("LABEL");
  phoneLabel.innerHTML = "Phone";

  emailCollector.appendChild(emailLabel);
  emailCollector.appendChild(email);

  phoneCollector.appendChild(phoneLabel);
  phoneCollector.appendChild(phone);

  if ($email == true && $phone == false) {
    return emailCollector;
  } else if ($email == false && $phone == true) {
    return phoneCollector;
  } else {
    return false;
  }
};

let showEmailPhoneTemplate = (page) => {
  let collectorContainer = document.createElement("div");
  collectorContainer.setAttribute("class", "collector-container");
  if (cartData.Customer.Email.length <= 0) {
    collectorContainer.appendChild(createEmailPhoneCollectors(true, false));
    document.getElementById(page).appendChild(collectorContainer);
  } else if (
    cartData.Customer.Email.length > 0 &&
    cartData.Customer.MobilePhone.length <= 0
  ) {
    collectorContainer.appendChild(createEmailPhoneCollectors(false, true));
    document.getElementById(page).appendChild(collectorContainer);
  } else {

  }
};

//________________________________________________________
//________________________________________________________
//helper functions
//________________________________________________________
//________________________________________________________

let submitButton = (page) => {
  $hiddenInput = document.createElement("input");
  $hiddenInput.setAttribute("type", "hidden");
  $hiddenInput.setAttribute("name", "cart");
  $hiddenInput.setAttribute("value", "true");

  $submitButton = document.createElement("button");
  $submitButton.setAttribute("type", "submit");
  $submitButton.setAttribute("value", "Book Now");
  $submitButton.setAttribute("id", "addToCartSubmit");
  $submitButton.setAttribute("name", "submit");
  $submitButton.innerHTML = "Add To Cart";

  document.getElementById(page).appendChild($hiddenInput);
  document.getElementById(page).appendChild($submitButton);

  $submitButton.addEventListener("click", function () {
  });
};

//====================================================================
// for page 0 only (select package first)
let showPackageGroupings = (page) => {

  let $prices = cartData.Prices;
  $groups = [];

  Array.prototype.forEach.call(
    $prices,
    function(item,index){
      if(item.Grouping !== null && item.Category !== "Not Set" && item.Grouping !== "Add Infant"){

        if(item.salePrice !== 0){
          $groups.push([item.Grouping,item.ListPrice]);
        };

      };
  });

  $groups = $groups.filter((item,index,array) => {
    return array.findIndex((i) => i[0] === item[0]) === index; 
  });

  Array.prototype.forEach.call(
    $groups,
    function(item,index){
      let packageButton = document.createElement("BUTTON");
      packageButton.setAttribute("class", `product-group`);
      packageButton.setAttribute("id",item[0]);
      packageButton.setAttribute("type","button");
      packageButton.innerHTML = `<span class='title'>${item[0]}</span><span class='price'><span>From</span>$${item[1]}</span><div class='radio unchecked'></div>`;
      document.getElementById(page).appendChild(packageButton);
      packageButton.addEventListener("click", () => {
        for (let i = 0; i < document.getElementsByClassName("radio").length; i++) {
          document.getElementsByClassName("radio")[i].className = "radio unchecked";
        }
        packageButton.querySelector(".radio").className = "radio checked";
        $group = item[0];
        localStorage.setItem("gGroup", $group);
      });
    });
};

//________________________________________________________
//________________________________________________________
//create Pages
//________________________________________________________
//________________________________________________________

let createPage0 = () => {
  createReservationPage("page0");
  createTitle("page0", "Select a Package");
};
let createPage1 = () => {
  createReservationPage("page1");
  createTitle("page1", "Select a Date");
  showCalendar("page1", cartData);
};
let createPage2 = ($message) => {
  createReservationPage("page2");
  createTitle("page2", "How Many Participants?");
};
let createPage3 = () => {
  createReservationPage("page3");
  createTitle("page3", "Lastly, Party Name & Details");
  showCollectors("page3", cartData.Collectors);
  showEmailPhoneTemplate("page3");
};

//________________________________________________________
//_________________________________________________________
//display Pages
//_________________________________________________________
//_________________________________________________________

let displayPage0 = () => {
  hideReservationPages("reservation-page", "page0");
  showPackageGroupings("page0");

  let $productGroup = document.getElementsByClassName('product-group')
  for (let i = 0; i < $productGroup.length; i++) {
    let $localStorage = localStorage.getItem("gGroup");
    if($localStorage == $productGroup[i].getAttribute("id")){
      $productGroup[i].querySelector(".radio").className = "radio checked";
    };
  };

document
  .getElementById("reservation-controls")
  .appendChild(createButton("next-0", "continue", "next-btn"));

  document.getElementById("next-0").addEventListener(
    "click",
    function () {
      if (localStorage.getItem("gGroup") !== undefined) {
        //console.log("local storage gGroup is defined");
        displayPage1(localStorage.getItem("gGroup"));
        clearReservationPage("page0");       
      };
    },
    false
  );
};

//====================================================================
//====================================================================

let displayPage1 = ($group) => {

  if($group){
    localStorage.setItem("gGroup", $group);
  }

  hideReservationPages("reservation-page", "page1");

  if(document.getElementById("page0") !== undefined && document.getElementById("page0") !== null){
      document
      .getElementById("reservation-controls")
      .appendChild(createButton("prev-1", "back", "prev-btn"));


      document.getElementById("prev-1").addEventListener(
        "click",
        function () {
            displayPage0();
        }
      );
  };

  document
    .getElementById("reservation-controls")
    .appendChild(createButton("next-1", "continue", "next-btn"));

    //==================================================================================================
      document.getElementById("next-1").addEventListener(
        "click",
        function () {
            if (collectorValidate("dateInput", cartData.Collectors[0])) {
            
              if(checkCutoffTime() == false){

                if(returnCalendarData().datePickerValue == returnCalendarData().todaysDate){
                  idToggle("cutoff-window","active");
                }else{
                  displayPage2($group);
                };

              }else{
                displayPage2($group);
              };

            } else {
              validateCart("calendar-message", true);
            }
        },
        false
      );
    //==================================================================================================
};

//====================================================================

let displayPage2 = ($back) => {
  $group = localStorage.getItem("gGroup");

  hideReservationPages("reservation-page", "page2");

  
  if($group){
    console.log("if group" , $group);
    showGroupPrices("page2", cartData.Prices, $group);

    //forEach
    let groupPriceContainers = document.getElementsByClassName("price-container");
    let groupPriceCategoriesArray = [];

    Array.prototype.forEach.call(
      groupPriceContainers,
      function(item,index){
        let groupPriceCategories = item.getAttribute("data-category");
        groupPriceCategoriesArray.push(groupPriceCategories)
    });

    groupPriceCategoriesArray = groupPriceCategoriesArray.filter((item,index,array) => {
      return array.findIndex((i) => i[0] === item[0]) === index; 
    });
	
	//--------

    let categoryArray = new Set;


	// seperates the single from the group prices
    Array.prototype.forEach.call(
      cartData.Prices,
      function(item,index){
          if(item.Grouping == null){

          console.log(`${item.Category} ${categoryArray}`);
          if (item.Category.indexOf(groupPriceCategoriesArray) == -1){
                categoryArray.add(item.Category);
          };
      };
    
    });

    console.log(categoryArray);

    categoryArray.forEach((value) => {
      console.log(value);
       showSinglePrices("page2",cartData.Prices,"" + value + "");
    });
	//--------
    $spinnerEvents();
    addPriceMessage("page2");

  }else{

      let $categorySet = new Set;

    	for (let i = 0; i < cartData.Prices.length; i++) {
	    	$categorySet.add(cartData.Prices[i].Category);
	    };

      $categorySet.forEach((value) => {;
	     	showSinglePrices("page2",cartData.Prices,"" + value + "");
      });

	    $spinnerEvents();
      addPriceMessage("page2");
  };

//   // Get all the DIV elements
let $priceContainer = document.getElementsByClassName("price-container");
let $unorderedPrices = new Array;

for (let i = 0; i < $priceContainer.length; i++) {
  $unorderedPrices.push($priceContainer[i]);
};

$unorderedPrices.sort( (a,b) => {
  var valueA = parseInt(a.getAttribute("data-order"));
  var valueB = parseInt(b.getAttribute("data-order"));
  return valueA - valueB;
});

$unorderedPrices.forEach( (item) =>{
  document.getElementById("page2").appendChild(item);
})

    document
      .getElementById("reservation-controls")
      .appendChild(createButton("prev-2", "back", "prev-btn"));
    document
      .getElementById("reservation-controls")
      .appendChild(createButton("next-2", "continue", "next-btn"));

    if ($back !== false) {
      document.getElementById("prev-2").addEventListener(
        "click",
        function () {
          displayPage1($group);
          clearReservationPage("page2");
        },
        false
      );
    };

    document.getElementById("next-2").addEventListener(
      "click",
      function () {
        if (multiInputValidate("price-control")) {
          displayPage3();
        } else {
          validateCart("price-message", true);
        }
      },
      false
    );
  
};

//====================================================================
//====================================================================

let displayPage3 = () => {
  hideReservationPages("reservation-page", "page3");
  submitButton("reservation-controls");
};

//===================================================================
//====================================================================

let displayPageUnavaliable = () => {
  createReservationPage("page0");
  unavaliableMessage("page0");
};

//====================================================================
//====================================================================

const setReservationWindow = ($groupDefined) => {

  if($groupDefined !== null){
    
    createReservationTemplate();
    createPage1();
    createPage2();
    createPage3();
    displayPage1($groupDefined);

  }else{

    createReservationTemplate();

    for (let i = 0; i < cartData.Prices.length; i++) {

      let isGrouping = cartData.Prices[i].Grouping;
      if(isGrouping == null){
        createPage1();
        createPage2();
        createPage3();
        displayPage1();
        break;

      }else{

        createPage0();
        createPage1();
        createPage2();
        createPage3();
        displayPage0();
        break;

      }
    }
  }


};



