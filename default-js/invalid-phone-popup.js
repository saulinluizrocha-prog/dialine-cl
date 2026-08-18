document.addEventListener('DOMContentLoaded', function() {
	const isBlacklistErr = document.location.search.indexOf('is_blacklist_error') > -1;
	const blackListMsg = document.cookie.includes('lang=ru')
		? 'Ваша заявка не может быть обработана, попробуйте ввести другой номер телефона'
		: 'Your request could not be processed, please try another phone number';

	const styles = '<style scoped> #order-in-progress__popup {\
		position: fixed;\
		left: 50%;\
		top: 50%;\
		z-index: 200;\
		transform: translateX(-50%) translateY(-50%);\
			background: white;\
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\
			font-family: inherit;\
			font-size: 18px;\
			text-align: center;\
			display: flex;\
			justify-content: center;\
			align-items: center;\
			flex-direction: column;\
			max-width: 400px;\
			width: 100%;\
			height: auto;\
			border-radius: 5px;\
			padding: 30px;\
		}\
		#order-in-progress__popup button {\
			background: #f57d02;\
			border-radius: 3px;\
			border: none;\
			text-transform: uppercase;\
			padding: 10px 20px;\
			margin-top: 20px;\
			font-weight: 700;\
			color: white;\
			font-size: 19px;\
			font-family: inherit;\
		}\
		#order-in-progress__popup span {\
			width: 100%;\
		}\
		@media screen and (max-width: 479px) {\
			#order-in-progress__popup {\
				max-width: calc(90vw - 40px);\
				padding: 15px 20px;\
			}\
		}</style>';

	const popup = styles + '<div id="order-in-progress__popup" ' +
	'style="position: fixed; z-index: 2147483647;" >' +
	'<span>' + ' ' + blackListMsg + ' ' + '</span>' +
	'<button' +
	' style="background: #f57d02; border: 0px;margin-top: 30px; width: auto;"' +
	'  onclick="document.body.removeChild(document.querySelector(\'#order-in-progress__popup\'))">'+
	'OK' +
	'</button>' +
	'</div>';

	isBlacklistErr && $('body').append(popup);
}); 