$(document).ready(function () {

    // some animation settings variables - cache reference to 
    // window and animation items
    var $animationElements = $('.animation-element');
    var $window = $(window);

    // listen to the page scroll event
    $window.on('scroll resize', checkIfInView);
    
    // need to trigger scroll event as soon as DOM is done
    // in case elements are in view then animation is triggered
    $window.trigger('scroll');

    var availableTags = [
        'Application Developer',
        'Application Support Analyst',
        'Applications Engineer',
        'Associate Developer',
        'Chief Technology Officer (CTO) ',
        'Chief Information Officer (CIO) ',
        'Computer and Information Systems Manager',
        'Computer Systems Manager',
        'Customer Support Administrator',
        'Customer Support Specialist',
        'Data Center Support Specialist',
        'Data Quality Manager',
        'Database Administrator',
        'Desktop Support Manager',
        'Desktop Support Specialist',
        'Developer',
        'Director of Technology',
        'Front End Developer',
        'Help Desk Specialist',
        'Help Desk Technician',
        'Information Technology Coordinator',
        'Information Technology Director',
        'Information Technology Manager',
        'IT Support Manager',
        'IT Support Specialist',
        'IT Systems Administrator',
        'Java Developer',
        'Junior Software Engineer',
        'Management Information Systems Director',
        '.NET Developer',
        'Network Architect',
        'Network Engineer',
        'Network Systems Administrator',
        'Programmer',
        'Programmer Analyst',
        'Security Specialist',
        'Senior Applications Engineer',
        'Senior Database Administrator',
        'Senior Network Architect',
        'Senior Network Engineer',
        'Senior Network System Administrator',
        'Senior Programmer',
        'Senior Programmer Analyst',
        'Senior Security Specialist',
        'Senior Software Engineer',
        'Senior Support Specialist',
        'Senior System Administrator',
        'Senior System Analyst',
        'Senior System Architect',
        'Senior System Designer',
        'Senior Systems Analyst',
        'Senior Systems Software Engineer',
        'Senior Web Administrator',
        'Senior Web Developer',
        'Software Architect',
        'Software Developer',
        'Software Engineer',
        'Software Quality Assurance Analyst',
        'Support Specialist',
        'Systems Administrator',
        'Systems Analyst',
        'System Architect',
        'Systems Designer',
        'Systems Software Engineer',
        'Technical Operations Officer',
        'Technical Support Engineer',
        'Technical Support Specialist',
        'Technical Specialist',
        'Telecommunications Specialist',
        'Web Administrator',
        'Web Developer',
        'Webmaster',
    ];
    
    $( "#tags" ).autocomplete({
        source: availableTags
    });
    
    // function to generate each of the instagram image cards
    function generateInstagramCardHtml(code, images) {
        var instagramCardHtml = '<div class="instagram-card">' +
                        '<a href="https://www.instagram.com/p/' +
                        code +
                        '/?taken-by=joincornerstone" target="_blank">instagram.com</a>' +
                        '<img src="' + images.low_resolution.url + 
                        '" width="' + images.low_resolution.width + 
                        '" height="' + images.low_resolution.height +
                        '" class="instagram-card-image small fashion">' +
                        '<div class="instagram-card-content small back">' +
                            '<span class="instagram-card-text">View on Instagram</span>' +
                        '</div>' +
                    '</div>';
        return instagramCardHtml;
    }

    // funcion to check if elements are in view
    function checkIfInView() {
        var windowHeight = $window.height();
        var windowTopPosition = $window.scrollTop();
        var windowBottomPosition = (windowTopPosition + windowHeight);

        var timeDelay = 0;
        $.each($animationElements, function() {
            var $element = $(this);
            var elementHeight = $element.outerHeight();
            var elementTopPosition = $element.offset().top;
            var elementBottomPosition = (elementTopPosition + elementHeight);

            //check to see if this current container is within viewport
            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)) {
                $element.addClass('in-view');

                
                if (timeDelay == 0) {
                    timeDelay = 100;
                } else {
                    timeDelay += 300;
                    $element.css('transition-delay', timeDelay + 'ms');
                }

            } else {
                //$element.removeClass('in-view');
            }
        });
    }

    // make ajax call to get the instagram json
    $.ajax({
        url: './image-feed-proxy.php',
        type: 'GET',
        dataType: "json",
        success: function(data) {
            
            var instagramCardsHtml = '';

            if (data.status == 'ok') {
                var count = 0;
                $.each(data.items, function( key, value ) {
                    //console.log( key + ": " + value.can_view_comments );
                    instagramCardsHtml += generateInstagramCardHtml(value.code, value.images);
                    count++;

                    if (count > 8) {
                        return false;
                    }
                });
            } else {
                instagramCardsHtml = '<h2 class="fail-message">' + data.message + '</h2>';
            }

            $('#instagram-feed-container').html(instagramCardsHtml);

        },
        failure: function(data) {

        },
        complete: function(data) {
        }
    });

    $('.testimonial-block-container').on('hover', function() {
        
        $(this).find('.testimonial-actual').addClass('bounce-animation');

    });

    // slider action controls

    $('.slider-action-button').on('click', function() {
        
        var targetCard = $(this).data('targetcard');
        //console.log(targetCard);

        // only do this if the card is not already selected
        if (!$(this).hasClass('selected')) {

            // unset all 'selected' buttons, only one can be selected
            $('.slider-action-button').each(function() {
                $(this).removeClass('selected');
            });

            // 'select' the button
            $(this).addClass('selected');


            $('.slider-card-container').each(function() {
                $(this).removeClass('expand');
            });
            
            //var card;
            /*$('.slider-card-container').each(function() {

                if (!$(this).hasClass('expand')) {

                    //$(this).addClass('removed');
                    //$(this).addClass('hide', 800);

                    // rip and replace at end of the parent
                    //var card = $(this).detach();
                    //card.appendTo('.main-container-middle-slider-sec');

                }
                
            });*/

            $('.slider-card-' + targetCard).addClass('expand');


            //.addClass('expand');
            //.addClass('shrink');

        }

    });

});