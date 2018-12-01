

// VARS
var $linkFormBoys = $("#link-form-boys");
var $linkFormBoysClose = $("#link-form-boys-close");
var $linkFormBoysReopen = $("#link-form-boys-reopen");
var $linkFormBoysSubmit = $("#link-form-boys-submit");
var $linkFormPostSubmit = $("#link-form-post-submit");

var $formBoys = $("#form-boys");
var $formPost = $("#form-skaters-post");

var $formBoysSuccess = $("#form-boys-success");
var $formBoysError = $("#form-boys-error");

var $formTeam = $(".form-team");
var $formRadioOption = $(".form-radio-option");
var $formCheckboxOption = $(".form-checkbox-option");

var $logosForm = $("#form-boys").find(".owl-carousel");
var $videosBoys = $("#videos-boys").find(".owl-carousel");

var $baseUrl = "https://scotiabankhockeyclub.com";

window.__ConnectionStatus = "unknown";
window.__IsConnectedToInternet = false;

var $isSubmittingQueue = false;
var $isSubmittingQueueItem = false;


document.addEventListener("offline", ic_OnOffline, false);

function ic_OnOffline() {
    // Handle the offline event
    window.__ConnectionStatus = "offline";
    window.__IsConnectedToInternet = false;
    console.log(window.__ConnectionStatus);
}

document.addEventListener("online", ic_OnOnline, false);

function ic_OnOnline() {
    // Handle the online event

    window.__ConnectionStatus = "online";
    window.__IsConnectedToInternet = true;
    console.log(window.__ConnectionStatus);
    console.log("LETS PROCESS QUEUE");

    __processQueueSubmissions();
    updatePendingSubmissions();


}



$(function() {
    initLogosForm();
    initVideosBoys();
	initBoys();

    if( $('body').hasClass('skaters-post') )
        initPostSkaters();
});

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

function initLogosForm() {

    var options = {
        items: 8,
        nav: true,
        navText: false,
        dots: false,
        loop: true,
        touchDrag: true,
        mouseDrag: false,
        responsive : {
            0 : {
                items: 3,
                loop: true
            },
            320: {
                items: 3,
                loop: true
            },
            480: {
                items: 4,
                loop: true
            },
            768: {
                items: 8,
                loop: false
            }
        }
    };

    $logosForm.owlCarousel(options);
}

function initVideosBoys() {

    var options = {
        items: 1,
        nav: false,
        navText: false,
        dots: true,
        loop: true,
        responsive : {
            0 : {
                items: 1
            },
            320: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 1
            }
        }
    };

    $videosBoys.owlCarousel(options);
}

function initBoys() {

  //  $("#phoneCode").mask("000");
  //  $("#phoneNumber").mask("000-0000");
    $("#postalcode").mask("Z0Z 0Z0", {'translation': {
        Z: {pattern: /[A-Za-z]/}
    }});

    /*$formBoys.doTransform();

    $('.doSelect ul').hide();*/

    //console.log(window.location.hash);

    if(window.location.hash == "#form") {
        $linkFormBoys.addClass('inactive');
        $formBoys.fadeIn();
        $('html, body').animate({
            scrollTop: $formBoys.offset().top
        }, 1000);
    }

	$linkFormBoys.click(function() {
		$(this).addClass('inactive');
		$formBoys.fadeIn();
		$('html, body').animate({
			scrollTop: $formBoys.offset().top
  		}, 1000);
	});

	$linkFormBoysClose.click(function() {
		$formBoysSuccess.fadeOut();
		$('html, body').animate({
			scrollTop: 0
  		}, 1000);
	});

	$linkFormBoysReopen.click(function() {
		$formBoysError.hide();
		$formBoys.fadeIn();
		$('html, body').animate({
			scrollTop: $formBoys.offset().top
  		}, 1000);
	});

	$formTeam.click(function() {
		$formTeam.removeClass('selected');
		$(this).addClass('selected');

        toggleSubmitButtonForm();

        toggleErrors($(this));
	});

	$formRadioOption.click(function() {
		$(this).parent().children('.form-radio-option').removeClass('selected');
		$(this).addClass('selected');

        toggleSubmitButtonForm();

        toggleErrors($(this));
	});

	$formCheckboxOption.click(function() {
		$(this).toggleClass('selected');

        toggleSubmitButtonForm();

        toggleErrors($(this));
	});

    $('.form-control').change(function() {
        toggleSubmitButtonForm();
    });

    $('.form-control').keyup(function() {
        toggleSubmitButtonForm();
    });

    $('.form-control').click(function() {
        toggleSubmitButtonForm();
    });

    $('.form-control').blur(function() {
        toggleErrors($(this));
    });

    /*$('.doSelect ul li').click(function() {
        console.log('doSelect');
        $valueSelected = $(this).attr('option');
        console.log($valueSelected);
        console.log($(this).next("select option[value='" + $valueSelected + "']"));
        $(this).next("select option[value='" + $valueSelected + "']").prop("selected", true);
    });*/

}


