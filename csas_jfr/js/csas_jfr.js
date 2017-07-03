(function ($) {
    var waitTag = jQuery('<div class="csas-jfr-ldr"></div>');

    function csasJfrCh(formIn) {
        var eS = true;
        if (formIn.height != 0) {
            $('.required', formIn).each(function () {
                if ($(this).val() == '') {
                    eS = false;
                    $(this).parents('.form-item').addClass('csas-jfr-form-error');

                } else {
                    $(this).parents('.form-item').removeClass('csas-jfr-form-error');
                }
            });

            $('.form-type-checkboxes .form-required', formIn).each(function () {
                var tC = $(this).parents('.form-item.form-type-checkboxes');
                if (!$(':checked', tC).length) {
                    eS = false;
                    tC.addClass('csas-jfr-form-error');
                } else {
                    tC.removeClass('csas-jfr-form-error');
                }
            });
        } else {
            eS = false;
        }

        return eS;
    }

    Drupal.behaviors.csasJfr = {
        attach: function (context, settings) {
            $('.csas-jfr', context).once('csas-jfr', function () {
                var tF = $(this);
                $('.required', tF).bind('change', function () {
                    csasJfrCh(tF);
                });

                $('.form-type-checkboxes .form-required', tF).once('csas-jfr-chk', function () {
                    var tC = $(this).parents('.form-item.form-type-checkboxes');
                    $(':checkbox', tC).bind('change', function () {
                        csasJfrCh(tF);
                    });
                });

                $('.form-submit', tF).bind('click', function () {
                    if (!csasJfrCh(tF)) {
                        return false;
                    } else {
                        tF.addClass('csas-jfr-ajx-lad-prs').append(waitTag);
                        tF.submit();
                        $(this).attr('disabled', true);
                    }
                });
            });
        }
    };
})(jQuery);