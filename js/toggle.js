/*///////////////*/
/* toggle.js v.1.0
/*///////////////*/
/*///////////////*/
//toggle events//
/*///////////////*/
//* ==== this toggle ===*//
function toggleThis(element, activeClass) {

  var classArray = element.className.split(" ");

  var elementIndex = classArray.indexOf(activeClass);

  if (classArray.length >= 2){

    classArray.splice(elementIndex);

    element.className = classArray.join();

  }else{

    classArray.push(activeClass);

    element.className = classArray.join(" ");

  }
}
//*==== parent toggle ===*//
function parentToggle(thisElement,activeClass){

  var parentElement = thisElement.parentNode;

  toggleThis(parentElement, activeClass);
}
/*=== next sibling toggle ====*/
function nextSiblingToggle(element,activeClass){
  var thisElement = element.nextElementSibling;

  toggleThis(thisElement, activeClass);
}
/*=== previous sibling toggle ====*/
function prevSiblingToggle(prevElement,activeClass){
  var thisElement = prevElement.previousElementSibling;

  toggleThis(thisElement, activeClass);
}

/*=== id toggle ===*/
function idToggle(elementId,activeClass){

  var parentElement = document.getElementById(elementId);

  toggleThis(parentElement, activeClass);

}
/*=== tagname toggle ===*/

//* ==== this toggle ===*//
function toggleThis(element, activeClass) {
  var classArray = element.className.split(" ");
  var elementIndex = classArray.indexOf(activeClass);
  if (classArray.length >= 2){
    classArray.splice(elementIndex);
    element.className = classArray.join();
  }else{
    classArray.push(activeClass);
    element.className = classArray.join(" ");
  }
}
/*=== id toggle ===*/
function idToggle(elementId,activeClass){
  var parentElement = document.getElementById(elementId);
  toggleThis(parentElement, activeClass);
}
//*==== parent toggle ===*//
function parentToggle(thisElement,activeClass){
  var parentElement = thisElement.parentNode;
  toggleThis(parentElement, activeClass);
}
/*=== next sibling toggle ====*/
function nextSiblingToggle(element,activeClass){
  var thisElement = element.nextElementSibling;
  toggleThis(thisElement, activeClass);
}
/*=== previous sibling toggle ====*/
function prevSiblingToggle(prevElement,activeClass){
  var thisElement = prevElement.previousElementSibling;
  toggleThis(thisElement, activeClass);
}
/*=== tagname toggle ===*/
function tagNameToggle(tagName,activeClass,tagNameIndex){
  var tagNameCollection = document.getElementsByTagName(tagName);
  for (var i = 0; i < tagNameCollection.length; i++) {
    var parentElement = tagNameCollection[tagNameIndex];
  }
  toggleThis(parentElement, activeClass);

}
/*== tabs toggle ==*/
function pageToggle(number,element,activeClass){
  elIndex = number;
  var el = document.getElementsByClassName(element);
  for (var i = 0; i < el.length; i++) {
    el[i].className = element;
  }
  el[elIndex].className += activeClass;
}

function tabToggle(targetElement, element) {
  console.log("clicked");
  var parentClass = targetElement.parentNode.className;
  var el = document.getElementsByClassName(element);
  // Closes all
  for (var i = 0; i < el.length; i++) {
      el[i].className = element;
  }
  if (parentClass == element) {
      targetElement.parentNode.className = element + ' active';
  }
}


