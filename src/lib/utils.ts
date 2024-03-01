export const clickOutside = (node: HTMLElement) => {
   const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
         node.dispatchEvent(
            new CustomEvent('clickOutside')
         )
      }
   }
   document.addEventListener('click', handleClick, true)
   return {
      destroy() {
         document.removeEventListener('click', handleClick, true)
      }
   }
}

export const formatCurrency = function(value: number, currencyCode: string, locale?: string) {
	// See Vendure docs for more info:
	// https://docs.vendure.io/guides/core-concepts/money/#displaying-monetary-values
	const majorUnits = value / 100
	try {
		// If no `locale` is provided, the browser's default locale will be used.
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currencyCode,
			currencyDisplay: 'symbol'
		}).format(majorUnits)
	} catch (e: any) {
		// A fallback in case the NumberFormat fails for any reason
		return majorUnits.toFixed(2)
	}
}