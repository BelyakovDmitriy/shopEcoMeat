$(document).ready(function() {
    const REG = {
        name: /^[a-zA-ZА-Яа-яЁё\s]+$/i,
        email: /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/,
        telephone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
    };
    $("#button-sale").on('click',function(){
        if (!validateForm($('#name'), REG['name']) && !validateForm($('#telephone'), REG['telephone']) && !validateForm($('#email'), REG['email'])) {
            $.ajax({
                type: 'POST',
                url: 'mail.php',
                dataType: 'html',
                data: $(this).parent().serialize(),
                success: function (data) {
                    show(data);
                    data = "";
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                }
            });
        }
    });

    $('input').not(':input[type=button]').blur(function() {
        validateForm($(this), REG[$(this).attr('name')]);
    })
});

function show(message) {
    let $buf = $('#alert-wrapper').empty();

    $buf
        .append(message)
        .addClass('visible')
        .animate({opacity: .8}, 100, function () {
            setTimeout(function () {
                $buf.animate({opacity: 0}, 400, function () {
                    $buf.removeClass('visible')
                })
            }, 2000)
        })
}

function validateForm(form, reg) {
    let error = false;
    form.removeClass('valid', 'invalid');

    if (form.val() == "") {
        show('Заполните поле '+form.attr('placeholder'));
        form.addClass('invalid');
        error = true;
        return error;
    }
    if (!reg.test(form.val())) {
        show('Некорректное значение поля '+form.attr('placeholder'));
        form.addClass('invalid');
        error = true;
        return error;
    }

    form.addClass('valid');
    return error;
}