sap.ui.define([], function() {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},
		STATUSFF: function(Salary) {

			return (Salary > 80000) ? "Exp EMP" : "Fresher";

		},
		IMAGEFF: function(Salary) {
			return (Salary > 80000) ? "/greencolor.gif" : "/redcolor.gif";

		},
		CHECKBOXFF: function(Salary) {
			return (Salary > 80000) ? true : false;

		},
		SWITCHFF: function(Salary) {
			return (Salary > 80000) ? true : false;

		},
		RATINGFF: function(Salary) {
			return (Salary > 80000) ? 4 : 2;

		},
		PROGRESSFF: function(Salary) {
			return (Salary > 80000) ? 80 : 40;
		},
		SLIDERFF: function(Salary) {
			return (Salary > 80000) ? 80 : 40;

		},
		CURRENCYFF: function(Country) {
			switch (Country) {
				case "INDIA":
					return "INR";
				case "US":
					return "USD";
				case "UK":
					return "UKP";
				default:
					return "NA";

			}

		},
		ANNUALFF: function(Salary) {
			return (Salary * 12);

		},
		PROGRESSSTATEFF: function(Salary) {

			return (Salary > 80000) ? "Success" : "Error";

		},
		OBJECTNUMBERFF: function(Salary) {

			return (Salary > 80000) ? "Success" : "Error";

		},
		BUTTONTYPEFF: function(Salary) {

			return (Salary > 80000) ? "Accept" : "Reject";

		},
		INFOSTATEFF: function(Salary) {
			return (Salary > 80000) ? "Success" : "Error";

		},
		ICONFF: function(Salary) {

			return (Salary > 80000) ? "/greencolor.gif" : "/redcolor.gif";

		},
		COLORFF: function(Salary) {

			return (Salary > 80000) ? "Good" : "Error";

		}

	};

});