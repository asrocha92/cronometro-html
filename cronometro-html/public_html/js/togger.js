/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$('.iu-cb-status-chat').on('change', function (e) {
    if ($(this).prop("checked")) {
	$('.iu-cb-status-chat-info').text('Online');
    } else {
	$('.iu-cb-status-chat-info').text('Offline');
    }
    e.preventDefault();
});