function initPostSkaters() {

    $formRadioOption.click(function() {
        $(this).parent().children('.form-radio-option').removeClass('selected');
        $(this).addClass('selected');

        toggleSubmitButtonForm();

        toggleErrors($(this));
    });

    $formCheckboxOption.click(function() {
        $(this).toggleClass('selected');

        toggleSubmitButtonForm();

        toggleErrors($(this));
    });

    $('.form-control').change(function() {
        toggleSubmitButtonForm();
    });

    $('.form-control').keyup(function() {
        toggleSubmitButtonForm();
    });

    $('.form-control').click(function() {
        toggleSubmitButtonForm();
    });

    $('.form-control').blur(function() {
        toggleErrors($(this));
    });

    $('#rate').on('change', function() {
        if($(this).val() == 'c' || $(this).val() == 'd') {
            $(this).parent().find('.extra-field').slideDown();
        }else {
            $(this).parent().find('.extra-field').slideUp();
        }
    });

    $linkFormPostSubmit.click(function(e) {
        e.preventDefault();

        if(validateForm(true)) {
            var lang = $('#lang').val(); //Important to select correct language template

            var posvars = ''; //'&lang='+lang+'&teamSelected='+teamSelected+'&parentsFirstName='+parentsFirstName+'&parentsLastName='+parentsLastName+'&emailAddress='+emailAddress+'&phoneCode='+phoneCode+'&phoneNumber='+phoneNumber+'&address='+address+'&city='+city+'&postalcode='+postalcode+'&province='+province+'&childsName='+childsName+'&childsAge='+childsAge+'&skatingAbility='+skatingAbility+'&whatHockeyAssociation='+whatHockeyAssociation+'&isScotiaHockeyClubMember='+isScotiaHockeyClubMember+'&isMajorityInProvince='+isMajorityInProvince+'&acceptTerms='+acceptTerms+'&acceptReceiveMessages='+acceptReceiveMessages;

            $.ajax({
                url: $baseUrl+"/wp-admin/admin-ajax.php?action=register_new_applicant_ajax_request" + posvars,
                type: 'GET'
            }).done(function(result) {
                var respond = JSON.parse(result);

                //alert(result);
                console.log(respond);

                $formPost.hide();
                $formBoysSuccess.fadeIn();

                /*if(respond.status == 'ok') {
                    $formBoys.hide();
                    $formBoysSuccess.fadeIn();
                    $('html, body').animate({
                        scrollTop: $formBoysSuccess.offset().top
                    }, 1000);
                }else {
                    if(respond.status == 'error') {
                        if(respond.message == 'email-repeated') {
                            msg = "<p class='form-error red'>Email address already used</p>";
                            $('.form-control.email').closest('.form-wrapper').children('.form-errors').append(msg);
                            toggleErrors($('.form-control.email'));
                        }
                        $('html, body').animate({
                            scrollTop: $formBoys.offset().top
                        }, 1000);
                    }else {

                        $('html, body').animate({
                            scrollTop: $formBoys.offset().top
                        }, 1000);
                    }
                }*/

            }).fail(function() {
                $('html, body').animate({
                    scrollTop: $formBoys.offset().top
                }, 1000);
            });
        }
        else {
            $('html, body').animate({
                scrollTop: $('.form-error').first().closest('.form-wrapper').offset().top
            }, 1000);
        }
    });
}


function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};

