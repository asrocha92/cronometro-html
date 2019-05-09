/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Notification */

/**
 * Cronometro
 * @autor Alex Santos Rocha
 */
var Cronometro = {
    id: 0,
    timerID: null,
    contagem: function (hora, minuto, segundo, idElemento, data) {
	if (hora == 0 && minuto == 0 && segundo <= 0) {
	    clearTimeout(this.timerID);
	    this.mostrarTempo(0, 0, 0, idElemento, data);
	    $(".ui-btn-cronometro").hide();
	    $("." + idElemento).css("color", "red");
	    document.title = "Atendimento perdido";
	    $(".ui-raibow-spinner").hide();
	    this.audioStop();
	    $('.ui-card-cronometro-ct').css('background', '#ff0000');
	    setTimeout(function () {
		$('.ui-card-cronometro-ct').css('background', '#ffffff');
		$(".ui-card-cronometro").addClass('zoomOut');
		setTimeout(function () {
		    $(".ui-card-cronometro").hide();
		}, 200);
	    }, 5000);
	} else {
	    segundo--;
	    if (segundo < 0) {
		segundo = 59;
		minuto = minuto - 1;
	    }
	    if (minuto <= 0) {
		minuto = 59;
		hora = hora - 1;
	    }
	    if (hora < 0) {
		hora = 0;
		minuto = 0;
	    }
	    this.mostrarTempo(hora, minuto, segundo, idElemento, data);
	    this.timerID = setTimeout('Cronometro.contagem(' + hora + ',' + minuto + ',' + segundo + ',"' + idElemento + '","' + data + '")', 1000);
	}
    },
    pausaContagem: function (hora, minuto, segundo, idElemento, data) {
	clearTimeout(this.timerID);
    },
    mostrarTempo: function (hora, minuto, segundo, idElemento, data) {
	if (hora < 10) {
	    hora = '0' + hora;
	}
	if (minuto < 10) {
	    minuto = '0' + minuto;
	}
	if (segundo < 10) {
	    segundo = '0' + segundo;
	}
	$("." + idElemento).text(hora + ":" + minuto + ":" + segundo);
	document.title = "" + hora + ":" + minuto + ":" + segundo + "";

	if (segundo <= 15) {
	    if ($(".ui-raibow-spinner").attr('src') !== './lib/img/spinner-close.svg') {
		$(".ui-raibow-spinner").attr('src', './lib/img/spinner-close.svg');
	    }
	} else {
	    if ($(".ui-raibow-spinner").attr('src') !== './lib/img/spinner-open.svg') {
		$(".ui-raibow-spinner").attr('src', './lib/img/spinner-open.svg');
	    }
	}
    },
    addContador: function (hora, minuto, segundo, idElemento, data) {
	setTimeout(function () {
	    $(".ui-card-cronometro").removeClass('zoomOut');
	    $(".ui-card-cronometro").show();
	    $(".ui-raibow-spinner").show();
	    $(".ui-btn-cronometro").show();
	    Cronometro.audioPlay();
	}, 900);
	setTimeout('Cronometro.contagem(' + hora + ',' + minuto + ',' + segundo + ',"' + idElemento + '","' + data + '")', 1000);
    },
    audioPlay: function () {
	$(document).ready(function () {
	    setTimeout(function () {
		var ad = $('#audioted');
		ad.prop("currentTime", 0);
		ad.trigger('play');
	    }, 0);
	});
    },
    audioStop: function () {
	$(document).ready(function () {
	    try {
		var ad = $('#audioted');
		ad.prop("currentTime", 0);
		ad.trigger('pause');
	    } catch (e) {
		console.log(e);
	    }
	});
    },
    stopcronometro: function () {
	clearTimeout(this.timerID);
	$(".ui-btn-cronometro").hide();
	document.title = "Atendendo";
	$(".ui-raibow-spinner").hide();
	this.audioStop();
	$('.ui-card-cronometro-ct').css('background', '#ffffff');
	$(".ui-card-cronometro").hide();
    }
};

try {
    document.addEventListener('DOMContentLoaded', function () {
	if (!Notification) {
	    return; //notification não suportada pelo navegador
	}
	if (Notification.permission !== "granted")
	    Notification.requestPermission();
    });
} catch (e) {
    console.log(e);
}


$('.ui-click').on('click', function () {
    Cronometro.addContador(0, 0, 20, "ui-timer-atendimento", JSON.stringify([]));
});

$('.ui-btn-cronometro-button').on('click', function () {
    Cronometro.stopcronometro();
});
