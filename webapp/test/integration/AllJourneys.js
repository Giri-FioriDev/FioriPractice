jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"demo/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"demo/test/integration/pages/Worklist",
		"demo/test/integration/pages/Object",
		"demo/test/integration/pages/NotFound",
		"demo/test/integration/pages/Browser",
		"demo/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "demo.view."
	});

	sap.ui.require([
		"demo/test/integration/WorklistJourney",
		"demo/test/integration/ObjectJourney",
		"demo/test/integration/NavigationJourney",
		"demo/test/integration/NotFoundJourney",
		"demo/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});
