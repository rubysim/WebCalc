import './style.scss';
import $ from 'jquery';
import calculator from './calculator.js';

$(document).ready(function() {
    $('.op-append input').on('click', function() {
        $('#equation').val($('#equation').val() + $(this).attr('value'));
    });

    $('#clear').on('click', function() {
        $('#equation').val('');
        $('#result').val('');
    });

    $('#backspace').on('click', function() {
        let equeation = $('#equation').val();
        equeation = equeation.substring(0, equeation.length - 1);
        $('#equation').val(equeation);
    });

    $('#evaluate').on('click', function() {
        const equation = $('#equation').val();
        try {
            $('#result').val(calculator.getResults(equation));
        } catch(err) {
            $('#result').val(err);
        }
    });
});
