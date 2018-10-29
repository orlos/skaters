

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

var $baseUrl = ""
$(function() {
    initLogosForm();
    initVideosBoys();
	initBoys();

    if( $('body').hasClass('skaters-post') )
        initPostSkaters();
});

function initLogosForm() {

    var options = {
        items: 8,
        nav: true,
        navText: false,
        dots: false,
        loop: true,
        touchDrag: false,
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

    $("#phoneCode").mask("000");
    $("#phoneNumber").mask("000-0000");
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
                url: "/wp-admin/admin-ajax.php?action=register_new_applicant_ajax_request" + posvars,
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

        var db = window.sqlitePlugin.openDatabase({name: "skaters.db", location: 'default'});

        db.transaction(function(tx) {
            // tx.executeSql('DROP TABLE IF EXISTS pending_submissions');
            tx.executeSql('CREATE TABLE IF NOT EXISTS pending_submissions (id integer primary key, source text, lang text, teamSelected text, parentsFirstName text, parentsLastName text, emailAddress text, phoneCode text, phoneNumber text, address text, city text, postalcode text, province text, childsName text, childsAge text, skatingAbility text, whatHockeyAssociation text, isScotiaHockeyClubMember text, isMajorityInProvince text,acceptTerms text, acceptReceiveMessages text )');



            tx.executeSql("INSERT INTO pending_submissions (source, lang, teamSelected, parentsFirstName, parentsLastName, emailAddress, phoneCode, phoneNumber, address, city, postalcode, province, childsName, childsAge, skatingAbility, whatHockeyAssociation, isScotiaHockeyClubMember, isMajorityInProvince,acceptTerms, acceptReceiveMessages) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [source, lang, teamSelected, parentsFirstName, parentsLastName, emailAddress, phoneCode, phoneNumber, address, city, postalcode, province, childsName, childsAge, skatingAbility, whatHockeyAssociation, isScotiaHockeyClubMember, isMajorityInProvince,acceptTerms, acceptReceiveMessages],
            function(tx, res) {

                console.log("insertId: " + res.insertId + " -- probably 1");
                console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

            }, function(e) {
                console.log("ERROR: " + e.message);
            });
        });




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

            var posvars = '&source='+source+'&lang='+lang+'&teamSelected='+teamSelected+'&parentsFirstName='+parentsFirstName+'&parentsLastName='+parentsLastName+'&emailAddress='+emailAddress+'&phoneCode='+phoneCode+'&phoneNumber='+phoneNumber+'&address='+address+'&city='+city+'&postalcode='+postalcode+'&province='+province+'&childsName='+childsName+'&childsAge='+childsAge+'&skatingAbility='+skatingAbility+'&whatHockeyAssociation='+whatHockeyAssociation+'&isScotiaHockeyClubMember='+isScotiaHockeyClubMember+'&isMajorityInProvince='+isMajorityInProvince+'&acceptTerms='+acceptTerms+'&acceptReceiveMessages='+acceptReceiveMessages;





    		$.ajax({
    			url: "/wp-admin/admin-ajax.php?action=register_new_applicant_ajax_request" + posvars,
    			type: 'GET'
    		}).done(function(result) {
                var respond = JSON.parse(result);

                //alert(result);
                console.log(respond);

                if(respond.status == 'ok') {
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
                }

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
    var regex = /^\d{3}[-]\d{4}$/;
    return regex.test(phoneNumber);
}