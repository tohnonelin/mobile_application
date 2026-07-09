"use strict";

window.addEventListener("DOMContentLoaded", 
    function () {
        const items = document.querySelectorAll(".item01,.item02");
        items.forEach(function(element,index){
            setTimeout(function(){
                element.classList.add("fade-in");
            },100*index);
        });
},false
);