function updatePendingSubmissions() {

    $queue = $(".queue section");
    //$queueItems = $(".queue section .queueItem").remove();

    $(".queue .queuetop").hide();
    var $i = 0;
    $(".queue .queuetop var.__amountPending").html( window.localStorage.length );

    while( $i < window.localStorage.length) {


        $currItem = window.localStorage.getItem(window.localStorage.key($i));
        $currItemObj = tryParseJSON($currItem);

        if($currItemObj !== false && $currItemObj.hasOwnProperty("emailAddress")) {

           /* var HTML = '<div class="queueItem"><div class="lds-ripple"><div></div><div></div></div><aside><h3>'+
            $currItemObj.parentsFirstName+ ' ' + $currItemObj.parentsLastName + '</h3>'+
            '<p>Child: '+ $currItemObj.childsName + '</p>'+
            '<p>Team: '+ $currItemObj.teamSelected +'</p></aside></div>';

            $queue.append(HTML);*/
            $(".queue .queuetop").fadeIn();

            $i++;
        } else {

            window.localStorage.removeItem(window.localStorage.key($i));
            $(".queue .queuetop var.__amountPending").html( window.localStorage.length );

            if(window.localStorage.length === 0) {
             $(".queue .queuetop").hide();
            }

        }

    }


}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        $("#form-boys").fadeIn();
        updatePendingSubmissions();


	$linkFormBoysSubmit.click(function(e) {
		e.preventDefault();

        if(validateForm(true)) {
            var lang = $('#lang').val(); //Important to select correct language template
            var parentsFirstName = $('#parentsFirstName').val();
            var source = $('#source').val();
            var parentsLastName = $('#parentsLastName').val();
            var emailAddress = $('#emailAddress').val();
            var phoneCode = $('#phoneCode').val();
            var phoneNumber = $('#phoneNumber').val();
            var address = $('#address').val();
            var city = $('#city').val();
            var postalcode = $('#postalcode').val().toUpperCase();
            var province = $('#province').val();
            var childsName = $('#childsName').val();
            var childsAge = $('#childsAge').val();
            var skatingAbility = $('#skatingAbility').val();
            var whatHockeyAssociation = $('#whatHockeyAssociation').val();

            var teamSelected = "";
            $('.form-team').each(function() {
            	if($(this).hasClass('selected')) {
            		teamSelected = $(this).data('value');
            	}
            });

            var isScotiaHockeyClubMember = "";
            $('.isScotiaHockeyClubMember').children(".form-option").each(function() {
            	if($(this).hasClass('selected')) {
            		isScotiaHockeyClubMember = $(this).data('value');
            	}
            });

            var isMajorityInProvince = "";
            $('.isMajorityInProvince').children(".form-option").each(function() {
            	if($(this).hasClass('selected')) {
            		isMajorityInProvince = $(this).data('value');
            	}
            });

            var acceptTerms = "";
            $('.acceptTerms').children(".form-option").each(function() {
            	if($(this).hasClass('selected')) {
            		acceptTerms = $(this).data('value');
            	}
            });

            var acceptReceiveMessages = "";
            $('.acceptReceiveMessages').children(".form-option").each(function() {
            	if($(this).hasClass('selected')) {
            		acceptReceiveMessages = $(this).data('value');
            	}
            });

            //var posvars = +'&teamSelected='+teamSelected+'&parentsFirstName='+parentsFirstName+'&parentsLastName='+parentsLastName+'&emailAddress='+emailAddress+'&phoneCode='+phoneCode+'&phoneNumber='+phoneNumber+'&address='+address+'&city='+city+'&postalcode='+postalcode+'&province='+province+'&childsName='+childsName+'&childsAge='+childsAge+'&skatingAbility='+skatingAbility+'&whatHockeyAssociation='+whatHockeyAssociation+'&isScotiaHockeyClubMember='+isScotiaHockeyClubMember+'&isMajorityInProvince='+isMajorityInProvince+'&acceptTerms='+acceptTerms+'&acceptReceiveMessages='+acceptReceiveMessages;


            var skaterToSubmit = {
                source:source,
                lang:lang,
                teamSelected:teamSelected,
                parentsFirstName:parentsFirstName,
                parentsLastName:parentsLastName,
                emailAddress:emailAddress,
                phoneCode:phoneCode,
                phoneNumber:phoneNumber,
                address:address,
                city:city,
                postalcode:postalcode,
                province:province,
                childsName:childsName,
                childsAge:childsAge,
                skatingAbility:skatingAbility,
                whatHockeyAssociation:whatHockeyAssociation,
                isScotiaHockeyClubMember:isScotiaHockeyClubMember,
                isMajorityInProvince:isMajorityInProvince,
                acceptTerms:acceptTerms,
                acceptReceiveMessages:acceptReceiveMessages
            };


            window.localStorage.setItem("key_"+Date.now(), JSON.stringify(skaterToSubmit));

            $("#form-boys form").trigger("reset");

            $formBoys.hide();
            $formBoysSuccess.fadeIn();

            updatePendingSubmissions();
            __processQueueSubmissions();
            updatePendingSubmissions();


            $('html, body').animate({
                scrollTop: $formBoysSuccess.offset().top
            }, 1000);



            setTimeout(function(){

                $formBoysSuccess.hide();
                $formBoys.fadeIn();
                        }, 5000);




        }
        else {
            $('html, body').animate({
                scrollTop: $('.form-error').first().closest('.form-wrapper').offset().top
            }, 1000);
        }
	});





    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
