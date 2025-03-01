
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("datePickerId").setAttribute("max", today);//setting date

function nextt(x){
	if(animating) return false;
	animating = true;
	
	current_fs = $(x).parent();
	next_fs = $(x).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
}
$(".next").click(function(){
	nextt(this);
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

function precise_round(num, dec){
 
	if ((typeof num !== 'number') || (typeof dec !== 'number')) 
  return false; 
  
	var num_sign = num >= 0 ? 1 : -1;
	  
	return (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
}  

$( "#marksobt" ).keyup(function() {
	var markstot = $('#markstot').val();
	var marksobt = $('#marksobt').val();
	if(markstot != '' && marksobt != ''){
		if (markstot == 10){
			if (marksobt <= 10 ){
				$('#marks').val(parseFloat((marksobt * 9.5)).toFixed(2));
			} else {
				$('#marks').val("Enter Valid Marks Obtained (Range 0 to 10)");
			}
		} else {
			$('#marks').val(parseFloat((marksobt/markstot) * 100).toFixed(2));
		}
		$("#marks").show();
	}
});
$( "#markstot" ).keyup(function() {
	var markstot = $('#markstot').val();
	var marksobt = $('#marksobt').val();
	if(markstot != '' && marksobt != ''){
		if (markstot == 10){
			if (marksobt <= 10 ){
				$('#marks').val(parseFloat((marksobt * 9.5)).toFixed(2));
			} else {
				$('#marks').val("Enter Valid Marks Obtained (Range 0 to 10)");
			}
		} else {
			$('#marks').val(parseFloat((marksobt/markstot) * 100).toFixed(2));
		}
		$("#marks").show();
	}
});

/*$("#basicDetails").click(function(event){
	return false
}); 
$( "#degreeName" ).focus(function() {
	$("#degreeName").hide();
	$("#degree").show();
  });
function calpercentage(){
	var markstot = document.getElementById("markstot").value
	var marksobt = document.getElementById("marksobt").value
	if (markstot == 10){
		document.getElementById("percentage") = marksobt * 9.5 ;
	} else {
		document.getElementById("percentage") = (marksobt/markstot) * 100;
	}
}*/
$('#basicDetails').click(function (event) {
	var uname = $('#uname').val();
	var email = $('#uemail').val();
	var mobno = $('#umobno').val();
	var objective = $('#uobjective').val();
	if (uname == "" || email == "" || mobno == "" || objective == ""){
		alert("Enter all the information")
	} else{
		nextt('#basicDetails');
	}
});