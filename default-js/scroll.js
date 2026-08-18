document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('a').forEach(item => {
		const href = item.getAttribute('href');
		if (href && href.startsWith('#') && !!href.replace('#', '')) {
			const elementId = href.replace('#', '');
			item.addEventListener('click', event => {
				event.preventDefault();
				document.querySelector(`#${elementId}`).scrollIntoView({
					behavior: 'smooth'
				});
			});
		}
	});
}); 