*/
        console.log('Received Event: ' + id);
    }
};



function validateForm(showErrors) {
    $('.form-errors').html('');

    band = true;

    $('.form-control.required').each(function() {
        if($(this).val().trim() == '') {
            band = false;

            if( $('main').hasClass('fr') ) {
                msg = "<p class='form-error red'>Champ obligatoire</p>";
            } else {
                msg = "<p class='form-error red'>This field is required</p>";
            }


            $(this).closest('.form-wrapper').children('.form-errors').append(msg);
            if(showErrors) $('.form-errors').fadeIn();
        }
    });

    $('.form-control.email').each(function() {
        if(!isEmail($(this).val())) {
            band = false;
            msg = "<p class='form-error red'>No valid email address</p>";
            $(this).closest('.form-wrapper').children('.form-errors').append(msg);
            if(showErrors) $('.form-errors').fadeIn();
        }
    });

    $('.form-control.postalcode').each(function() {
        if(!isPostalCode($(this).val())) {
            band = false;
            msg = "<p class='form-error red'>No valid postal code</p>";
            $(this).closest('.form-wrapper').children('.form-errors').append(msg);
            if(showErrors) $('.form-errors').fadeIn();
        }
    });

    $('.form-control.phonecode').each(function() {
        if(!isPhoneCode($(this).val())) {
            band = false;

            if( $('main').hasClass('fr') ) {
                msg = "<p class='form-error red'>Téléphone invalide</p>";
            } else {
                msg = "<p class='form-error red'>No valid phone code</p>";
            }


            $(this).closest('.form-wrapper').children('.form-errors').append(msg);
            if(showErrors) $('.form-errors').fadeIn();
        }
    });

    $('.form-control.phonenumber').each(function() {
        if(!isPhoneNumber($(this).val())) {
            band = false;

            if( $('main').hasClass('fr') ) {
                msg = "<p class='form-error red'>Téléphone invalide</p>";
            } else {
                msg = "<p class='form-error red'>No valid phone number</p>";
            }

            $(this).closest('.form-wrapper').children('.form-errors').append(msg);
            if(showErrors) $('.form-errors').fadeIn();
        }
    });

    $('.form-teams.required').each(function() {
        flag = false;
        $('.form-team').each(function() {
            if($(this).hasClass('selected')) {
                flag = true;
            }
        });
        if(!flag) {
            if( $('main').hasClass('fr') ) {
                msg = "<p class='form-error red'>Choisissez une résponse</p>";
            } else {
                msg = "<p class='form-error red'>You must select one team</p>";
            }

            $(this).closest('.form-wrapper').children('.form-errors').append(msg);
            if(showErrors) $('.form-errors').fadeIn();
            band = false;
        }
    });

    $('.form-radio.required').each(function() {
        flag = false;
        $(this).children('.form-radio-option').each(function() {
            if($(this).hasClass('selected')) {
                flag = true;
            }
        });
        if(!flag) {

            if( $('main').hasClass('fr') ) {
                msg = "<p class='form-error red'>Champ obligatoire</p>";
            } else {
                msg = "<p class='form-error red'>This field is required</p>";
            }


            $(this).closest('.form-wrapper').children('.form-errors').append(msg);
            if(showErrors) $('.form-errors').fadeIn();
            band = false;
        }
    });

    $('.form-checkbox.required').each(function() {
        flag = false;
        $(this).children('.form-checkbox-option').each(function() {
            if($(this).hasClass('selected')) {
                flag = true;
            }
        });
        if(!flag) {

            if( $('main').hasClass('fr') ) {
                msg = "<p class='form-error red'>Champ obligatoire</p>";
            } else {
                msg = "<p class='form-error red'>This field is required</p>";
            }

            $(this).closest('.form-wrapper').children('.form-errors').append(msg);
            if(showErrors) $('.form-errors').fadeIn();
            band = false;
        }
    });

    console.log(band);

    return band;
}

