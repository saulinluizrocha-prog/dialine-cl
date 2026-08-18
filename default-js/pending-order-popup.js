document.addEventListener('DOMContentLoaded', function() {
	const isPendingOrderErr = document.location.search.indexOf('is_pending_order_check_failed') > -1;
	let errorMsg = 'Your order has already been placed, we will call you back as soon as possible';

	switch (true) {
		case document.cookie.includes('lang=ru'):
			errorMsg = 'Ваш заказ уже оформлен, мы перезвоним Вам в ближайшее время'; break;
		case document.cookie.includes('lang=ar'):
			errorMsg = 'تم تقديم طلبك، سنعاود الاتصال بك في أقرب وقت ممكن'; break;
	}

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
	'<span>' + ' ' + errorMsg + ' ' + '</span>' +
	'<button' +
	' style="background: #f57d02; border: 0px;margin-top: 30px; width: auto;"' +
	'  onclick="document.body.removeChild(document.querySelector(\'#order-in-progress__popup\'))">'+
	'OK' +
	'</button>' +
	'</div>';

	isPendingOrderErr && $('body').append(popup);
}); 