function toggleErrors(elem) {
    $aux = elem.closest('.form-wrapper').children('.form-errors');
    if($aux.html() != '') {
        $aux.fadeIn();
    }
    else {
        $aux.fadeOut();
    }
}

function toggleSubmitButtonForm() {
    if(validateForm()) {
        //$linkFormBoysSubmit.removeClass('disabled');
    }
    else {
        //$linkFormBoysSubmit.addClass('disabled');
    }
}


function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isPostalCode(postalCode) {
    var regex = /^[A-Za-z][0-9][A-Za-z][ ][0-9][A-Za-z][0-9]$/;
    return regex.test(postalCode);
}

function isPhoneCode(phoneCode) {
    var regex = /^\d{3}$/;
    return regex.test(phoneCode);
}

function isPhoneNumber(phoneNumber) {
    var regex = /^\d{7}$/;
    return regex.test(phoneNumber);
}


function __processQueueSubmissions() {

    if(true === window.__IsConnectedToInternet) {


    if(false === $isSubmittingQueue) {

                 $isSubmittingQueue = true;

                 $queue = $(".queue section");
                 //$queueItems = $(".queue section .queueItem").remove();

                 var $i = 0;
                 while( $i < window.localStorage.length) {

                     var $key = window.localStorage.key($i);


                     $currItem = window.localStorage.getItem($key);
                     $cIObj = tryParseJSON($currItem);

                     if($cIObj !== false && $cIObj.hasOwnProperty("emailAddress")) {



                         var posvars = '&teamSelected='+$cIObj.teamSelected+'&source='+$cIObj.source+'&bypass='+$key+'&parentsFirstName='+$cIObj.parentsFirstName+'&parentsLastName='+$cIObj.parentsLastName+
                         '&emailAddress='+$cIObj.emailAddress+'&phoneCode='+$cIObj.phoneCode+'&phoneNumber='+$cIObj.phoneNumber+'&address='+$cIObj.address+'&city='+$cIObj.city+
                         '&postalcode='+$cIObj.postalcode+'&province='+$cIObj.province+'&childsName='+$cIObj.childsName+'&childsAge='+$cIObj.childsAge+'&skatingAbility='+$cIObj.skatingAbility+
                         '&whatHockeyAssociation='+$cIObj.whatHockeyAssociation+'&isScotiaHockeyClubMember='+$cIObj.isScotiaHockeyClubMember+'&isMajorityInProvince='+$cIObj.isMajorityInProvince+
                         '&acceptTerms='+$cIObj.acceptTerms+'&acceptReceiveMessages='+$cIObj.acceptReceiveMessages;



                         $.ajax({
                             url: $baseUrl+"/wp-admin/admin-ajax.php?action=register_new_applicant_ajax_request" + posvars,
                             type: 'GET'
                         }).done(function(result) {
                             var respond = JSON.parse(result);

                             console.log(respond);

                             $keyBypassed = respond.bypass;

                             if(respond.status == 'ok') {
                                 window.localStorage.setItem($keyBypassed, "OK");

                             }else {

                                 window.localStorage.setItem($keyBypassed, "ERROR");

                             }

                             updatePendingSubmissions();



                         }).fail(function() {

                             console.log("failed");

                         });



                     } else {
                          window.localStorage.setItem($key, "BAD");
                          updatePendingSubmissions();

                     }

                     $i++;



                 }

                 $isSubmittingQueue = false;


             } else {
                 console.log("queue alre3ady being processed");

             }

         } else {
             console.log("no connected to internet");
             console.log("no connected to internet");


         }


}
/*
setInterval(function(){

__processQueueSubmissions();
updatePendingSubmissions();


}, 3600000);

*/